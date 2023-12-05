// Function to hash data using CryptoJS SHA-256
function hashData(data) {
    return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

// Event listener for form submission
const identityForm = document.getElementById("identityForm");
const myPopup = document.getElementById("myPopup");
const closePopup = document.getElementById("closePopup");
const hashedDataDisplay = document.getElementById("hashedData");

// Initialize Web3 with your provider
const web3 = new Web3('http://localhost:8545'); // Update with your provider URL

// Contract address and ABI
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address
const contractABI = [[
                      {
                        "inputs": [
                          {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                          },
                          {
                            "internalType": "string",
                            "name": "_gender",
                            "type": "string"
                          },
                          {
                            "internalType": "string",
                            "name": "_birthday",
                            "type": "string"
                          },
                          {
                            "internalType": "string",
                            "name": "_phoneNumber",
                            "type": "string"
                          },
                          {
                            "internalType": "string",
                            "name": "_email",
                            "type": "string"
                          }
                        ],
                        "name": "storeUserData",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                          }
                        ],
                        "name": "userRecords",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                          },
                          {
                            "internalType": "string",
                            "name": "gender",
                            "type": "string"
                          },
                          {
                            "internalType": "string",
                            "name": "birthday",
                            "type": "string"
                          },
                          {
                            "internalType": "string",
                            "name": "phoneNumber",
                            "type": "string"
                          },
                          {
                            "internalType": "string",
                            "name": "email",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      }
                    ]]; // Replace with your contract's ABI

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

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

        // Send hashed data to the smart contract
        sendToBlockchain(hashedData);
    }
});

// Function to send data to the smart contract
function sendToBlockchain(hashedData) {
    contract.methods.storeUserData(hashedData)
        .send({ from: 'YOUR_SENDER_ADDRESS' }) // Replace with the sender's address
        .on('transactionHash', function(hash){
            console.log('Transaction Hash:', hash);
            // You can perform actions after the transaction is mined
        })
        .on('error', function(error){
            console.error('Error:', error);
            // Handle errors during the transaction
        });
}

// Rest of your code (popup handling, event listeners, etc.)
// ...
