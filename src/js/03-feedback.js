import throttle from 'lodash/throttle';
import { isEmpty } from 'lodash';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

function saveFormState() {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function populateFormFromStorage() {
  const storedData = localStorage.getItem('feedback-form-state');
  if (storedData) {
    const formData = JSON.parse(storedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
}

function clearFormState() {
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageTextarea.value = '';
}

const throttledSaveFormState = throttle(saveFormState, 500);

function validateForm() {
  if (isEmpty(emailInput.value) || isEmpty(messageTextarea.value)) {
    alert("Please fill in all the fields before submitting.");
    return false;
  }
  return true;
}

form.addEventListener('input', () => {
  throttledSaveFormState();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (validateForm()) {
    const formData = {
      email: emailInput.value,
      message: messageTextarea.value,
    };
    console.log('Form data:', formData);
    clearFormState();
  }
});

window.addEventListener('load', () => {
  populateFormFromStorage();
});
