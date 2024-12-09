// Existing JavaScript code

const openFileButton = document.getElementById("openFileButton");
const fileInput = document.getElementById("fileInput");
const fileNameDisplay = document.getElementById("fileName");
const errorMessage = document.getElementById("error-message");

openFileButton.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
  ];
  const maxSize = 104857600; // 100MB in bytes

  if (file) {
    if (!allowedTypes.includes(file.type)) {
      errorMessage.textContent =
        "Invalid file type. Please upload only PDF or image files.";
      errorMessage.classList.remove("hidden");
      fileInput.value = ""; // Clear the input
      return;
    }

    if (file.size > maxSize) {
      errorMessage.textContent =
        "File size exceeds 100MB. Please upload a smaller file.";
      errorMessage.classList.remove("hidden");
      fileInput.value = ""; // Clear the input
      return;
    }

    errorMessage.classList.add("hidden");
    fileNameDisplay.innerHTML = `
      <div
        class="w-full min-h-[92px] py-4 px-6 rounded-[16px] bg-[#FAFAFA] border border-solid border-gray-100 flex justify-between items-center"
      >
        <div class="flex gap-4 items-center">
          <img src="../images/upload-icons.png" class="w-[60px] h-[60px]" alt="Upload Icon" />
          <p class="font-[700] text-[18px] w-[222px]">${file.name}</p>
        </div>
        <img src="../images/delete.png" class="w-18px h-5" alt="Delete" onclick="deleteFile(this)">
      </div>`;
  } else {
    errorMessage.textContent = "Please select a valid file.";
    errorMessage.classList.remove("hidden");
  }
});

function openTab(evt, tabName) {
  // Hide all tab contents
  var tabContents = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
    tabContents[i].style.display = "none"; // Ensure the inactive content is hidden
  }

  // Remove active class from all tab links
  var tabLinks = document.getElementsByClassName("tab-link");
  for (var i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("tab-link-active");
  }

  // Show the selected tab and add an active class to the tab link
  document.getElementById(tabName).classList.add("active");
  document.getElementById(tabName).style.display = "block"; // Ensure the active content is displayed
  evt.currentTarget.classList.add("tab-link-active");
}

// Make sure FAQ is visible by default
document.getElementById("create-new").classList.add("active");
document.getElementById("create-new").style.display = "block";
document.querySelector(".tab-link").classList.add("tab-link-active");

document.querySelectorAll("button[data-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);
    if (targetElement.classList.contains("hidden")) {
      targetElement.classList.remove("hidden");
    } else {
      targetElement.classList.add("hidden");
    }
  });
});

function deleteFile(element) {
  element.parentElement.remove();
  fileInput.value = ""; // Clear the input
}

// Listen for form input changes to validate the form
const registerForm = document.getElementById("registerForm");
const verifyButton = document.getElementById("verifyButton");

registerForm.addEventListener("input", checkFormCompletion);
fileInput.addEventListener("change", checkFormCompletion);

function checkFormCompletion() {
  const inputs = registerForm.querySelectorAll("input[required]");
  let formComplete = true;

  // Check if all required form fields are filled
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      formComplete = false;
    }
  });

  // Check if a valid file has been uploaded
  const file = fileInput.files[0];
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
  ];
  const maxSize = 104857600; // 100MB in bytes

  let fileValid = false;
  if (file) {
    if (allowedTypes.includes(file.type) && file.size <= maxSize) {
      fileValid = true;
    }
  }

  // Show the "Start verification" button if the form is complete and a valid file is uploaded
  if (formComplete && fileValid) {
    verifyButton.classList.remove("hidden");
  } else {
    verifyButton.classList.add("hidden");
  }
}

