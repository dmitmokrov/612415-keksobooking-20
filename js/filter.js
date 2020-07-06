'use strict';

(function () {
  var Price = {
    HIGH: 'high',
    MIDDLE: 'middle',
    LOW: 'low',
    MIN: 10000,
    MAX: 50000
  };
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');

  var filterHousingType = (function (elem) {
    return housingType.value === 'any' ? true : elem.offer.type === housingType.value;
  });

  var filterHousingPrice = function (elem) {
    switch (housingPrice.value) {
      case Price.LOW:
        return elem.offer.price < Price.MIN;
      case Price.MIDDLE:
        return elem.offer.price >= Price.MIN && elem.offer.price < Price.MAX;
      case Price.HIGH:
        return elem.offer.price >= Price.MAX;
      default:
        return true;
    }
  };

  var filterHousingRooms = function (elem) {
    return housingRooms.value === 'any' ? true : elem.offer.rooms.toString() === housingRooms.value;
  };

  var filterHousingGuests = function (elem) {
    return housingGuests.value === 'any' ? true : elem.offer.guests.toString() === housingGuests.value;
  };

  // Может это костыльно, не знаю, не придумал более простого способа как узнать, что все элементы одного массива содержатся в другом
  var filterHousingFeatures = function (elem) {
    var checkedFeatures = Array.from(housingFeatures.querySelectorAll('input')).filter(function (it) {
      return it.checked;
    }).map(function (checkbox) {
      return checkbox.value;
    });

    var counter = 0;

    for (var i = 0; i < checkedFeatures.length; i++) {
      for (var j = 0; j < elem.offer.features.length; j++) {
        if (elem.offer.features[j] === checkedFeatures[i]) {
          counter++;
        }
      }
    }

    return counter === checkedFeatures.length ? true : false;
  };

  var filterAds = function (arr) {
    return arr.filter(function (elem) {
      return filterHousingType(elem) && filterHousingPrice(elem) && filterHousingRooms(elem) && filterHousingGuests(elem) && filterHousingFeatures(elem);
    });
  };

  window.filter = filterAds;
})();
