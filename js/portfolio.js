(function($) {

let $modal;
let $modalWrapper;
let $nav;

// TODO check if the following can be uncached
let $project;
let projectTop;
let projectLeft;

function openModal($projectClicked) {
  // TODO check if the following can be uncached
  // Cache the project to future close of the modal
  $project = $projectClicked;

  // Get the position of the clicked project and hides it
  projectTop = $project.offset().top;
  projectLeft = $project.offset().left;
  $project.css({visibility: 'hidden'});

  // Transfer project content to the modal
  $project.children().clone().appendTo($modal);
  
  // Set the modal on top of the clicked project, and make it visible
  $modal.offset({top: projectTop, left: projectLeft});
  $modalWrapper.addClass('modal-visible');

  // Prevent scrolling in the body of the html
  $('body').addClass('modal-open');

  // Get the dimensions of the screen and the modal to move it to the center
  let windowHeight = $(window).outerHeight();
  let windowWidth = $(window).outerWidth();
  let modalHeight = $modal.outerHeight();
  let modalWidth = $modal.outerWidth();
  let navHeight = $nav.outerHeight();

  // Move the modal to the centered position (width and height given with modal-full)//
  /*
  $modal.animate({
    top: (windowHeight + navHeight - modalHeight) / 2,
    left: (windowWidth - modalWidth) / 2,
  }, 500, args => {
      $modal.css({
        top: (windowHeight + navHeight) / 2,
        left: windowWidth / 2,
      })
      $modal.addClass('modal-full');
  });
  */
  $modal.addClass('modal-full');
  
  $modal.removeAttr('style');
  /*
        top: (windowHeight + navHeight) / 2,
        left: windowWidth / 2,
      })
  */
      //$modal.addClass('modal-full');
      
}

function closeModal() {

  console.log('CloseModal');

  // Get the dimensions of the screen and the modal to move it to the center
  let windowTop = $(window).scrollTop();
  let windowHeight = $(window).outerHeight();
  let windowWidth = $(window).outerWidth();
  let modalHeight = $modal.outerHeight();
  let modalWidth = $modal.outerWidth();
  let navHeight = $nav.outerHeight();

  // Move the modal to the position and final width and height
  /*
  $modal.css({
    top: (windowHeight + navHeight) / 2,
    left: windowWidth / 2,
  });
  */
  
  $modal.css({
    top: projectTop - windowTop + $project.outerHeight() / 2,
    left: projectLeft + $project.outerWidth() / 2,
  });
  
  //$modal.removeClass('modal-full');
  //$modal.offset({top: projectTop, left: projectLeft});
  $modal.removeClass('modal-full').addClass('modal-closing');
  setTimeout(args => {
    $modal.removeClass('modal-closing');
    $modal.removeAttr('style');
    $modalWrapper.removeClass('modal-visible');
    $project.css({visibility: 'visible'});
    // Return body scrolling to normal
    $('body').removeClass('modal-open');
    // Transfer back the content to the project 'card'
    $modal.children().remove(); //appendTo($project);
  }, 500);
  
}

$().ready(args => {
  $modal = $('#p-modal');
  $modalWrapper = $('#modal-wrapper');
  $nav = $('nav');

  $('.p-item:not(#p-modal)').click(function() {openModal($(this))});

  $('#modal-bg').click(closeModal);
});

})(jQuery)