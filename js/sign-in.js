<<<<<<< HEAD
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

togglePassword.addEventListener("click", function () {
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);

  this.classList.toggle("bx-show");
  this.classList.toggle("bx-hide");
});

document.getElementById("signIn").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("Email-address").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  let valid = true;

  // Clear previous error messages
  emailError.classList.add("hidden");
  passwordError.classList.add("hidden");

  if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
    emailError.classList.remove("hidden");
    valid = false;
  }

  if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/)) {
    passwordError.classList.remove("hidden");
    valid = false;
  }

  if (valid) {
    const payload = {
      email: email,
      password: password,
    };

    fetch("https://your-backend-endpoint.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/home";
        } else {
          errorMessage.textContent = data.message;
          errorMessage.classList.remove("hidden");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        errorMessage.textContent = "Login failed. Please try again.";
        errorMessage.classList.remove("hidden");
      });
  }
});
=======

  // Toggle password visibility
  const togglePassword = document.getElementById("togglePassword");
  const passwordField = document.getElementById("password");

  togglePassword.addEventListener("click", function () {
    // Toggle the type attribute
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    // Toggle the icon class
    this.classList.toggle("bx-show");
    this.classList.toggle("bx-hide");
  });
>>>>>>> 55de5add9980a1bc463972d2b69380ec239611f5
