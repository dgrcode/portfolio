(function($) {

let $btn;
let $name; // referenced to the wrapper, not the input
let $email; // referenced to the wrapper, not the input
let $message;
let $alert;
let inputReady = false;

$().ready(args => {
  $btn = $('#btnSend');
  $name = $('#name-form');
  $email = $('#email-form');
  $message = $('#message-form');
  $alertContainer = $('#alert-container');
  $alert = $('#contact-alert');
  $alertContent = $('#alert-content');

  $('#btnSend').click(sendClick);

  $('#alert-btn-close').click(closeAlert);
});

const sendClick = e => {
  console.log('entra en sendClick');

  e.preventDefault();
  closeAlert();

  inputReady = checksErrors();

  if (inputReady) {
    console.log('SEND');
    let message = $message.children('textarea').val();
    let name = $name.children('input').val();
    let email = $email.children('input').val();

    let formspreeUrl = "https://formspree.io/dangonrei@gmail.com";
    let formspreeData = $('#form').serialize();

    $.ajax({
      url: "https://formspree.io/dangonrei@gmail.com", 
      method: "POST",
      data: $('#form').serialize(),
      dataType: "json",
    })
      .done(messageSentSuccess)
      .fail(messageNotSent);
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

  // If the form has error, show an alert explaining it
  let hasError = inputsWithError.length == 0? false : true;
  if (hasError) {
    let multiError = inputsWithError.length > 1;
    let endingS = multiError? 's ' : ' ';
    let errorMessage = 'There ' + (multiError? 'are some ' : 'is an ') +
        'error' + endingS + 'in the field' + endingS +
        inputsWithError.join(' and ');

    // Show an alert
    $alertContainer.addClass('visible');
    $alert.addClass('alert-danger');
    $alertContent.html(errorMessage);
  }
  
  // returns true if checksError doesn't find an error (i.e. hasError = false)
  return !hasError;
}

const inputError = $wrapper => {
  let $wrapperInput = $wrapper.children('input');
  $wrapper.addClass('has-error');
  //$wrapperInput.focus()

  // Add a change listener to handle changes
  // If the input is wrong and the user changes it, the error is removed
  // But, if the input is unfocused and the value is wrong, the error appears again
  $wrapperInput.off('keyup').off('focusout');
  $wrapperInput.keyup(function(e) {
    if($(this).val() != '') {
      $wrapper.removeClass('has-error');
    }
  });
  $wrapperInput.focusout(checksErrors.bind(this, $wrapper));

}

const messageSentSuccess = () => {
  console.log('messageSentSuccess');

  // clear the inputs
  $name.children('input').val('');
  $email.children('input').val('');
  $message.children('textarea').val('');

  // show the alert with the success message
  $alertContainer.addClass('visible');
  $alert.addClass('alert-success');
  $alertContent.html(
    'Your message was sent successfully. ' +
    'I will write you back as soon as possible. ' +
    'Thank you for contacting me! :)'
  );
}

const messageNotSent = () => {
  // show the alert
  $alertContainer.addClass('visible');
  $alert.addClass('alert-danger');
  $alertContent.html(
    'There was a problem sending your message.'+
    ' You can try again or email me directly at <b>dangonrei@gmail.com</b>.'+
    ' Sorry for the inconvenience.'
  );
}

const closeAlert = () => {
  console.log('closeAlert');
  $alertContainer.removeClass('visible alert-success alert-danger');
  $alert.removeClass('alert-success alert-danger');
  $alertContent.val('');
}

// TODO animation for closing alert?
// TODO shadows in the alert?

})(jQuery)
