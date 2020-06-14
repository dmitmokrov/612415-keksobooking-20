'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_TAIL_HEIGHT = 22;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var fragment = document.createDocumentFragment();

var offerType = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var randomNumber = function (from, to) {
  return Math.floor(from + Math.random() * (to - from + 1));
};

var generateRandomArr = function (data) {
  var randomArr = [];
  for (var i = 0; i < randomNumber(0, 5); i++) {
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
        'rooms': randomNumber(1, 3),
        'guests': randomNumber(1, 3),
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

// Создание пинов
var ads = createAds(8);

// Добавление свойства
var setProperty = function (node, data, property, value) {
  if (data) {
    node[property] = value;
  } else {
    node.style.display = 'none';
  }
};

// Добавление услуг
var setFeatures = function (arr, parentNode) {
  if (arr.length) {
    parentNode.innerHTML = '';
    arr.forEach(function (elem) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + elem);
      feature.textContent = elem;
      parentNode.appendChild(feature);
    });
  } else {
    parentNode.style.display = 'none';
  }
};

// Добавление фотографий
var setPhotos = function (arr, parentNode) {
  if (arr.length) {
    parentNode.innerHTML = '';
    arr.forEach(function (elem) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.width = 45;
      photo.height = 40;
      photo.src = elem;
      parentNode.appendChild(photo);
    });
  } else {
    parentNode.style.display = 'none';
  }
};

// Информация объявления
var renderCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  setProperty(cardElement.querySelector('.popup__title'), card.offer.title, 'textContent', card.offer.title);

  setProperty(cardElement.querySelector('.popup__text--address'), card.offer.address, 'textContent', card.offer.address);

  setProperty(cardElement.querySelector('.popup__text--price'), card.offer.price, 'innerHTML', card.offer.price + '₽' + '<span>/ночь</span>');

  setProperty(cardElement.querySelector('.popup__type'), card.offer.type, 'textContent', offerType[card.offer.type]);

  setProperty(cardElement.querySelector('.popup__text--capacity'), card.offer.rooms && card.offer.guests, 'textContent', card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей');

  setProperty(cardElement.querySelector('.popup__text--time'), card.offer.checkin && card.offer.checkout, 'textContent', 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout);

  setFeatures(card.offer.features, cardElement.querySelector('.popup__features'));

  setProperty(cardElement.querySelector('.popup__description'), card.offer.description, 'textContent', card.offer.description);

  setPhotos(card.offer.photos, cardElement.querySelector('.popup__photos'));

  setProperty(cardElement.querySelector('.popup__avatar'), card.author.avatar, 'src', card.author.avatar);

  map.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', cardElement);
};

// Новое задание

var adForm = document.querySelector('.ad-form');
var adFormInputs = adForm.querySelectorAll('.ad-form fieldset');
var mapFiltersInputs = document.querySelectorAll('.map__filters select, .map__filters fieldset');
var mainPin = document.querySelector('.map__pin--main');
var address = adForm.querySelector('#address');
var rooms = adForm.querySelector('#room_number');
var guests = adForm.querySelector('#capacity');

var setDisable = function (arr) {
  arr.forEach(function (elem) {
    elem.disabled = true;
  });
};

var setAble = function (arr) {
  arr.forEach(function (elem) {
    elem.disabled = false;
  });
};

var setMapActiveState = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  setAble(adFormInputs);
  setAble(mapFiltersInputs);
  renderAds(ads);
  renderCard(ads[0]);
};

var setAddress = function (isMapActive) {
  var mainPinX = Math.round(mainPin.offsetLeft + (MAIN_PIN_WIDTH / 2));
  var mainPinY = Math.round(mainPin.offsetTop + (MAIN_PIN_HEIGHT / 2));

  if (isMapActive) {
    mainPinY += MAIN_PIN_TAIL_HEIGHT;
  }
  address.value = mainPinX + ', ' + mainPinY;
};

var validateGuests = function () {
  guests.querySelectorAll('option').forEach(function (elem) {
    elem.disabled = true;
  });
  if (rooms.value === '100') {
    guests.querySelector('[value="0"]').disabled = false;
    guests.querySelector('[value="0"]').selected = true;
  } else {
    for (var i = rooms.value; i > 0; i--) {
      guests.querySelector('[value="' + i + '"]').disabled = false;
    }
  }
};

// Добавление атрибута disabled всем элементам ввода в формах .ad-form и .map__filters
setDisable(adFormInputs);
setDisable(mapFiltersInputs);

// Добавление координат main pin в поле адреса
setAddress();

var mainPinMousedownHandler = function (evt) {
  if (evt.button === 0) {
    setMapActiveState();
    setAddress(true);
    validateGuests();
  }
  mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
};

var mainPinKeydownHandler = function (evt) {
  if (evt.key === 'Enter') {
    setMapActiveState();
    setAddress(true);
    validateGuests();
  }
  mainPin.removeEventListener('keydown', mainPinKeydownHandler);
};
// Переключение карты в активное состояние при клике левой кнопкой мыши на главный пин
mainPin.addEventListener('mousedown', mainPinMousedownHandler);

// Переключение карты в активное состояние при нажатии Enter
mainPin.addEventListener('keydown', mainPinKeydownHandler);

// Валидация количества комнат и гостей
rooms.addEventListener('change', validateGuests);
guests.addEventListener('change', validateGuests);
