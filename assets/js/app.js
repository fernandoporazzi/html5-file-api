/*!
 HTML5 File API - DEMO
 @author: Fernando Porazzi - github.com/fernandoporazzi
 @date: 11/08/2014
*/

;(function (window, document, undefined) {

  'use strict';

  var App = (function () {

    var _handleFileSelect = function (e) {
      e.stopPropagation();
      e.preventDefault();

      var files = e.dataTransfer.files,
          i = 0,
          l = files.length,
          output = document.querySelector('.output');

      for (i; i < l; i++) {
        
        if ( ! files[i].type.match('image.*') ) {
          continue;
        }

        var reader = new FileReader();

        reader.onload = (function (file) {

          // If you want, you can create a FormData object and then send it to server via ajax.

          return function (e) {

            var li = document.createElement('li'),
                img = document.createElement('img');

            li.classList.add('output__li');

            img.classList.add('output__image');

            img.src = e.target.result;

            // appends
            li.appendChild(img);

            output.appendChild(li);

          };

        })(files[i]);

        reader.readAsDataURL(files[i]);

      }
    };

    var _handleDragOver = function (e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    };

    var _init = function () {
      
      var dropZone = document.querySelector('.drop_area');

      dropZone.addEventListener('dragover', _handleDragOver, false);
      dropZone.addEventListener('drop', _handleFileSelect, false);

    };

    return {
      init: _init
    };

  })();

  App.init();

})(window, document);