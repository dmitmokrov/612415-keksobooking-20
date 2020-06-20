'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_TAIL_HEIGHT = 22;

  var map = window.map.map;
  var adForm = window.form.adForm;
  var address = adForm.querySelector('#address');
  var adFormInputs = adForm.querySelectorAll('.ad-form fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  var mapFiltersInputs = document.querySelectorAll('.map__filters select, .map__filters fieldset');

  var setMapActiveState = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.setAble(adFormInputs);
    window.form.setAble(mapFiltersInputs);
    window.map.renderAds(window.data.ads);
  };

  var mainPinMousedownHandler = function (evt) {
    if (evt.button === 0) {
      setMapActiveState();
      setAddress(true);
      window.form.guestsChangeHandler();
    }
    mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
  };

  var mainPinKeydownHandler = function (evt) {
    if (evt.key === 'Enter') {
      setMapActiveState();
      setAddress(true);
      window.form.guestsChangeHandler();
    }
    mainPin.removeEventListener('keydown', mainPinKeydownHandler);
  };

  var setAddress = function (isMapActive) {
    var mainPinX = Math.round(mainPin.offsetLeft + (MAIN_PIN_WIDTH / 2));
    var mainPinY = Math.round(mainPin.offsetTop + (MAIN_PIN_HEIGHT / 2));

    if (isMapActive) {
      mainPinY += MAIN_PIN_TAIL_HEIGHT;
    }
    address.value = mainPinX + ', ' + mainPinY;
  };

  // Переключение карты в активное состояние при клике левой кнопкой мыши на главный пин
  mainPin.addEventListener('mousedown', mainPinMousedownHandler);

  // Переключение карты в активное состояние при нажатии Enter
  mainPin.addEventListener('keydown', mainPinKeydownHandler);

  // Добавление координат main pin в поле адреса
  setAddress();
})();
