
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
