'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var randomNumber = function (from, to) {
  return Math.floor(from + Math.random() * (to - from + 1));
};

var createAds = function (number) {
  var ads = [];

  for (var i = 1; i <= number; i++) {
    var ad = {
      'author': {
        'avatar': null
      },
      'offer': {
        'title': null,
        'address': null,
        'price': null,
        'type': null,
        'rooms': null,
        'guests': null,
        'checkin': null,
        'checkout': null,
        'features': [],
        'description': null,
        'photos': []
      },
      'location': {
        'x': null,
        'y': null
      }
    };

    ad.author.avatar = 'img/avatars/user0' + i + '.png';
    ad.offer.title = 'Заголовок';
    ad.offer.price = randomNumber(500, 1500);
    ad.offer.type = OFFER_TYPES[randomNumber(0, OFFER_TYPES.length - 1)];
    ad.offer.rooms = randomNumber(1, 4);
    ad.offer.guests = randomNumber(1, 5);
    ad.offer.checkin = OFFER_CHECKIN[randomNumber(0, OFFER_CHECKIN.length - 1)];
    ad.offer.checkout = OFFER_CHECKOUT[randomNumber(0, OFFER_CHECKOUT.length - 1)];

    for (var k = 0; k < randomNumber(1, 5); k++) {
      ad.offer.features.push(OFFER_FEATURES[randomNumber(0, OFFER_FEATURES.length - 1)]);
    }

    for (var l = 0; l < randomNumber(1, 5); l++) {
      ad.offer.photos.push(OFFER_PHOTOS[randomNumber(0, OFFER_PHOTOS.length - 1)]);
    }

    ad.offer.description = 'Описание';
    ad.location.x = randomNumber(0, mapPins.scrollWidth);
    ad.location.y = randomNumber(130, 650);

    ad.offer.address = ad.location.x + ', ' + ad.location.y;

    ads.push(ad);
  }

  return ads;
};

var renderPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  var avatar = pinElement.querySelector('img');
  var xOffset = ad.location.x - PIN_WIDTH / 2;
  var yOffset = ad.location.y - PIN_HEIGHT;
  pinElement.setAttribute('style', 'left: ' + xOffset + 'px; top: ' + yOffset + 'px;');
  avatar.setAttribute('src', ad.author.avatar);
  avatar.setAttribute('alt', ad.offer.title);

  return pinElement;
};

var ads = createAds(8);

for (var m = 0; m < ads.length; m++) {
  fragment.appendChild(renderPin(ads[m]));
}

map.classList.remove('map--faded');
mapPins.appendChild(fragment);
