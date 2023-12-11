
  $(document).ready(function () {
	  
	function generateCsvString(data) {
    const columns = Object.keys(data[0]);
    let csvString = "";

    // Add header row
    csvString += columns.join(",") + "\n";

    // Add data rows
    for (const row of data) {
      csvString += Object.values(row).join(",") + "\n";
    }

    return csvString;
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


      const hashedData = CryptoJS.SHA256(JSON.stringify(formData)).toString();

      $('#hashedKey').text(hashedData);

      // Show popup form
      $('#popupForm').show();

      
       $(this).trigger("reset");
    });

    // Handle close popup button click
    $('#closePopup').click(function (event) {
      event.preventDefault();

      // Hide popup form
      $('#popupForm').hide();
    });
  });
