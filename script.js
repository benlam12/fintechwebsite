const form = document.getElementById("dynamicForm");
const submitButton = document.querySelector("button[type='submit']");
const dataModal = document.getElementById("data-modal");

const userData = [];

submitButton.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Clear existing data from previous submissions
  userData.length = 0;

  // Collect data from form
  for (const element of form.elements) {
    if (element.tagName === "INPUT" || element.tagName === "SELECT") {
      userData.push({
        name: element.name,
        value: element.value,
      });
    }
  }

  // Hash each element of the user data array
  const hashedDataPromises = userData.map((data) =>
    window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(data.value))
  );

  // Wait for all hashing tasks to complete
  const hashedData = await Promise.all(hashedDataPromises);

  // Combine hashed data with original data
  const combinedData = userData.map((data, index) => {
    return {
      name: data.name,
      value: data.value,
      hash: Array.from(new Uint8Array(hashedData[index]))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""),
    };
  });

  // Display hashed data in modal
  document.getElementById("hashed-data").textContent = JSON.stringify(combinedData,null,2);
  dataModal.classList.remove("hidden");


  console.log("Collected and hashed data:", combinedData);
});

// Close the data modal
document.getElementById("close-modal-button").addEventListener("click", () => {
  dataModal.classList.add("hidden");
});
