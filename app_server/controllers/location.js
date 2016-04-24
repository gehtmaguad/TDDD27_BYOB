var request = require('request');
var server = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
  server = 'https://polar-chamber-29775.herokuapp.com';
}

var renderError = function(req, res) {
  res.status = res.statusCode;
  res.render('error-page', {
    title: 'Something went wrong!',
    text: 'We are sorry, but this request could not be handled!',
    status: res.statusCode
  });
};

var renderLocationList = function(req, res, body) {
  res.render('locations-list', {
    count: "There are " + body.length + " preparties near your location!",
    title: 'BYOB - Join awesome preparties',
    pageHeader: {
      title: 'BringYourOwnBeverage',
      strapline: 'BYOB lets you join awesome preparties near your place!'
    },
    locations: body,
    serviceDescription: 'Lorem ipsum dolor sit amet, consectetuer adipiscing \
      elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque \
      penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec \
      quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla \
      consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, \
      vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis \
      vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer \
      tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate \
      eleifend tellus. Aenean leo ligula, porttitor eu,'
   });
};

/* GET home page */
module.exports.homelist = function(req, res) {
  var path = '/api/locations';
  var options = {
    url: server + path,
    method: "GET",
    json: {},
    qs : {
      longitude: '48.110933',
      latitude:  '16.163425',
      distance: '100000',
      maxElements: '10'
    }
  };
  request(
    options,
    function(err, response, body) {
      // Check status code and if body has entries
      if (response.statusCode === 200) {
        if (body.length) {
          // For each entry convert distance
          body.forEach(function(entry) {
            entry.distance = convertDistance(entry.distance);
          });
        }
        renderLocationList(req, res, body);
      } else {
        renderError(req, res);
      }
    }
  );
};

var convertDistance = function(distance) {
  // if >= 1 kilometer
  if (distance >= 1000) {
    return parseInt(distance / 1000) + " km";
  } else {
    return parseInt(distance) + " m";
  }
};

var renderLocationInfo = function(req, res, body) {
  res.render('location-info', {
    title: body.theme,
    pageHeader: {
      title: body.theme
    },
    location: body
  });
};

/* GET locationInfo page */
module.exports.locationInfo = function(req, res) {
  var path = '/api/locations/' + req.params.locationid;
  var options = {
    url: server + path,
    method: "GET",
    json: {}
  };
  request(
    options,
    function(err, response, body) {
      if (response.statusCode === 200) {
        body.coords = {
          lng: body.coords[0],
          lat: body.coords[1]
        };
        body.mapUrl = 'http://maps.googleapis.com/maps/api/staticmap?center=\
          ' + body.coords.lng + ',' + body.coords.lat +
          '&zoom=17&size=400x350&sensor=false&markers=\
          ' + body.coords.lng + ',' + body.coords.lat + '&scale=2';
        console.log(body.mapUrl);
        renderLocationInfo(req, res, body);
      } else {
        renderError(req, res, body);
      }
    }
  );
};

/* GET addComment page */
module.exports.addComment = function(req, res) {
  res.render('location-comment-form', { title: 'Add Comment' });
};

/* GET join page */
module.exports.join = function(req, res) {
  res.render('location-join-form', { title: 'Join' });
};
