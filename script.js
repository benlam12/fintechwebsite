$(document).ready(function () {
  // Retrieve stored form data from local storage
  let formData = JSON.parse(localStorage.getItem('formData'));

  // Check if data exists, otherwise initialize an empty object
  if (!formData) {
    formData = {};
  }

  // Handle submit button click
  $('#dynamicForm').submit(function (event) {
    event.preventDefault();

    // Update form data
    formData.name = $('#name').val();
    formData.email = $('#email').val();
    formData.birthday = $('#birthday').val();
    formData.gender = $('#gender').val();
    formData.phone_number = $('#phone_number').val();

    // Generate and store hashed data
    const hashedData = CryptoJS.SHA256(JSON.stringify(formData)).toString();
    $('#hashedKey').text(hashedData);

    // Show verification container and popup form
    $('.verification-container').show();
    $('#popupForm').show();

    // Save updated form data to local storage
    localStorage.setItem('formData', JSON.stringify(formData));
  });

  // Handle verify key button click
  $('#verify-key-button').click(function () {
    // Get the user-entered key
    const userKey = $('#key').val();

    // Compare user key with stored hashed data
    if (userKey === $('#hashedKey').text()) {
      // Key verified, display form data
      $('#popupForm').empty();

      let content = '<p>Verified! Your submitted data:</p>';
        for (const field in formData) {
          content += `<p>${field}: ${formData[field]}</p>`;
        }

        // Append the constructed content to the popup
        $('#popupForm').append(content);

        // Show the popup
        $('#popupForm').show();
      } else {
        // Key mismatch, show error message
      alert('Invalid key. Please try again.');
    }
  });

  // Handle close popup button click
  $('#closePopup').click(function (event) {
    event.preventDefault();

    // Hide verification container and popup form
    $('.verification-container').hide();
    $('#popupForm').hide();
  });
});
