'use strict';

(function () {
  var MAIN_PIN_LEFT = '570px';
  var MAIN_PIN_TOP = '375px';
  var MAIN_PIN_WIDTH = 66;
  var MAIN_PIN_HEIGHT = 66;
  var MAIN_PIN_TAIL_HEIGHT = 22;
  var MAP_LIMIT_TOP = 130;
  var MAP_LIMIT_BOTTOM = 630;

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
    window.backend.load(window.map.renderAds, alert);
  };

  var setMapInitialState = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.setDisable(adFormInputs);
    window.form.setDisable(mapFiltersInputs);
    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (elem) {
      elem.remove();
    });

    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }

    mainPin.style.left = MAIN_PIN_LEFT;
    mainPin.style.top = MAIN_PIN_TOP;
    setAddress();
  };

  var mainPinActiveMousedownHandler = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        if (mainPin.offsetLeft + MAIN_PIN_WIDTH / 2 < 0) {
          mainPin.style.left = -MAIN_PIN_WIDTH / 2 + 'px';
        } else if (mainPin.offsetLeft > map.offsetWidth - MAIN_PIN_WIDTH / 2) {
          mainPin.style.left = map.offsetWidth - MAIN_PIN_WIDTH / 2 + 'px';
        } else if (mainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT < MAP_LIMIT_TOP) {
          mainPin.style.top = MAP_LIMIT_TOP - MAIN_PIN_HEIGHT - MAIN_PIN_TAIL_HEIGHT + 'px';
        } else if (mainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT > MAP_LIMIT_BOTTOM) {
          mainPin.style.top = MAP_LIMIT_BOTTOM - MAIN_PIN_HEIGHT - MAIN_PIN_TAIL_HEIGHT + 'px';
        }

        var shift = {
          x: moveEvt.clientX - startCoords.x,
          y: moveEvt.clientY - startCoords.y
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.left = mainPin.offsetLeft + shift.x + 'px';
        mainPin.style.top = mainPin.offsetTop + shift.y + 'px';

        setAddress(true);

      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        setAddress(true);

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }
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
      mainPinY = Math.round(mainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT);
    }
    address.value = mainPinX + ', ' + mainPinY;
  };

  // Добавление координат main pin в поле адреса
  setAddress();

  // Переключение карты в активное состояние при клике левой кнопкой мыши на главный пин
  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  mainPin.addEventListener('mousedown', mainPinActiveMousedownHandler);

  // Переключение карты в активное состояние при нажатии Enter
  mainPin.addEventListener('keydown', mainPinKeydownHandler);

  window.main = {
    setMapInitialState: setMapInitialState,
    mainPinMousedownHandler: mainPinMousedownHandler,
    mainPinActiveMousedownHandler: mainPinActiveMousedownHandler,
    mainPinKeydownHandler: mainPinKeydownHandler
  };
})();
