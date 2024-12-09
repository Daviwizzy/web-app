const paymentsCard = document.getElementById("payments-card");

fetch("api/payments/user/:userId")
  .then((response) => response.json())
  .then((payment) => {
    paymentsCard.innerHTML = `
      <div
          class="w-full h-[80px] flex justify-between bg-[#FAFAFA] py-3 px-4 border border-solid border-gray-200 rounded-[14px]"
        >
          <div class="flex flex-col gap-2">
            <h4 class="text-[18px] font-[600]">${payment.name}</h4>
            <p class="text-[12px] font-[500] gap-[6px] text-[#616161]">
              <span>${payment.date}</span>.<span>${payment.time}</span>
            </p>
          </div>

          <div class="flex justify-between items-center">
            <h4 class="text-[18px] font-[600] text-[#01B763]">${payment.amount}</h4>
            <i class="bx bx-chevron-right text-3xl"></i>
          </div>
        </div>
    `;
  })
  .catch((error) => {
    console.error("Error fetching user data:", error);
    paymentsCard.innerHTML = `<p class="text-red-500">Failed to load payment data.</p>`;
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
