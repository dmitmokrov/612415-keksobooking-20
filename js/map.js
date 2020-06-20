'use strict';

window.map = (function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
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
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(window.pin.renderPin(arr[i]));
    }
    mapPins.appendChild(fragment);
  };

  return {
    map: map,
    pinClickHandler: pinClickHandler,
    renderAds: renderAds
  };
})();
