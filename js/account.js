const userCard = document.getElementById("user-card");

fetch("api/auth/profile")
  .then((response) => response.json())
  .then((user) => {
    userCard.innerHTML = `
      <div class='flex justify-between  items-center flex-row gap-3'>
      <div class="w-20 h-20 rounded-full overflow-hidden">
        <img src="${user.image}" alt="${user.name}" class="w-full h-full object-cover">
      </div>
      <div>
        <h4 class="font-bold text-lg text-gray-800">${user.name}</h4>
        <p class="text-gray-600">${user.phone}</p>
      </div>
      </div>
      <i class="bx bx-chevron-right text-3xl text-gray-800"></i>
    `;
  })
  .catch((error) => {
    console.error("Error fetching user data:", error);
    userCard.innerHTML = `<p class="text-red-500">Failed to load user data.</p>`;
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
