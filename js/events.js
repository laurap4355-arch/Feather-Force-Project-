
/* =============================================
   EVENTS - FILTRERING AV EVENEMANG
============================================= */

// Hämta alla filterknappar och evenemangskort
const filterButtons = document.querySelectorAll(".filter-button");
const eventCards = document.querySelectorAll(".event-card");

// Gå igenom varje filterknapp
filterButtons.forEach(function(button) {

    // När användaren klickar på en knapp
    button.addEventListener("click", function() {

        // Hämta texten från den valda knappen
        const selectedFilter = button.textContent.trim();

        // Ta bort aktiv klass från alla knappar
        filterButtons.forEach(function(btn) {
            btn.classList.remove("is-active");
            btn.setAttribute("aria-pressed", "false");
        });

        // Markera den valda knappen
        button.classList.add("is-active");
        button.setAttribute("aria-pressed", "true");

        // Gå igenom alla evenemangskort
        eventCards.forEach(function(card) {

            // Hämta evenemangets kategori
            const category = card.querySelector(".event-type").textContent.trim();

            // Visa alla kort om All Events är valt
            if (selectedFilter === "All Events") {
                card.style.display = "flex";
            }

            // Visa kort som matchar vald kategori
            else if (
                (selectedFilter === "Social" && category === "SOCIAL EVENT") ||
                (selectedFilter === "Training" && category === "TRAINING") ||
                (selectedFilter === "Tournaments" && category === "TOURNAMENT")
            ) {
                card.style.display = "flex";
            }

            // Dölj övriga kort
            else {
                card.style.display = "none";
            }

        });

    });

});

// Markera All Events som standard
if (filterButtons.length > 0) {
    filterButtons[0].click();
}
