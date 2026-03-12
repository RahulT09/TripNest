(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("see-more")) {
    const parent = e.target.closest(".review-comment");
    parent.querySelector(".short-text").classList.add("d-none");
    parent.querySelector(".full-text").classList.remove("d-none");
    e.target.style.display = "none";
  }
});

function togglePassword() {
  const password = document.getElementById("password");

  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

setTimeout(() => {
  document.querySelectorAll(".flash-msg").forEach((el) => {
    el.style.transition = "opacity 0.5s";
    el.style.opacity = "0";

    setTimeout(() => {
      el.remove();
    }, 500);
  });
}, 3000);

// Category active state
// document.querySelectorAll(".category-item").forEach((item) => {
//   item.addEventListener("click", (e) => {
  
//     document
//       .querySelectorAll(".category-item")
//       .forEach((i) => i.classList.remove("active"));
//     item.classList.add("active");
//   });
// });

// Scroll right button
const scroll = document.getElementById("catScroll");
const scrollRightBtn = document.getElementById("scrollRight");

scrollRightBtn.addEventListener("click", () => {
  scroll.scrollBy({ left: 240, behavior: "smooth" });
});

// Show/hide scroll button based on scroll position
scroll.addEventListener("scroll", () => {
  const atEnd =
    scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth - 4;
  scrollRightBtn.style.opacity = atEnd ? "0.3" : "1";
  scrollRightBtn.style.pointerEvents = atEnd ? "none" : "auto";
});

const toggle = document.getElementById("taxToggle");
const gstText = document.querySelectorAll(".gstText");

toggle.addEventListener("change", function () {
  gstText.forEach(function (gst) {
    if (toggle.checked) {
      gst.style.display = "none";
    } else {
      gst.style.display = "inline";
    }
  });
});
