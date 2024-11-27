document.getElementById("backArrow").addEventListener("click", function () {
  window.location.href = "/page/started.html";
});

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const messageDiv = document.getElementById("message");
    let valid = true;

    document
      .querySelectorAll(".text-red-500")
      .forEach((el) => el.classList.add("hidden"));

    // Validate inputs
    if (!document.getElementById("name").checkValidity()) {
      document.getElementById("name-error").classList.remove("hidden");
      valid = false;
    }
    if (!document.getElementById("surname").checkValidity()) {
      document.getElementById("surname-error").classList.remove("hidden");
      valid = false;
    }
    if (!document.getElementById("email").checkValidity()) {
      document.getElementById("email-error").classList.remove("hidden");
      valid = false;
    }
    if (!document.getElementById("password").checkValidity()) {
      document.getElementById("password-error").classList.remove("hidden");
      valid = false;
    }
    if (password !== confirmPassword) {
      document
        .getElementById("confirm-password-error")
        .classList.remove("hidden");
      valid = false;
    }

    if (!valid) {
      messageDiv.textContent = "Please correct the errors above and try again.";
      messageDiv.className = "text-red-500";
      return;
    }

    const formData = {
      firstName: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await fetch("YOUR_BACKEND_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        messageDiv.textContent = "Form submitted successfully!";
        messageDiv.className = "text-green-500";
      } else {
        messageDiv.textContent = "Failed to submit the form.";
        messageDiv.className = "text-red-500";
      }
    } catch (error) {
      console.error("Error:", error);
      messageDiv.textContent = "An error occurred. Please try again.";
      messageDiv.className = "text-red-500";
    }
  });

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const icon = this;
    if (passwordField.type === "password") {
      passwordField.type = "text";
      icon.classList.replace("bx-hide", "bx-show");
    } else {
      passwordField.type = "password";
      icon.classList.replace("bx-show", "bx-hide");
    }
  });

document
  .getElementById("toggleConfirmPassword")
  .addEventListener("click", function () {
    const confirmPasswordField = document.getElementById("confirm-password");
    const icon = this;
    if (confirmPasswordField.type === "password") {
      confirmPasswordField.type = "text";
      icon.classList.replace("bx-hide", "bx-show");
    } else {
      confirmPasswordField.type = "password";
      icon.classList.replace("bx-show", "bx-hide");
    }
  });
