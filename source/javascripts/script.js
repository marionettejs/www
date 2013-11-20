$(document).ready(function() {

    // Cycle 2
    $('.video_slideshow').cycle({
        pager: '.slider2',
        pagerTemplate: '<span></span>',
        paused: true
    });

    // equalHeights
    if($(window).width() > 705) {
        $('.code_examples > div').equalHeights();
    }
    $(window).resize(function() {
        if($(window).width() > 705) {
            $('.code_examples > div').css('height', 'auto');
            $('.code_examples > div').equalHeights();
        } else {
            $('.code_examples > div').css('height', 'auto');
        }
    });

    // fitVids
    $('.vid').fitVids();

    // Google Prettify syntax highlighting
    prettyPrint();

});
