document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    // Get references to all input fields and their error spans
    const firstNameInput = document.querySelector('#name > div > div:nth-child(1) input');
    const firstNameError = document.querySelector('#name > div > div:nth-child(1) .errorText');

    const lastNameInput = document.querySelector('#name > div > div:nth-child(2) input');
    const lastNameError = document.querySelector('#name > div > div:nth-child(2) .errorText');

    const emailInput = document.querySelector('#email input');
    const emailError = document.querySelector('#email .errorText');

    const queryTypeRadios = document.querySelectorAll('input[name="select"]');
    const queryTypeError = document.querySelector('#query .errorText');

    const messageTextarea = document.querySelector('#message textarea');
    const messageError = document.querySelector('#message .errorText');

    const consentCheckbox = document.querySelector('#checkbox input[type="checkbox"]');
    const consentError = document.querySelector('#submit + .Button .errorText'); // This error text is for the overall submission


    // Function to show an error message
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    // Function to hide an error message
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    // Function to validate the first name
    function validateFirstName() {
        if (firstNameInput.value.trim() === '') {
            showError(firstNameError, 'First name is a required field');
            return false;
        } else {
            hideError(firstNameError);
            return true;
        }
    }

    // Function to validate the last name
    function validateLastName() {
        if (lastNameInput.value.trim() === '') {
            showError(lastNameError, 'Last name is a required field');
            return false;
        } else {
            hideError(lastNameError);
            return true;
        }
    }

    // Function to validate the email
    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailError, 'Please enter your Email');
            return false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        } else {
            hideError(emailError);
            return true;
        }
    }

    // Function to validate query type
    function validateQueryType() {
        const isChecked = Array.from(queryTypeRadios).some(radio => radio.checked);
        if (!isChecked) {
            showError(queryTypeError, 'Select enquiry type');
            return false;
        } else {
            hideError(queryTypeError);
            return true;
        }
    }

    // Function to validate the message
    function validateMessage() {
        if (messageTextarea.value.trim() === '') {
            showError(messageError, 'Message cannot be empty');
            return false;
        } else {
            hideError(messageError);
            return true;
        }
    }

    // Function to validate consent checkbox
    function validateConsent() {
        if (!consentCheckbox.checked) {
            showError(consentError, 'You must consent to be contacted');
            return false;
        } else {
            hideError(consentError);
            return true;
        }
    }

    // Add event listeners for real-time validation (optional but good for UX)
    firstNameInput.addEventListener('blur', validateFirstName);
    lastNameInput.addEventListener('blur', validateLastName);
    emailInput.addEventListener('blur', validateEmail);
    messageTextarea.addEventListener('blur', validateMessage);
    queryTypeRadios.forEach(radio => radio.addEventListener('change', validateQueryType));
    consentCheckbox.addEventListener('change', validateConsent);


    // Form submission listener
    form.addEventListener('submit', (event) => {
        // Run all validations
        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isEmailValid = validateEmail();
        const isQueryTypeValid = validateQueryType();
        const isMessageValid = validateMessage();
        const isConsentValid = validateConsent();

        // If any validation fails, prevent form submission
        if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isQueryTypeValid || !isMessageValid || !isConsentValid) {
            event.preventDefault();
            // Show the general submission error if any individual field is invalid
            showError(consentError, 'Please complete the required fields before submitting');
        } else {
            hideError(consentError); // Hide general error if all fields are valid
            alert('Form submitted successfully!'); // Or handle successful submission, e.g., send via AJAX
        }
    });
});