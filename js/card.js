'use strict';

(function () {
  var offerType = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

  var cardEscapeHandler = function (evt) {
    if (evt.key === 'Escape') {
      document.querySelector('.map__card').remove();
      document.removeEventListener('keydown', cardEscapeHandler);
    }
  };

  var closeCardHandler = function () {
    document.querySelector('.map__card').remove();
    document.removeEventListener('keydown', cardEscapeHandler);
  };

  var closeCard = function () {
    if (document.querySelector('.map__card')) {
      closeCardHandler();
    }
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__close').addEventListener('click', closeCardHandler);

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

    window.map.map.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', cardElement);
  };

  window.card = {
    renderCard: renderCard,
    closeCard: closeCard,
    cardEscapeHandler: cardEscapeHandler
  };
})();
