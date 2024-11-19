emailjs.init({
    publicKey: 'pPlcVIq2RDTpFILfO',
    // Do not allow headless browsers
    blockHeadless: true,
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 10s
      throttle: 0,
    },
  });
  
document
  .getElementById('contact-form')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get and trim the values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const movingFrom = document.getElementById('moving-from').value.trim();
    const movingTo = document.getElementById('moving-to').value.trim();
    const message = document.getElementById('message').value.trim();

    let hasError = false;

    // Pattern to detect dangerous characters
    const dangerousCharsPattern = /[<>{}()'"`;=:*]/;

    // Validate fields
    const fields = [
      {
        id: 'name',
        value: name,
        errorId: 'name-error',
        errorMessage: 'Invalid name.',
      },
      {
        id: 'phone',
        value: phone,
        errorId: 'phone-error',
        errorMessage: 'Invalid phone number.',
      },
      {
        id: 'moving-from',
        value: movingFrom,
        errorId: 'moving-from-error',
        errorMessage: 'Invalid "Moving From" value.',
      },
      {
        id: 'moving-to',
        value: movingTo,
        errorId: 'moving-to-error',
        errorMessage: 'Invalid "Moving To" value.',
      },
      {
        id: 'message',
        value: message,
        errorId: 'message-error',
        errorMessage: 'Invalid message.',
      },
    ];

    fields.forEach((field) => {
      const errorElement = document.getElementById(field.errorId);
      if (dangerousCharsPattern.test(field.value)) {
        errorElement.textContent = field.errorMessage;
        errorElement.classList.remove('hidden');
        hasError = true;
      } else {
        errorElement.classList.add('hidden');
      }
    });

    // Stop if any validation failed
    if (hasError) return;

    try {
      // Disable the submit button
      const submitButton = document.getElementById('submit-button');
      submitButton.disabled = true;
      submitButton.innerText = 'Submitting...';

      // Send the email via EmailJS
      emailjs
      .sendForm('service_gjczm9v', 'template_xgigrtw', this)
      .then(
        function () {
          // Display success message near the submit button
          const successMessage = document.createElement('p');
          successMessage.className = 'text-green-500 mt-4';
          successMessage.textContent = "Thank you for your message! We'll get back to you shortly.";
          submitButton.parentNode.insertBefore(successMessage, submitButton.nextSibling);

          // Reset the form fields
          document.getElementById('contact-form').reset();
        },
        function (err) {
          // Log the error and display the error message
          console.log(err);
          document.getElementById('submit-error').classList.remove('hidden');
        }
      )
      .finally(() => {
        submitButton.disabled = false;
        submitButton.innerText = 'Submit';
      });
    } catch (err) {
      console.log(err);
    }
  });
