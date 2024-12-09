document.getElementById("backArrow").addEventListener("click", function () {
  window.location.href = "/page/account.html";
});

function enableEditing() {
  const formElements = document.querySelectorAll("#infoForm input");
  formElements.forEach((element) => {
    element.disabled = false;
  });
  showSaveButton();
}

document.addEventListener("DOMContentLoaded", (event) => {
  fetchData();
});

function fetchData() {
  // Fetch data from the backend
  fetch("your-backend-endpoint")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("profilePicture").src = data.profilePictureUrl;
      document.getElementById("fullName").value = data.fullName;
      document.getElementById("phoneNumber").value = data.phoneNumber;
      document.getElementById("email").value = data.email;
      document.getElementById("address").value = data.address;
      document.getElementById("location").value = data.location;
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function updateProfilePicture() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profilePicture").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function saveData(event) {
  event.preventDefault();
  const formData = new FormData(document.getElementById("infoForm"));

  // Add the profile picture to the form data
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (file) {
    formData.append("profilePicture", file);
  }

  // Send the data to the backend
  fetch("your-backend-endpoint", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      console.log("Profile updated successfully:", data);
      hideSaveButton(); // Hide the save button after the profile is updated
    })
    .catch((error) => console.error("Error updating profile:", error));
}

function showSaveButton() {
  document.getElementById("saveButtonContainer").classList.remove("hidden");
}

function hideSaveButton() {
  document.getElementById("saveButtonContainer").classList.add("hidden");
  disableEditing();
}

function disableEditing() {
  const formElements = document.querySelectorAll("#infoForm input");
  formElements.forEach((element) => {
    element.disabled = true;
  });
}
