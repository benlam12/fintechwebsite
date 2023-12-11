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

    // Clear form inputs
    $('#dynamicForm input').val('');
    $('#dynamicForm textarea').val('');

    // Save updated form data to local storage
    localStorage.setItem('formData', JSON.stringify(formData));
  });

  // Handle verify key button click
  $('#verify-key-button').click(function () {
    // Get the user-entered key
    const userKey = $('#key').val();

    // Compare user key with stored hashed data
    if (userKey === $('#hashedKey').text()) {
      // Key verified, display form data with key

      // Clear any previous content from the popup
      $('#popupForm').empty();

      // Construct HTML content with formatted and capitalized data
      let content = '<p><strong>Verified! </strong><br>';
      for (const field in formData) {
        let capitalizedField;
        let fieldValue = formData[field];

        // Capitalize specific fields
        switch (field) {
          case 'name':
          case 'email':
          case 'phone_number':
          case 'birthday':
          case 'gender':
            capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
            break;
          default:
            capitalizedField = field;
        }

        content += `<p><strong>${capitalizedField}:</strong> ${fieldValue}</p>`;
      }

      // Append key to content
      content += `<p><strong>Key:</strong> ${userKey}</p>`;

      // Append the constructed content to the popup
      $('#popupForm').append(content);
    } else {
      // Key mismatch, show error message
      alert('Invalid key. Please try again.');
    }
  });

  // Handle close button click
  $('.close-button').click(function (event) {
    event.preventDefault();

    // Hide verification container and popup form
    $('.verification-container').hide();
    $('#popupForm').hide();

    // Clear form inputs
    $('#dynamicForm input').val('');
    $('#dynamicForm textarea').val('');
  });
});
