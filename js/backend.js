'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';

  var messageEscapeHandler = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      document.querySelector('.message').remove();
      document.removeEventListener('keydown', messageEscapeHandler);
      document.removeEventListener('click', messageClickHandler);
    }
  };

  var messageClickHandler = function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      document.querySelector('.message').remove();
      document.removeEventListener('click', messageClickHandler);
      document.removeEventListener('keydown', messageEscapeHandler);
    }
  };

  var errorButtonClickHandler = function (evt) {
    evt.preventDefault();
    document.querySelector('.message').remove();
  };

  var renderMessage = function (type) {
    var message = document.querySelector('#' + type).content.querySelector('.' + type).cloneNode(true);

    if (document.querySelector('.message .error__button')) {
      document.querySelector('.message .error__button').addEventListener('click', errorButtonClickHandler);
    }

    document.addEventListener('keydown', messageEscapeHandler);
    document.addEventListener('click', messageClickHandler);
    document.querySelector('main').appendChild(message);
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 10000;

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError(xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + 'с');
      });

      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    save: function (data, cb) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 10000;

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          renderMessage('success');
          cb();
        } else {
          renderMessage('error');
        }
      });

      xhr.addEventListener('error', function () {
        renderMessage('error');
      });

      xhr.addEventListener('timeout', function () {
        renderMessage('error');
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
