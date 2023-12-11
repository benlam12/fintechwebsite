const db = new ydn.db.Storage({
  name: 'formData',
  schema: {
    id: { type: 'string', primaryKey: true },
    formData: { type: 'object' },
    hashedKey: { type: 'string' },
  },
});

db.connect()
  .then(() => console.log('Database connected!'))
  .catch((err) => {
    alert('Error connecting to database: ' + err.message);
  });

const submitForm = async () => {
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
  const combinedData = { formData, hashedKey: hashedData };

  // Save data to ydn.db
  try {
    await db.insert(combinedData);
    console.log('Data saved successfully!');
  } catch (err) {
    console.error('Error saving data:', err);
  }

  // Show popup form
  $('#popupForm').show();

  // Store hashed key in popup
  $('#hashedKey').text(hashedData);

  // Clear form
  $(this).trigger("reset");
};

const verifyKey = async () => {
  event.preventDefault();

  // Get entered key
  const enteredKey = $('#key').val();

  try {
    const data = await db.find({ hashedKey: enteredKey });

    if (data.length > 0) {
      const record = data[0];

      // Key is valid, display data
      $('#verification-container').hide();
      $('#popupForm').show();
      $('#hashedKey').text('Identity Verified');
      $('#popupForm').empty();
      $('#popupForm').append(`
        <h2>Form Data</h2>
        <ul>
          <li>Name: ${record.formData.name}</li>
          <li>Email: ${record.formData.email}</li>
          <li>Birthday: ${record.formData.birthday}</li>
          <li>Gender: ${record.formData.gender}</li>
          <li>Phone Number: ${record.formData.phone_number}</li>
        </ul>
      `);
    } else {
      alert('Invalid key!');
    }
  } catch (err) {
    console.error('Error finding data:', err);
  }
};

$('#dynamicForm').submit(submitForm);
$('#verify-key-button').click(verifyKey);

$('#closePopup').click(function (event) {
  event.preventDefault();

  // Clear hashed key
  $('#hashedKey').text('');

  // Hide popup form
  $('#popupForm').hide();
  $('#verification-container').show();
});
