
/* =============================================
   CONTACT - FORMULÄR OCH VALIDERING
============================================= */


/* =============================================
   CONTACT - HÄMTA HTML-ELEMENT
============================================= */

// Hämta formuläret
const contactForm = document.querySelector(".contact-form");

// Hämta knapparna
const formButtons = document.querySelectorAll(".form-option");

// Hämta formulärens olika delar
const contactFields = document.querySelector(".contact-fields");
const joinFields = document.querySelector(".join-fields");

// Hämta formulärfälten
const nameInput = document.querySelector("#full-name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#contact-message");
const levelInput = document.querySelector("#playing-level");
const consentInput = document.querySelector("#consent");

// Hämta övriga fält
const questionInput = document.querySelector("#question");
const interestInput = document.querySelector("#interest");
const joinMessageInput = document.querySelector("#join-message");

// Hämta knapp och informationstext
const submitButton = document.querySelector(".form-submit button");
const formNote = document.querySelector(".form-note");

// Kontrollera vilket formulär som är aktivt
let isJoinForm = false;


/* =============================================
   CONTACT - FELMEDDELANDEN
============================================= */

// Visa felmeddelande
function showError(input, message) {

    // Lägg till röd kant
    input.classList.add("is-invalid");

    // Hitta fältets container
    const field = input.parentElement;

    // Hitta felmeddelandet
    const error = field.querySelector(".error-message");

    // Visa feltexten
    error.textContent = message;
}

// Ta bort felmeddelande
function clearError(input) {

    // Ta bort röd kant
    input.classList.remove("is-invalid");

    // Hitta fältets container
    const field = input.parentElement;

    // Hitta felmeddelandet
    const error = field.querySelector(".error-message");

    // Ta bort feltexten
    error.textContent = "";
}



/* =============================================
   CONTACT - BYT FORMULÄR
============================================= */

// Gå igenom alla formulärknappar
formButtons.forEach(function(button) {

    // Lyssna efter klick
    button.addEventListener("click", function() {

        // Ta bort aktiv markering från knapparna
        formButtons.forEach(function(otherButton) {
            otherButton.classList.remove("is-active");
            otherButton.setAttribute("aria-pressed", "false");
        });

        // Markera den valda knappen
        button.classList.add("is-active");
        button.setAttribute("aria-pressed", "true");

        // Kontrollera vilken knapp som valdes
        if (button.textContent.trim() === "Join the Club") {

            isJoinForm = true;

            // Dölj kontaktfält och visa medlemsfält
            contactFields.hidden = true;
            joinFields.hidden = false;

            // Ändra obligatoriska fält
            messageInput.required = false;
            levelInput.required = true;
            consentInput.required = true;

            // Ändra knapptexten
            submitButton.textContent = "Prepare Join Request →";
            formNote.textContent = "No membership payment is collected here.";

        } else {

            isJoinForm = false;

            // Visa kontaktfält och dölj medlemsfält
            contactFields.hidden = false;
            joinFields.hidden = true;

            // Ändra obligatoriska fält
            messageInput.required = true;
            levelInput.required = false;
            consentInput.required = false;

            // Ändra knapptexten
            submitButton.textContent = "Prepare Message →";
            formNote.textContent = "* Required fields";
        }

        // Ta bort gamla felmeddelanden
        const errors = document.querySelectorAll(".error-message");

        errors.forEach(function(error) {
            error.textContent = "";
        });

        // Ta bort röda markeringar
        const invalidFields = document.querySelectorAll(".is-invalid");

        invalidFields.forEach(function(field) {
            field.classList.remove("is-invalid");
        });

        // Ta bort tidigare förhandsvisning
        const preview = document.querySelector(".request-preview");

        if (preview) {
            preview.remove();
        }

    });

});



/* =============================================
   CONTACT - FORMULÄRVALIDERING
============================================= */

// Kontrollera formuläret
function validateForm() {

    let isValid = true;

    // Kontrollera namn
    if (nameInput.value.trim() === "") {

        showError(nameInput, "Please enter your full name.");
        isValid = false;

    } else {
        clearError(nameInput);
    }

    // Kontrollera e-postadress
    if (emailInput.value.trim() === "") {

        showError(emailInput, "Please enter your email address.");
        isValid = false;

    } else if (!emailInput.checkValidity()) {

        showError(emailInput, "Please enter a valid email address.");
        isValid = false;

    } else {
        clearError(emailInput);
    }

    // Kontrollera medlemsformuläret
    if (isJoinForm) {

        // Kontrollera spelarens nivå
        if (levelInput.value === "") {

            showError(levelInput, "Please select your playing level.");
            isValid = false;

        } else {
            clearError(levelInput);
        }

        // Kontrollera samtycke
        const consentError = document.querySelector(
            ".consent-group .error-message"
        );

        if (!consentInput.checked) {

            consentInput.classList.add("is-invalid");
            consentError.textContent = "Please agree before continuing.";
            isValid = false;

        } else {

            consentInput.classList.remove("is-invalid");
            consentError.textContent = "";
        }

    } else {

        // Kontrollera kontaktmeddelandet
        if (messageInput.value.trim() === "") {

            showError(messageInput, "Please write your message.");
            isValid = false;

        } else {
            clearError(messageInput);
        }
    }

    return isValid;
}
