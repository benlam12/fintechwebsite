$(document).ready(function () {

  // Define function to write data to a CSV file
  function writeCsvData(filename, data) {
    const csvString = Papa.unparse(data);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, filename);
  }

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

    // Hash the data
    const hashedData = CryptoJS.SHA256(JSON.stringify(formData)).toString();

    // Combine data with hash
    const combinedData = { ...formData, hashedKey: hashedData };

    // Write data to a local CSV file
    writeCsvData("form_data.csv", [combinedData]);

    // Show popup form
    $('#popupForm').show();

    // Store hashed key in popup
    $('#hashedKey').text(hashedData);

    // Clear form
    $(this).trigger("reset");
  });

  // Handle verify key button click
  $('#verify-key-button').click(function (event) {
    event.preventDefault();

    // Get entered key
    const enteredKey = $('#key').val();

    // Read data from the local CSV file
    Papa.parse("form_data.csv", {
      download: true,
      complete: function (results) {
        const data = results.data;
        const record = data.find(record => record.hashedKey === enteredKey);

        if (record) {
          // Key is valid, show form data
          $('#verification-container').hide();
          $('#popupForm').show();
          $('#hashedKey').text('Identity Verified');

          // Display form data in popup
          $('#popupForm').empty();
          $('#popupForm').append(`
            <h2>Form Data</h2>
            <ul>
              <li>Name: ${record.name}</li>
              <li>Email: ${record.email}</li>
              <li>Birthday: ${record.birthday}</li>
              <li>Gender: ${record.gender}</li>
              <li>Phone Number: ${record.phone_number}</li>
            </ul>
          `);
        } else {
          alert('Invalid key!');
        }
      },
    });
  });

  // Handle close popup button click
  $('#closePopup').click(function (event) {
    event.preventDefault();

    // Hide popup form
    $('#popupForm').hide();
    $('#verification-container').show();
  });
});
