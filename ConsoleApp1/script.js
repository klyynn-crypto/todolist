document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameMessage = document.getElementById('name-message');
  const emailMessage = document.getElementById('email-message');
  const messageMessage = document.getElementById('message-message');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');

      if (!targetId || targetId === '#' || !targetId.startsWith('#')) {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (navList && navList.classList.contains('is-open')) {
          navList.classList.remove('is-open');
          if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  function filterProjects(category) {
    projectCards.forEach((card) => {
      const matches = category === 'all' || card.dataset.category === category;
      card.classList.toggle('is-hidden', !matches);
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      filterProjects(button.dataset.category);
    });
  });

  projectCards.forEach((card) => {
    const image = card.querySelector('img');
    if (image && lightbox && lightboxImage) {
      image.addEventListener('click', () => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.classList.add('is-visible');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    }
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('is-visible');
      lightbox.setAttribute('aria-hidden', 'true');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        lightbox.classList.remove('is-visible');
        lightbox.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function validateField(input, messageElement, validator) {
    const value = input.value.trim();
    const isValid = validator(value);

    if (!value) {
      input.classList.remove('valid');
      input.classList.add('invalid');
      messageElement.textContent = 'This field is required.';
      return false;
    }

    if (!isValid) {
      input.classList.remove('valid');
      input.classList.add('invalid');
      messageElement.textContent = input.name === 'email' ? 'Please enter a valid email address.' : 'Please provide a valid value.';
      return false;
    }

    input.classList.remove('invalid');
    input.classList.add('valid');
    messageElement.textContent = 'Looks good!';
    return true;
  }

  function validateForm() {
    const isNameValid = validateField(nameInput, nameMessage, (value) => value.length >= 2);
    const isEmailValid = validateField(emailInput, emailMessage, (value) => /.+@.+\..+/.test(value));
    const isMessageValid = validateField(messageInput, messageMessage, (value) => value.length >= 10);

    return isNameValid && isEmailValid && isMessageValid;
  }

  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener('input', () => {
      validateField(input, document.getElementById(`${input.id}-message`), input.name === 'email' ? (value) => /.+@.+\..+/.test(value) : input.name === 'message' ? (value) => value.length >= 10 : (value) => value.length >= 2);
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const isValid = validateForm();

      if (isValid) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.textContent = 'Message Sent!';
        }
        contactForm.reset();
        [nameInput, emailInput, messageInput].forEach((input) => {
          input.classList.remove('valid', 'invalid');
        });
        [nameMessage, emailMessage, messageMessage].forEach((element) => {
          element.textContent = '';
        });
      }
    });
  }
});
