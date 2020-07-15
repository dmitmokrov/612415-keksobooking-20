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

  var getFilterHousingType = function (elem) {
    return housingType.value === 'any' ? true : elem.offer.type === housingType.value;
  };

  var getFilterHousingPrice = function (elem) {
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

  var getFilterHousingRooms = function (elem) {
    return housingRooms.value === 'any' ? true : elem.offer.rooms.toString() === housingRooms.value;
  };

  var getFilterHousingGuests = function (elem) {
    return housingGuests.value === 'any' ? true : elem.offer.guests.toString() === housingGuests.value;
  };

  var getFilterHousingFeatures = function (elem) {
    var checkedFeatures = Array.from(housingFeatures.querySelectorAll(':checked')).map(function (checkbox) {
      return checkbox.value;
    });

    var counter = 0;

    checkedFeatures.forEach(function (feature) {
      elem.offer.features.forEach(function (elemFeature) {
        if (elemFeature === feature) {
          counter++;
        }
      });
    });

    return counter === checkedFeatures.length ? true : false;
  };

  var filterAds = function (arr) {
    return arr.filter(function (elem) {
      return getFilterHousingType(elem) && getFilterHousingPrice(elem) && getFilterHousingRooms(elem) && getFilterHousingGuests(elem) && getFilterHousingFeatures(elem);
    });
  };

  window.filter = filterAds;
})();
