document
  .getElementById("continueWithGoogle")
  .addEventListener("click", function () {
    console.log("Continue with Google clicked");
    window.location.href = "YOUR_GOOGLE_OAUTH_ENDPOINT";
  });

document
  .getElementById("signInWithEmail")
  .addEventListener("click", function () {
    console.log("Sign in with Email Address clicked");
    window.location.href = "/page/login.html";
  });

document.getElementById("signUp").addEventListener("click", function () {
  console.log("Sign up clicked");
  window.location.href = "/page/register.html";
});



