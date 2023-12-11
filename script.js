import sqlite3 from 'sqlite3';

$(document).ready(function () {
  // Handle submit button click
  $('#dynamicForm').submit(async function (event) {
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

    // Send data to server to save in the database
    try {
      const saveResponse = await fetch('/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formData: formData,
          hashedKey: hashedData
        })
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      return;
    }

    // Show popup form
    $('#hashedKey').text(hashedData);
    $('#popupForm').show();
    $(this).trigger("reset");
  });

  // Handle close popup button click
  $('#closePopup').click(function (event) {
    event.preventDefault();

    // Hide popup form
    $('#popupForm').hide();
  });

  // Handle key verification
  $('#verify-key-button').click(async function () {
    const keyToVerify = $('#key').val();

    try {
      const response = await fetch('/verifyKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key: keyToVerify })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const formData = result.formData;
          // Display or use the verified form data as needed
          console.log('Verified Form Data:', formData);
        } else {
          alert('Key not found');
        }
      } else {
        console.error('Failed to verify key');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
