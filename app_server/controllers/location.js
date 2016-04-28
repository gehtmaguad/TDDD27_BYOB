var request = require('request');

var apikey = dbUrl = process.env.API_KEY;
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
      distance: '10000000',
      maxElements: '100'
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

// GET Location Info takes callback function for rendering
var getLocationInfo = function(req, res, callback) {
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
          lng: body.coords[1],
          lat: body.coords[0]
        };
        body.mapUrl = 'http://maps.googleapis.com/maps/api/staticmap?center=\
          ' + body.coords.lng + ',' + body.coords.lat +
          '&zoom=17&size=400x350&sensor=false&markers=\
          ' + body.coords.lng + ',' + body.coords.lat + '&scale=2';
        callback(req, res, body);
      } else {
        renderError(req, res, body);
      }
    }
  );
}

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
  getLocationInfo(req, res, function(req, res, body) {
    renderLocationInfo(req, res, body);
  });
};

var renderCreateComment = function(req, res, body) {
  res.render('location-comment-form', {
    title: 'Comment for ' + body.theme,
    pageHeader: {title: body.theme},
    error: req.query.err
  });
};

/* GET getComment page */
module.exports.createComment = function(req, res) {
  getLocationInfo(req, res, function(req, res, body) {
    renderCreateComment(req, res, body);
  });
};

/* POST addComment page */
module.exports.sendComment = function(req, res) {
  var locationid = req.params.locationid;
  var path = '/api/locations/' + locationid + '/comments';
  var options = {
    url: server + path,
    method: "POST",
    json: {
      author: req.body.author,
      text: req.body.text
    },
    qs : { }
  };
  request(
    options,
    function(err, response, body) {
      // Check status code and if body has entries
      if (response.statusCode === 201) {
        res.redirect('/location/' + locationid);
      } else if (response.statusCode === 404 && body.name === "ValidationError") {
        res.redirect('/location/' + locationid + '/comment/new?err=ValidationError');
      } else {
        renderError(req, res);
      }
    }
  );
};

var renderCreateLocation = function(req, res) {
  res.render('create-form', {
    title: 'Create a Preparty!',
    pageHeader: {title: 'Create a Preparty'},
    error: req.query.err
  });
};

module.exports.createLocation = function(req, res) {
  renderCreateLocation(req, res);
};

module.exports.sendLocation = function(req, res2) {
    var path = '/api/locations/';

    var geocoderProvider = 'google';
    var httpAdapter = 'https';
    // optional
    var extra = {
        apiKey: apikey,
        formatter: null
    };
    var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);
    // Using callback
    geocoder.geocode(req.body.address, function(err, res) {
      console.log(res);
      if (res[0]) {
        var options = {
          url: server + path,
          method: "POST",
          json: {
            theme: req.body.theme,
            address: req.body.address,
            datum: req.body.datum,
            longitude: res[0].longitude,
            latitude: res[0].latitude,
            required:'',
            provided:'',
            afterwards: req.body.afterwards
          },
          qs : { }
        };
        request(
          options,
          function(err, response, body) {
            // Check status code and if body has entries
            if (response.statusCode === 201) {
              res2.redirect('/');
            } else if (response.statusCode === 404 && body.name === "ValidationError") {
              res2.redirect('/locationcreate?err=ValidationError');
            } else {
              renderError(req, res2);
            }
          }
        );
      } else {
        res2.redirect('/locationcreate?err=AddressError');
      }
    });
};
