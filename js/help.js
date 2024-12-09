document.getElementById("backArrow").addEventListener("click", function () {
  window.location.href = "/page/account.html";
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
document.getElementById("faq").classList.add("active");
document.getElementById("faq").style.display = "block";
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
