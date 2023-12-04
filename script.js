// This function will hash the data using SHA-256
function hashData(data) {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

let identityForm = document.getElementById("identityForm");

identityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let gender = document.getElementById("gender").value;
  let birthday = document.getElementById("birthday").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let email = document.getElementById("email").value;

  if (name === "" || gender === "" || birthday === "" || phoneNumber === "" || email === "") {
    alert("Please fill in all fields!");
  } else {
    // Create an object to hold the form data
    let formData = {
      name: name,
      gender: gender,
      birthday: birthday,
      phoneNumber: phoneNumber,
      email: email
    };

    // Convert the form data to a JSON string
    let jsonData = JSON.stringify(formData);

    // Hash the JSON string using SHA-256
    let hashedData = hashData(jsonData);

    // Display the hashed value
    console.log("Hashed Data:", hashedData);

    // Clearing form inputs after submission
    document.getElementById("name").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("birthday").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("email").value = "";

    alert("Form data hashed successfully!");
  }
});