// Handle form submission
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData();
  formData.append("address", document.getElementById("address").value);
  formData.append("state", document.getElementById("state").value);
  formData.append(
    "localGovernment",
    document.getElementById("local-government").value,
  );
  formData.append("landmark", document.getElementById("landmark").value);

  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length > 0) {
    formData.append("file", fileInput.files[0]);
  }

  try {
    const response = await fetch("YOUR_BACKEND_URL_HERE", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Form submitted successfully");
    } else {
      console.error("Form submission failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

const propertyPending = document.getElementById("pending");

fetch("/api/documents/:id")
  .then((response) => response.json())
  .then((pendings) => {
    propertyPending.innerHTML = `
       <div class="flex gap-4 flex-col">
        <div
          class="w-full h-[278px] flex flex-col gap-4 bg-[#FAFAFA] rounded-[16px] p-5 border border-solid border-gray-200">
          <div class="flex justify-between gap-5 font-[600] items-center">
            <p class="font-[600] text-[16px]">
              ${pendings.address}
            </p>
            <p
              class="w-[105px] h-[28px] rounded-[6px] py-[6px] px-[10px] bg-gradient-to-r from-[#A4634D] to-[#AC7E6E] text-[10px] text-nowrap text-white">
              ${pendings.status}
            </p>
          </div>

          <p class="font-[700] text-[20px] text-[#212121]">
            ${pendings.message}
          </p>

          <div class="flex justify-between gap-3">
            <button
              id="pending-cancel"
              class="w-[165px] h-[42px] rounded-[100px] py-2 px-5 border-2 border-[#F75555] font-[600] text-[16px] text-[#F75555]">
              Cancel
            </button>

            <button
              id="make-payment"
              class="w-[165px] h-[42px] rounded-[100px] py-2 px-5 font-[600] text-[16px] text-[#FFFFFF] bg-gradient-to-r from-[#A4634D] to-[#AC7E6E] text-nowrap">
              Make Payment
            </button>
          </div>
        </div>
        <div
          class="w-full h-[222px] flex flex-col gap-4 bg-[#FAFAFA] rounded-[16px] p-5 border border-solid border-gray-200">
          <div class="flex justify-between gap-5 font-[600] items-center">
            <p class="font-[600] text-[16px]">
              ${pendings.address}
            </p>
            <p
              class="w-[71px] h-[28px] rounded-[6px] py-[6px] px-[10px] bg-gradient-to-r from-[#009B8D] to-[#32D0C2] text-[10px] text-nowrap text-white">
              ${pendings.status}
            </p>
          </div>
          <p class="font-[700] text-[20px] text-[#212121]">
            ${pendings.message}
          </p>
          <button
            id="waiting"
            class="w-full h-[42px] rounded-[100px] py-[8px] px-5 bg-gradient-to-r from-[#009B8D] to-[#32D0C2] font-[600] text-[16px] text-white">
            Track Progress
          </button>
        </div>
      </div>
    `;
  })
  .catch((error) => {
    console.error("Error fetching user data:", error);
    propertyPending.innerHTML = `<p class="text-red-500">Failed to load the data.</p>`;
  });

const propertyCompleted = document.getElementById("completed");

fetch("/api/documents/:id")
  .then((response) => response.json())
  .then((completed) => {
    propertyCompleted.innerHTML = `
    <div class="flex flex-col gap-5 w-full">
      <div class="w-full rounded-2xl p-5 flex flex-col gap-4 bg-[#FAFAFA] border border-[#EEEEEE]  ">
        <div class="flex justify-between gap-5 font-[600] items-center">
          <p class="font-[600] text-[16px]">
            ${completed.address}
          </p>
          <p
            class="rounded-[6px] py-[6px] px-[10px] bg-gradient-to-r from-[#F5484A] to-[#FF7475] text-[10px] text-nowrap text-white">
            ${completed.status} </p>
        </div>
        <hr class=" bg-[#EEEEEE]" />
        <p class="font-[700] text-[20px] text-[#212121]">
          ${completed.message} </p>
        <hr class=" bg-[#EEEEEE]" />
        <hr class=" bg-[#EEEEEE]" />
        <button
          id="completed-cancalled"
          class="w-full rounded-[100px] py-2 px-5 border-2 border-[#F75555] font-[600] text-[16px] text-[#F75555]">
          Restart Verification
        </button>
      </div>
      <div class="w-full rounded-2xl p-5 flex flex-col gap-4 bg-[#FAFAFA] border border-[#EEEEEE]  ">
        <div class="flex justify-between gap-5 font-[600] items-center">
          <p class="font-[600] text-[16px]">
            ${completed.address}
          </p>
          <p
            class="rounded-[6px] py-[6px] px-[10px] bg-gradient-to-r from-[#01B763] to-[#34E895] text-[10px] text-nowrap text-white">
            ${completed.status} </p>
        </div>
        <hr class=" bg-[#EEEEEE]" />
        <p class="font-[700] text-[20px] text-[#212121]">
          ${completed.message} </p>
        <hr class=" bg-[#EEEEEE]" />
        <hr class=" bg-[#EEEEEE]" />
        <button
          id="completed-completed"
          class="w-full rounded-[100px] py-2 px-5 font-[600] text-[16px] text-[#FFFFFF] bg-[#01B763] text-nowrap">
          View Results </button>
      </div>
    </div>
    `;
  })
  .catch((error) => {
    console.error("Error fetching user data:", error);
    propertyCompleted.innerHTML = `<p class="text-red-500">Failed to load the data.</p>`;
  });


const navItems = document.querySelectorAll(".nav-item");

function setActiveNavItem() {
  const currentPage = window.location.pathname;

  navItems.forEach((item) => {
    const page = item.getAttribute("data-page");

    item.classList.remove("text-[#1ABE73]");
    item.querySelector("i").classList.remove("text-[#1ABE73]");

    if (currentPage.includes(page)) {
      item.classList.add("text-[#1ABE73]");
      item.querySelector("i").classList.add("text-[#1ABE73]");
    }
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => {
      nav.classList.remove("text-[#1ABE73]");
      nav.querySelector("i").classList.remove("text-[#1ABE73]");
    });

    item.classList.add("text-[#1ABE73]");
    item.querySelector("i").classList.add("text-[#1ABE73]");

    const page = item.getAttribute("data-page");
    if (page) {
      window.location.href = page;
    }
  });
});

setActiveNavItem();
