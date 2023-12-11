
  $(document).ready(function () {
    // Handle submit button click
    $('#dynamicForm').submit(function (event) {
      event.preventDefault();

      // Collect form data
      const formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        birthday: $('#birthday').val(),
        gender: $('#gender').val(),
        phone_number: $('#phone_number').val(),
      };


      const hashedData = CryptoJS.SHA256(JSON.stringify(formData)).toString();

      $('#hashedKey').text(hashedData);

      // Show popup form
      $('#popupForm').show();

      
       $(this).trigger("reset");
    });

   $('#verify-key-button').click(function () {
    // Get the user-entered key
    const userKey = $('#key').val();

    // Compare user key with stored hashed data
    if (userKey === $('#hashedKey').text()) {
      // Key verified, display form data

      // Loop through each form field and update its value
      for (const field in formData) {
        $(`#${field}`).val(formData[field]);
      }

      // Show verification message
      alert('Key verified! Form data restored.');
    } else {
      // Key mismatch, show error message
      alert('Invalid key. Please try again.');
    }
  });

  // Handle close popup button click
  $('#closePopup').click(function (event) {
    event.preventDefault();

    // Hide popup form
    $('#popupForm').hide();
  });
});
