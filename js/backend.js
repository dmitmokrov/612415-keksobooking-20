'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError(xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
