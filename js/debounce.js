'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (cb) {
    var lastTimeout = null;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.debounce = debounce;

  // Не получилось сделать так, как в демонстрации с использованием замыкания, когда возвращается функция. у меня рендер так же происходил мгновенно. Можешь объяснить как надо было сделать?) Вот код из демонстрации

  // (function () {
  //   var DEBOUNCE_INTERVAL = 300; // ms

  //   window.debounce = function (cb) {
  //     var lastTimeout = null;

  //     return function() {
  //       var parameters = arguments;
  //       if (lastTimeout) {
  //         window.clearTimeout(lastTimeout);
  //       }
  //       lastTimeout = window.setTimeout(function() {
  //         cb.apply(null, parameters);
  //       }, DEBOUNCE_INTERVAL);
  //     };
  //   };
  // })();
})();
