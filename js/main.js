/* =========================
   MOBILNAVIGATION
========================= */

// Hämtar menyknappen och navigationen
const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

// Kontrollerar att båda elementen finns
if (menuToggle && navbar) {

    // Öppnar eller stänger menyn vid klick
    menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("is-open");

        // Uppdaterar menyknappens tillgänglighetsstatus
        menuToggle.setAttribute(
            "aria-expanded",
            navbar.classList.contains("is-open")
        );
    });
}