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
  // var housingRooms = mapFilters.querySelector('#housing-rooms');
  // var housingGuests = mapFilters.querySelector('#housing-guests');
  // var housingFeatures = mapFilters.querySelector('#housing-features');

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
        return elem.offer.price > Price.MAX;
      default:
        return true;
    }
  };

  var filterAds = function (arr) {
    return arr.filter(function (elem) {
      return filterHousingType(elem) && filterHousingPrice(elem);
    });
  };

  window.filter = filterAds;
})();
