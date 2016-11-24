(function($) {

let $btn;
let $name; // referenced to the wrapper, not the input
let $email; // referenced to the wrapper, not the input
let $message;
let inputReady = false;

$().ready(args => {
  $btn = $('#btnSend');
  $name = $('#name-form');
  $email = $('#email-form');
  $message = $('#message-form');

  $('#btnSend').click(sendClick);
});

const sendClick = e => {

  e.preventDefault();

  inputReady = checksErrors();

  if (inputReady) {
    console.log('SEND');
    let message = $message.children('textarea').val();
    let name = $name.children('input').val();
    let email = $email.children('input').val();

    $.ajax({
      url: "https://formspree.io/dangonrei@gmail.com", 
      method: "POST",
      data: $('#form').serialize(),
      dataType: "json",
    });
  }

}

const checksErrors = $wrapper => {
  // If an error is found, return false. Otherwise return true
  let checkAll = false;
  $nameInput = $name.children('input');
  $emailInput = $email.children('input');
  let inputsWithError = [];
  
  if (!$wrapper) {
    // if the $wrapper is not sent, check all
    checkAll = true;
  }

  if (checkAll || $wrapper == $name) {
    // checks if the name is empty
    if ($nameInput.val() == '') {
      inputError($name);
      inputsWithError.push('name');
    } else {
      // remove listeners
      $nameInput.off('keyup').off('focusout');
    }
  }
  if (checkAll || $wrapper == $email) {
    if (!/^[a-z0-9+_.-]+@[a-z0-9.]+\.[a-z]{2,4}$/
        .test($emailInput.val().toLowerCase())) {
      inputError($email);
      inputsWithError.push('email');
    } else {
      $emailInput.off('keyup').off('focusout');
    }
  }

  // TODO handle a notification when we have errors
  
  return inputsWithError.length == 0? true : false;
}

const inputError = $wrapper => {
  let $wrapperInput = $wrapper.children('input');
  $wrapper.addClass('has-error');
  //$wrapperInput.focus()

  // Add a change listener to handle changes
  // If the input is wrong and the user changes it, the error is removed
  // But, if the input us unfocused and the value is wrong, the error appears again
  $wrapperInput.off('keyup').off('focusout');
  $wrapperInput.keyup(function(e) {
    if($(this).val() != '') {
      $wrapper.removeClass('has-error');
    }
  });
  $wrapperInput.focusout(checksErrors.bind(this, $wrapper));

}

})(jQuery)