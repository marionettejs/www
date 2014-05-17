
// mdoc default template
// author: Miller Medeiros
// license: MIT
// version : 0.1.0 (2011/11/27)

(function ($) {
    var _curPath = document.location.pathname.split('/'),
        _curFile = _curPath[_curPath.length - 1];

    var sidebar = (function () {

        var $_sidebar,
            $_search,
            $_toc,
            $_tocList,
            $_tocItems;


        function init() {
            $_sidebar = $('<div id="sidebar" />').prependTo('#wrapper');
            $_sidebar.load('sidebar_.html', onTocLoad);
        }

        function onTocLoad(data) {
            var selectbox_version = $('#version option:contains(current)').val();

            // check if we are viewing a specific version
            if (_curPath[2] && _curPath[2].charAt(0) === 'v') {
              selectbox_version = _curPath[2];
            }

            $_search = $('#search');
            $_toc = $_sidebar.find('.toc');
            $_tocList = $_toc.find('.toc-list');
            $_tocItems = $_tocList.find('.toc-item');

            $_tocList.slideUp(0);
            $_search.on('keyup blur', filterOnSearch);

            $_sidebar.find('.toc-mod-title:has(a[href*="'+ _curFile +'"])').addClass('active');

            $('#version').val(selectbox_version);

            $('#version').change(function() {
              console.log('change', $(this).val());
              window.location = _curPath[0] + '/' + _curPath[1] + '/' + $(this).val() + '/';
            });
        }

        function toggleNavOnClick(evt) {
            var $el = $(this);
            $el.toggleClass('opened');
            $el.next('.toc-list').stop(true, true).slideToggle(300);
        }

        function toggleDescription() {
            $_toc.find('.desc').toggleClass('hidden');
        }

        function filterOnSearch(evt) {
            var term = $_search.val(),
                rTerm;

            $_tocItems.toggleClass('hidden', !!term);
            $_toc
                .find('.toc-mod-title')
                .toggleClass('hidden', !!term)
                .removeClass('opened');

            if(term){
                rTerm = new RegExp(term, 'gi'); //case insensitive
                $_toc.find('.toc-mod-title').addClass('hidden');

                $_tocList.stop(true).slideDown(0);

                $_tocItems
                    .filter(function(){
                        return rTerm.test( $(this).text() );
                    })
                    .removeClass('hidden');

            } else {
                $_tocList.stop(true).slideUp(0);
            }

        }

        return {
            init : init
        };

    }());

    var syntax = {

        init : function(){
          // Google Prettify syntax highlighting
          prettyPrint();
        }

    };

    var STRING_DASHERIZE_CACHE = {};
    var STRING_DASHERIZE_REGEXP = (/[ _]/g);
    var STRING_DECAMELIZE_REGEXP = (/([a-z])([A-Z])/g);

    function dasherize(str) {
      var cache = STRING_DASHERIZE_CACHE,
          hit = cache.hasOwnProperty(str);

      if (hit) return cache[str]

      return (cache[str] = str
        .toLowerCase()
        .replace(STRING_DASHERIZE_REGEXP,'-'));
    }

    function init(){
        var VERSION_TAG = 'master';

        // check if we are viewing a specific version
        if (_curPath[2] && _curPath[2].charAt(0) === 'v') {
          VERSION_TAG = _curPath[2];
        }

        var _srcUrl = 'https://github.com/marionettejs/backbone.marionette/blob/'+ VERSION_TAG +'/src/',
            _docUrl = 'https://github.com/marionettejs/backbone.marionette/edit/master/docs/';

        $('code').addClass('prettyprint').addClass('lang-js');
        sidebar.init();
        syntax.init();

        $('h1, h2, h3, h4, h5, h6').each(function () {
          var $el = $(this);
          var text = $el.text();
          var id = dasherize( text );
          $el.attr('id', id);
          $el.wrap('<a href="#' + id + '"></a>');
        });

        $('#improve').prop('href', _docUrl + _curFile.replace('.html', '') + '.md');
        $('#source').prop('href', _srcUrl + _curFile.replace('.html', '') + '.js');


    }

    $(document).ready(init);

}(jQuery));
