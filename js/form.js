'use strict';

(function () {
  var housePrices = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('.ad-form fieldset');
  var mapFiltersInputs = document.querySelectorAll('.map__filters select, .map__filters fieldset');
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

  // Добавление атрибута disabled всем элементам ввода в формах .ad-form и .map__filters
  setDisable(adFormInputs);
  setDisable(mapFiltersInputs);

  // Валидация количества комнат и гостей
  rooms.addEventListener('change', guestsChangeHandler);
  guests.addEventListener('change', guestsChangeHandler);

  // Валидация полей "Тип жилья" и "Цена на ночь"
  type.addEventListener('change', priceChangeHandler);

  // Валидация полей "время заезда и выезда"
  timeIn.addEventListener('change', timeInChangeHandler);
  timeOut.addEventListener('change', timeOutChangeHandler);

  window.form = {
    adForm: adForm,
    setAble: setAble,
    setDisable: setDisable,
    guestsChangeHandler: guestsChangeHandler
  };
})();
