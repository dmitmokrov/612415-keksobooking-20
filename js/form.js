'use strict';

(function () {
  var AVATAR_SRC = 'img/muffin-grey.svg';

  var housePrices = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var mainPin = document.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');
  var adFormAvatar = adForm.querySelector('.ad-form-header__input');
  var adFormAvatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var adFormAdPhoto = adForm.querySelector('.ad-form__input');
  var adFormAdPhotoPreview = adForm.querySelector('.ad-form__photo img');
  var adFormInputs = adForm.querySelectorAll('.ad-form fieldset');
  var mapFiltersInputs = document.querySelectorAll('.map__filters select, .map__filters fieldset');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var rooms = adForm.querySelector('#room_number');
  var guests = adForm.querySelector('#capacity');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

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

  var guestsChangeHandler = function () {
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

  var priceChangeHandler = function () {
    price.min = housePrices[type.value];
    price.placeholder = housePrices[type.value];
  };

  var timeOutChangeHandler = function () {
    timeIn.value = timeOut.value;
  };

  var timeInChangeHandler = function () {
    timeOut.value = timeIn.value;
  };

  var errorButtonClickHandler = function (evt) {
    evt.preventDefault();
    document.querySelector('.message').remove();
  };

  var messageEscapeHandler = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      document.querySelector('.message').remove();
      document.removeEventListener('keydown', messageEscapeHandler);
      document.removeEventListener('click', messageClickHandler);
    }
  };

  var messageClickHandler = function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      document.querySelector('.message').remove();
      document.removeEventListener('click', messageClickHandler);
      document.removeEventListener('keydown', messageEscapeHandler);
    }
  };

  var renderMessage = function (messageType) {
    var message = document.querySelector('#' + messageType).content.querySelector('.' + messageType).cloneNode(true);

    if (document.querySelector('.message .error__button')) {
      document.querySelector('.message .error__button').addEventListener('click', errorButtonClickHandler);
    }

    document.addEventListener('keydown', messageEscapeHandler);
    document.addEventListener('click', messageClickHandler);
    document.querySelector('main').appendChild(message);
  };

  var resetForm = function () {
    adFormAvatarPreview.src = AVATAR_SRC;
    adFormAdPhotoPreview.src = '#';
    adForm.reset();
    window.main.setMapInitialState();
    mainPin.addEventListener('mousedown', window.main.mainPinMousedownHandler);
    mainPin.addEventListener('mousedown', window.main.mainPinActiveMousedownHandler);
    mainPin.addEventListener('keydown', window.main.mainPinKeydownHandler);
  };

  var adFormSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), function () {
      renderMessage('success');
      resetForm();
    }, function () {
      renderMessage('error');
    });
  };

  var adFormResetHandler = function (evt) {
    evt.preventDefault();
    resetForm();
  };

  rooms.addEventListener('change', guestsChangeHandler);
  guests.addEventListener('change', guestsChangeHandler);

  type.addEventListener('change', priceChangeHandler);

  timeIn.addEventListener('change', timeInChangeHandler);
  timeOut.addEventListener('change', timeOutChangeHandler);

  adFormReset.addEventListener('click', adFormResetHandler);

  adForm.addEventListener('submit', adFormSubmitHandler);

  setDisable(adFormInputs);
  setDisable(mapFiltersInputs);

  window.upload(adFormAvatar, adFormAvatarPreview);
  window.upload(adFormAdPhoto, adFormAdPhotoPreview);

  window.form = {
    adForm: adForm,
    setAble: setAble,
    setDisable: setDisable,
    guestsChangeHandler: guestsChangeHandler
  };
})();
