'use strict';

window.pin = (function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    var avatar = pinElement.querySelector('img');
    var xOffset = ad.location.x - PIN_WIDTH / 2;
    var yOffset = ad.location.y - PIN_HEIGHT;
    pinElement.setAttribute('style', 'left: ' + xOffset + 'px; top: ' + yOffset + 'px;');
    avatar.setAttribute('src', ad.author.avatar);
    avatar.setAttribute('alt', ad.offer.title);
    pinElement.addEventListener('click', function () {
      window.map.pinClickHandler(ad);
    });

    return pinElement;
  };

  return {
    renderPin: renderPin
  };
})();
