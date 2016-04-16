/* GET home page */
module.exports.homelist = function(req, res) {
  res.render('locations-list', {
    title: 'BYOB - Join awesome preparties',
    pageHeader: {
      title: 'BringYourOwnBeverage',
      strapline: 'BYOB lets you join awesome preparties near your place!'
    },
    locations: [
      {
        theme: 'Just Because Preparty',
        address: '1200 Vienna, Höchststädtplatz 43',
        date: 'Thursday: 8pm - 12pm',
        provided: ['Free Beer', 'Free Fingerfood'],
        bring: ['Bring Whiskey'],
        participants: '10 are going',
        distance: '50m away'
      },
      {
        theme: 'Wine Tasting Preparty',
        address: '1220 Vienna, Whereever 4234/AB',
        date: 'Friday: 8pm - 12pm',
        provided: ['Free Cheese'],
        bring: ['Bring Wine'],
        participants: '12 are going',
        distance: '250m away'
      },
      {
        theme: 'Johnnys Preparty',
        address: '2700 Wiener Neustadt, Gata 5/B/27',
        date: 'Saturday: 9pm - 2am',
        provided: ['Free Snacks'],
        bring: ['Bring Alcohol'],
        participants: '3 are going',
        distance: '700m away'
      }
    ],
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

/* GET locatoinInfo page */
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
      bring: ['Bring Whiskey'],
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
