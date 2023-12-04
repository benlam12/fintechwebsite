// Function to hash data using CryptoJS SHA-256
function hashData(data) {
    return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

const identityForm = document.getElementById("identityForm");
const myPopup = document.getElementById("myPopup");
const closePopup = document.getElementById("closePopup");
const hashedDataDisplay = document.getElementById("hashedData");

identityForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let gender = document.getElementById("gender").value;
    let birthday = document.getElementById("birthday").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let email = document.getElementById("email").value;

    if (name === "" || gender === "" || birthday === "" || phoneNumber === "" || email === "") {
        alert("Please fill in all fields!");
    } else {
        let formData = {
            name: name,
            gender: gender,
            birthday: birthday,
            phoneNumber: phoneNumber,
            email: email
        };

        let jsonData = JSON.stringify(formData);
        let hashedData = hashData(jsonData);

        // Display the hashed value in the popup
        hashedDataDisplay.textContent = "Hashed Data:\n" + hashedData;
        myPopup.classList.add("show");
    }
});

closePopup.addEventListener("click", function () {
    myPopup.classList.remove("show");
});

window.addEventListener("click", function (event) {
    if (event.target == myPopup) {
        myPopup.classList.remove("show");
    }
});
