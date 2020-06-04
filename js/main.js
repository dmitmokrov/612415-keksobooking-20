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

var generateRandomArr = function (data) {
  var randomArr = [];
  for (var i = 0; i < randomNumber(1, 5); i++) {
    randomArr[i] = data[randomNumber(0, data.length - 1)];
  }
  return randomArr;
};

var createAds = function (number) {
  var ads = [];

  for (var i = 0; i < number; i++) {
    var locationX = randomNumber(0, mapPins.scrollWidth);
    var locationY = randomNumber(130, 650);

    ads[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Заголовок' + (i + 1),
        'address': locationX + ', ' + locationY,
        'price': randomNumber(500, 1500),
        'type': OFFER_TYPES[randomNumber(0, OFFER_TYPES.length - 1)],
        'rooms': randomNumber(1, 4),
        'guests': randomNumber(1, 5),
        'checkin': OFFER_CHECKIN[randomNumber(0, OFFER_CHECKIN.length - 1)],
        'checkout': OFFER_CHECKOUT[randomNumber(0, OFFER_CHECKOUT.length - 1)],
        'features': generateRandomArr(OFFER_FEATURES),
        'description': 'Описание' + (i + 1),
        'photos': generateRandomArr(OFFER_PHOTOS)
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
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

var renderAds = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  mapPins.appendChild(fragment);
};

map.classList.remove('map--faded');
var ads = createAds(8);
renderAds(ads);
