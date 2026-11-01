
/* =============================================
   1. CONTACT - FORMULÄRALTERNATIV
============================================= */

// Hämta formulärknapparna
const formButtons = document.querySelectorAll(".form-option");

// Hämta formulärets olika delar
const contactFields = document.querySelector(".contact-fields");
const joinFields = document.querySelector(".join-fields");
const submitButton = document.querySelector(".form-submit button");
const formNote = document.querySelector(".form-note");

// Hämta obligatoriska formulärfält
const contactMessage = document.querySelector("#contact-message");
const playingLevel = document.querySelector("#playing-level");
const consent = document.querySelector("#consent");

// Gå igenom formulärknapparna
formButtons.forEach(function(button) {

    // När användaren klickar på en knapp
    button.addEventListener("click", function() {

        // Ta bort aktivt tillstånd från båda knapparna
        formButtons.forEach(function(btn) {
            btn.classList.remove("is-active");
            btn.setAttribute("aria-pressed", "false");
        });

        // Markera den valda knappen
        button.classList.add("is-active");
        button.setAttribute("aria-pressed", "true");

        // Visa rätt formulär
        if (button.textContent.trim() === "Join the Club") {

            // Visa medlemsformuläret
            contactFields.hidden = true;
            joinFields.hidden = false;

            // Anpassa obligatoriska fält
            contactMessage.required = false;
            playingLevel.required = true;
            consent.required = true;

            // Ändra knapptext och information
            submitButton.textContent = "Prepare Join Request →";
            formNote.textContent = "No membership payment is collected here.";

        } else {

            // Visa kontaktformuläret
            contactFields.hidden = false;
            joinFields.hidden = true;

            // Anpassa obligatoriska fält
            contactMessage.required = true;
            playingLevel.required = false;
            consent.required = false;

            // Ändra knapptext och information
            submitButton.textContent = "Prepare Message →";
            formNote.textContent = "* Required fields";
        }

        // Dölj tidigare meddelande
        const preview = document.querySelector(".request-preview");

        if (preview) {
            preview.hidden = true;
        }
    });
});


/* =============================================
   2. CONTACT - FÖRBERED MEDDELANDE
============================================= */

// Hämta kontaktformuläret
const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    // När användaren skickar formuläret
    contactForm.addEventListener("submit", function(event) {

        // Förhindra att sidan laddas om
        event.preventDefault();

        // Kontrollera obligatoriska fält
        if (!contactForm.reportValidity()) {
            return;
        }

        // Hämta användarens namn och e-post
        const name = document.querySelector("#full-name").value;
        const email = document.querySelector("#email").value;

        // Kontrollera valt formulär
        const activeButton = document.querySelector(".form-option.is-active");

        let message = "";

        if (activeButton.textContent.trim() === "Join the Club") {

            // Hämta uppgifter för medlemsförfrågan
            const level = playingLevel.value;
            const interest = document.querySelector("#interest").value;
            const extra = document.querySelector("#join-message").value;

            // Skapa medlemsförfrågan
            message =
                "Membership Enquiry\n" +
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Playing Level: " + level + "\n" +
                "Interest: " + interest + "\n" +
                "Message: " + extra;

        } else {

            // Hämta uppgifter för kontaktförfrågan
            const question = document.querySelector("#question").value;
            const text = contactMessage.value;

            // Skapa kontaktförfrågan
            message =
                "Contact Enquiry\n" +
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Question: " + question + "\n" +
                "Message: " + text;
        }

        // Hämta befintlig förhandsvisning
        let preview = document.querySelector(".request-preview");

        // Skapa en förhandsvisning om den saknas
        if (!preview) {
            preview = document.createElement("textarea");
            preview.className = "request-preview";
            preview.readOnly = true;
            preview.rows = 10;
            preview.setAttribute("aria-label", "Prepared enquiry");

            contactForm.after(preview);
        }

        // Visa det förberedda meddelandet
        preview.value = message;
        preview.hidden = false;
    });
}

// Välj Contact Us som standard
if (formButtons.length > 0) {
    formButtons[0].click();
}


/* =============================================
   3. CONTACT - FAQ
============================================= */

// Hämta alla FAQ-frågor
const faqQuestions = document.querySelectorAll(".faq-question");

// Gå igenom varje fråga
faqQuestions.forEach(function(question) {

    // När användaren klickar på frågan
    question.addEventListener("click", function() {

        // Hämta tillhörande svar
        const answerId = question.getAttribute("aria-controls");
        const answer = document.getElementById(answerId);

        if (answer) {

            // Kontrollera om svaret är öppet
            const isOpen = question.getAttribute("aria-expanded") === "true";

            if (isOpen) {

                // Stäng svaret
                question.setAttribute("aria-expanded", "false");
                answer.hidden = true;

            } else {

                // Öppna svaret
                question.setAttribute("aria-expanded", "true");
                answer.hidden = false;
            }
        }
    });
});
