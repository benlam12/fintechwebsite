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

    $.ajax({
        type: 'POST',
        url: '/saveData', // Replace with your server endpoint
        data: {
          formData: formData,
          hashedKey: hashedData
        },
        success: function (response) {
          $('#popupForm').show();
          $(this).trigger("reset");
        },
        error: function (error) {
          console.error('Error:', error);
        }
      });


    // Handle key verification
    $('#verify-key-button').click(async function () {
      const keyToVerify = $('#key').val();

      // Send key verification request to server
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


    // Handle close popup button click
    $('#closePopup').click(function (event) {
      event.preventDefault();

      // Hide popup form
      $('#popupForm').hide();
    });
  });
