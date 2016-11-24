( function($) {
$().ready(args => {
  console.log('ready');

  $('.navlink').click(function() {
    $('html, body').animate({
      scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
  });

  $('.navbar-brand').click(() => {
    $('html, body').animate({
        scrollTop: 0
    }, 500);
    return false;
  });

}); // end $().ready
})(jQuery)