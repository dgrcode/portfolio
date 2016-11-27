// TODO cuando le das click a la D, vas para arriba y la barra se pone grande.
// Si en ese momento, ya grande, le vuelves a dar, se pone pequeño. No debería

( function($) {
let $mainContent;
let fixedHeader = false;
let narrowHeader = false;
let movingToSection = false;
let mainContentShadow;

/**
 * Set the header fixed/unfixed depending on the scrolled position
 */
function toggleHeaderFixed() {
  fixedHeader = !fixedHeader;
  //console.log('fixedHeader = ' + fixedHeader);
  if (fixedHeader) {
    $(".nav-wrapper").addClass('fixed');
    $(".main-content").css({boxShadow: 'none', transition: 'none'});
  } else {
    $(".nav-wrapper").removeClass('fixed');
    $(".main-content").css({boxShadow: mainContentShadow, transition: 'box-shadow 1s'});
  }
}

/**
 * This function does the following depending on the argument:
 *   - toggleHeaderNarrow(true): sets the header as narrow
 *   - toggleHeaderNarrow(false): sets the header as wide
 *   - toggleHeaderNarrow(): switch the state of the header
 */
function toggleHeaderNarrow(newState) {
  narrowHeader = (newState !== undefined)? newState : !narrowHeader;
  //console.log('narrowHeader = ' + narrowHeader);
  if (narrowHeader) {
    $(".nav-wrapper").addClass('narrow');
  } else {
    $(".nav-wrapper").removeClass('narrow');
  }
}

function setHeaderWide() {
  toggleHeaderNarrow(false);
}
function setHeaderNarrow() {
  toggleHeaderNarrow(true);
}


$(window).scroll(function () {
  // Set the header fixed when the top of the nav reaches the top of the screen
  // Set the header narrow when the top of the content reaches the top of the screen

  mainContentTop = $mainContent.position().top;
  // navRelPos: space between nav.top and screen.top
  // navNarrowPos: space between content.top and screen.top
  var navRelPos = mainContentTop - $('nav').outerHeight() - $(window).scrollTop();
  var navNarrowPos = mainContentTop - $(window).scrollTop();

  if ((navRelPos <= 0 && fixedHeader === false) ||
      (navRelPos > 0 && fixedHeader === true)) {
    toggleHeaderFixed();
  } else if (!movingToSection){
    if (navNarrowPos <= 0 && narrowHeader === false) {
      setHeaderNarrow();
    } else if (navNarrowPos > 0 && narrowHeader === true) {
      setHeaderWide();
    }
  }

  // hides the dropdown menu on scroll
  $('.collapse').collapse('hide');
});

$().ready(args => {

  $mainContent = $('.main-content');
  let $dropdownMenu = $('.collapse');
  let promise = $.Deferred();

  // Get the shadow that will be used to restore it.
  mainContentShadow = $('.main-content').css('box-shadow');

  // If the dropdown menu doesn't fit below, moves the screen to #about section
  $('button.navbar-toggle').click(event => {
    event.preventDefault();

    // menu height = 120px; margin-bottom = 40px
    if ($(window).scrollTop() <= 120 + 40) {
      // move the screen down
      $('html, body').animate({
        scrollTop: $('#about').offset().top
      }, 500);;
      movingToSection = true;
      setHeaderNarrow();
    }

    $('html, body').promise().done(() => {
      $dropdownMenu.collapse('show');
      movingToSection = false;
    });

  });

  // Hide the menu when clicking outside of it in a narrow screen.
  $('.navlink').click(() => {
    $dropdownMenu.collapse('hide');
  });
  $('body').click(() => {
    $dropdownMenu.collapse('hide');
  })

  // Set the link for the different sections
  $('.navlink').click(function() {
    let linkedId = $(this).attr('href');
    let correction = linkedId == '#about'? 0 : 80;

    $('html, body').animate({
      scrollTop: $(linkedId).offset().top - correction
    }, 500);
    //return false;

    movingToSection = true;
    setHeaderNarrow();

    $('html, body').promise().done(() => {
      movingToSection = false;
    });
  });

  // Set the link for the logo
  $('.navbar-brand').click(() => {

    $('html, body').animate({
        scrollTop: 0
    }, 500);

    movingToSection = true;
    setHeaderWide();

    $('html, body').promise().done(() => {
      movingToSection = false;
    });
  });

});
})(jQuery)