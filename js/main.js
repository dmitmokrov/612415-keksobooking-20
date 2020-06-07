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
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
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
        'title': 'Заголовок ' + (i + 1),
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

// Проверка существования свойства
var checkProperty = function (condition, elem, setProp) {
  if (condition) {
    setProp();
  } else {
    elem.style.display = 'none';
  }
};

// Установка свойства
var setProperty = function (elem, property, value) {
  return function () {
    elem[property] = value;
  };
};

// Добавление услуг
var setFeatures = function (arr, parentNode) {
  return function () {
    parentNode.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + arr[i]);
      feature.textContent = arr[i];
      parentNode.appendChild(feature);
    }
  };
};

// Добавление фотографий
var setPhotos = function (arr, parentNode) {
  return function () {
    parentNode.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.width = 45;
      photo.height = 40;
      photo.src = arr[i];
      parentNode.appendChild(photo);
    }
  };
};

// Информация объявления

var renderCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  var title = cardElement.querySelector('.popup__title');
  checkProperty(card.offer.title, title, setProperty(title, 'textContent', card.offer.title));

  var address = cardElement.querySelector('.popup__text--address');
  checkProperty(card.offer.address, address, setProperty(address, 'textContent', card.offer.address));

  var price = cardElement.querySelector('.popup__text--price');
  checkProperty(card.offer.price, price, setProperty(price, 'textContent', card.offer.price + '₽/ночь'));

  var offerType = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var type = cardElement.querySelector('.popup__type');
  checkProperty(card.offer.type, type, setProperty(type, 'textContent', offerType[card.offer.type]));

  var capacity = cardElement.querySelector('.popup__text--capacity');
  checkProperty(card.offer.rooms && card.offer.guests, capacity, setProperty(capacity, 'textContent', card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей'));

  var time = cardElement.querySelector('.popup__text--time');
  checkProperty(card.offer.checkin && card.offer.checkout, time, setProperty(time, 'textContent', 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout));

  var features = cardElement.querySelector('.popup__features');
  checkProperty(card.offer.features, features, setFeatures(card.offer.features, features));

  var description = cardElement.querySelector('.popup__description');
  checkProperty(card.offer.description, description, setProperty(description, 'textContent', card.offer.description));

  var photos = cardElement.querySelector('.popup__photos');
  checkProperty(card.offer.features, features, setPhotos(card.offer.photos, photos));

  var avatar = cardElement.querySelector('.popup__avatar');
  checkProperty(card.author.avatar, avatar, setProperty(avatar, 'src', card.author.avatar));

  map.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', cardElement);
};

renderCard(ads[0]);
