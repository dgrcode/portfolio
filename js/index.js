( function($) {
$().ready(args => {
  console.log('ready');

  $('.navlink').click(function() {
    let linkedId = $(this).attr('href');
    let correction = linkedId == '#about'? 0 : 80;

    $('html, body').animate({
      scrollTop: $(linkedId).offset().top - correction
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