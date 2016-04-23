var request = require('request');
var server = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
  server = 'https://polar-chamber-29775.herokuapp.com';
}

var render = function(req, res, body) {
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
}

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
      if (response.statusCode === 200 && body.length) {
        // For each entry convert distance
        body.forEach(function(entry) {
          entry.distance = convertDistance(entry.distance);
        });
      }
      render(req, res, body);
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
}

/* GET locationInfo page */
module.exports.locationInfo = function(req, res) {
  res.render('location-info', {
    title: 'BYOB - Join awesome preparties',
    pageHeader: {
      title: 'Just Because Preparty',
      strapline: 'BYOB lets you join awesome preparties near your place!'
    },
    location: {
      theme: 'Just Because Preparty',
      address: '1200 Vienna, Höchststädtplatz 43',
      date: 'Thursday: 8pm - 12pm',
      provided: ['Free Beer', 'Free Fingerfood'],
      required: ['Bring Whiskey'],
      participants: ['Markus Hoesel', 'Julia Maier', 'Susanne Test'],
      distance: '50m away',
      afterwards: 'We will go to club U4 in Vienna',
      mapUrl: 'http://maps.googleapis.com/maps/api/staticmap?center=\
        48.210033,16.363449&zoom=17&size=400x350&sensor=false&markers=\
        48.210033,16.363449&scale=2',
      comments: [
        {
          author:'Markus Hoesel',
          timestamp:'17.4.2016',
          text:'This is going to be a awesome party!'
        },
        {
          author:'Julia Maier',
          timestamp:'16.4.2016',
          text:'I am really looking forward to this :)'
        },
      ]
    }
  });
};

/* GET addComment page */
module.exports.addComment = function(req, res) {
  res.render('location-comment-form', { title: 'Add Comment' });
};

/* GET join page */
module.exports.join = function(req, res) {
  res.render('location-join-form', { title: 'Join' });
};
