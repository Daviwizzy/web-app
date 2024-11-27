// Example function to mask email
function maskEmail(email) {
  const [username, domain] = email.split("@");
  const maskedUsername = username.slice(0, 2) + "●●●●";
  return maskedUsername + "@" + domain;
}

// Retrieve email from backend
async function getEmailFromBackend() {
  try {
    const response = await fetch("YOUR_BACKEND_GET_EMAIL_ENDPOINT");
    if (response.ok) {
      const data = await response.json();
      return data.email;
    } else {
      throw new Error("Failed to fetch email");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Initialize page
async function initializePage() {
  const email = await getEmailFromBackend();
  if (email) {
    document.getElementById("otpMessage").textContent =
      `We have sent an OTP code to ${maskEmail(email)}. Enter the OTP code below to continue.`;
    window.userEmail = email;
  } else {
    document.getElementById("otpMessage").textContent =
      "Failed to retrieve email. Please try again later.";
  }
}

// Verify OTP
async function verifyOtp(otpCode) {
  const messageDiv = document.getElementById("message");
  try {
    const response = await fetch("YOUR_BACKEND_OTP_VERIFICATION_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: otpCode, email: window.userEmail }),
    });

    if (response.ok) {
      messageDiv.textContent = "Email confirmed successfully!";
      messageDiv.className =
        "text-center text-green-500 bg-green-100 p-2 rounded-md";
      // Redirect to the loading page
      window.location.href = "page/signup-suc.html";
    } else {
      messageDiv.textContent = "Failed to verify OTP. Please try again.";
      messageDiv.className =
        "text-center text-red-500 bg-red-100 p-2 rounded-md";
    }
  } catch (error) {
    console.error("Error:", error);
    messageDiv.textContent = "An error occurred. Please try again.";
    messageDiv.className = "text-center text-red-500 bg-red-100 p-2 rounded-md";
  }
}

// Initialize the page on load
initializePage();

document
  .querySelectorAll("#otpInputs input")
  .forEach((input, index, inputs) => {
    input.addEventListener("input", async function () {
      if (this.value.length === 1) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else {
          // All inputs are filled, verify OTP
          const otpCode = Array.from(inputs)
            .map((input) => input.value)
            .join("");
          if (otpCode.length === 4) {
            await verifyOtp(otpCode);
          }
        }
      } else if (!this.validity.valid) {
        this.value = ""; // Clear invalid input
      }
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Backspace" && this.value.length === 0 && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });

document
  .getElementById("resendOtp")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    const messageDiv = document.getElementById("message");
    try {
      const response = await fetch("YOUR_BACKEND_RESEND_OTP_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          email: window.userEmail,
        },
      });

      if (response.ok) {
        messageDiv.textContent = "OTP has been resent to your email.";
        messageDiv.className =
          "text-center text-green-500 bg-green-100 p-2 rounded-md";
      } else {
        messageDiv.textContent = "Failed to resend OTP. Please try again.";
        messageDiv.className =
          "text-center text-red-500 bg-red-100 p-2 rounded-md";
      }
    } catch (error) {
      console.error("Error:", error);
      messageDiv.textContent = "An error occurred. Please try again.";
      messageDiv.className =
        "text-center text-red-500 bg-red-100 p-2 rounded-md";
    }
  });

document.getElementById("backArrow").addEventListener("click", function () {
  window.location.href = "/page/register.html";
});
