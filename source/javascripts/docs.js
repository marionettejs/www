$(function () {
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
  
  $('h1, h2, h3, h4, h5, h6').each(function () {
    var $el = $(this);
    var text = $el.text();
    var id = dasherize( text );
    $el.attr('id', id);
    $el.wrap('<a href="#' + id + '"></a>');
  });
});
