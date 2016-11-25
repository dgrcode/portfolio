// TODO cuando le das click a la D, vas para arriba y la barra se pone grande.
// Si en ese momento, ya grande, le vuelves a dar, se pone pequeño. No debería

( function($) {
let fixedHeader = false;
let narrowHeader = false;
let mainContentShadow;

//$.support.transition = false;

// table header fixed at top when scrolling
function toggleHeader() {
  fixedHeader = !fixedHeader;
  console.log('fixedHeader = ' + fixedHeader);
  if (fixedHeader) {
    $(".nav-wrapper").addClass('fixed');
    $(".main-content").css({boxShadow: 'none', transition: 'none'});
  } else {
    $(".nav-wrapper").removeClass('fixed');
    $(".main-content").css({boxShadow: mainContentShadow, transition: 'box-shadow 1s'});
  }
}

function toggleHeaderNarrow(newState) {
  // If newState is not provided, it is the opposite of narrowHeader (boolean)
  narrowHeader = newState||!narrowHeader;
  console.log('narrowHeader = ' + narrowHeader);
  if (narrowHeader) {
    $(".nav-wrapper").addClass('narrow');
  } else {
    $(".nav-wrapper").removeClass('narrow');
  }
}

function setHeaderWide() {
  toggleHeaderNarrow(false);
}

$(window).scroll(function () {
  var navRelPos = $(".main-content").position().top - $('nav').outerHeight() - $(window).scrollTop();
  var navNarrowPos = $(".main-content").position().top - $(window).scrollTop();

  if ((navRelPos <= 0 && fixedHeader === false) || (navRelPos > 0 && fixedHeader === true)) {
    toggleHeader();
  } else if((narrowHeader === false && navNarrowPos <= 0 || narrowHeader === true && navNarrowPos > 0)) {
    toggleHeaderNarrow();
  }

  $('.collapse').collapse('hide');
});

$().ready(args => {

  // Get the shadow that will be used to restore it.
  mainContentShadow = $(".main-content").css('box-shadow');
  
  // Restores the header to wide state when clicking at the logo
  // as it moves the page to the top.
  $('.navbar-brand').click(setHeaderWide);

  // Hide the menu when clicking outside of it in a narrow screen.
  $('.navlink').click(() => {
    $('.collapse').collapse('hide');
  });
  $('body').click(() => {
    $('.collapse').collapse('hide');
  })
});
})(jQuery)