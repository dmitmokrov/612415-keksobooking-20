'use strict';

(function () {
  var MAX_MAP_PINS = 5;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var fragment = document.createDocumentFragment();

  var pinClickHandler = function (ad) {
    var oldCard = document.querySelector('.map__card');
    if (oldCard) {
      oldCard.remove();
    }
    window.card.renderCard(ad);
    document.addEventListener('keydown', window.card.cardEscapeHandler);
  };

  var renderAds = function (arr) {
    var filteredArr = (housingType.value === 'any') ? arr : arr.filter(function (elem) {
      return elem.offer.type === housingType.value;
    });

    var maxFilteredElements = filteredArr.length > MAX_MAP_PINS ? MAX_MAP_PINS : filteredArr.length;

    for (var i = 0; i < maxFilteredElements; i++) {
      fragment.appendChild(window.pin.renderPin(filteredArr[i]));
    }

    mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (elem) {
      elem.remove();
    });
    mapPins.appendChild(fragment);
  };

  window.map = {
    map: map,
    housingType: housingType,
    pinClickHandler: pinClickHandler,
    renderAds: renderAds
  };
})();
