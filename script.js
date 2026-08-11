document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectGrid = document.getElementById('projects-grid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const projectModal = document.getElementById('project-modal');
  const projectModalImage = document.getElementById('project-modal-image');
  const projectModalCategory = document.getElementById('project-modal-category');
  const projectModalTitle = document.getElementById('project-modal-title');
  const projectModalDescription = document.getElementById('project-modal-description');
  const projectModalTech = document.getElementById('project-modal-tech');
  const projectModalLink = document.getElementById('project-modal-link');
  const projectModalCloseButton = document.querySelector('.project-modal__close');
  const projectModalDismiss = document.querySelector('.project-modal__dismiss');
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameMessage = document.getElementById('name-message');
  const emailMessage = document.getElementById('email-message');
  const messageMessage = document.getElementById('message-message');

  const projects = [
    {
      id: 'taskflow-pro',
      title: 'TaskFlow Pro',
      category: 'productivity',
      categoryLabel: 'Productivity',
      year: '2026',
      status: 'Live app',
      summary: 'A focused productivity dashboard for planning projects, tracking deadlines, and keeping weekly goals on schedule.',
      description: 'TaskFlow Pro helps teams centralize priorities, automate recurring tasks, and turn daily work into a clearer weekly plan with progress snapshots and due-date tracking.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
      alt: 'Team members reviewing project tasks and collaboration boards.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Figma'],
      link: '#'
    },
    {
      id: 'marketpulse-dashboard',
      title: 'MarketPulse Dashboard',
      category: 'web',
      categoryLabel: 'Web',
      year: '2025',
      status: 'Analytics',
      summary: 'A business dashboard for tracking KPIs, campaign performance, and customer growth with clear interactive charts.',
      description: 'The MarketPulse Dashboard turns dense reporting into a visual decision-making tool with filters, trend comparisons, and mobile-friendly dashboards for stakeholder updates.',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
      alt: 'Laptop displaying an analytics dashboard with charts and reporting widgets.',
      tech: ['JavaScript', 'Chart.js', 'API Integration', 'Responsive UI'],
      link: '#'
    },
    {
      id: 'northstar-portfolio',
      title: 'Northstar Studio',
      category: 'portfolio',
      categoryLabel: 'Portfolio',
      year: '2024',
      status: 'Brand site',
      summary: 'A polished portfolio experience for a creative studio featuring case studies, services, and a strong visual identity.',
      description: 'Northstar Studio blends storytelling and conversion-focused layout design to spotlight client work, introduce services, and guide visitors toward collaboration.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
      alt: 'Creative portfolio landing page displayed on a desktop monitor.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Accessibility'],
      link: '#'
    }
  ];

  function renderProjects() {
    projectGrid.innerHTML = projects
      .map(
        (project) => `
          <article class="project-card" data-category="${project.category}" data-project-id="${project.id}">
            <img src="${project.image}" alt="${project.alt}" width="400" height="250" loading="lazy" />
            <div class="project-card-content">
              <p class="project-card-category">${project.categoryLabel}</p>
              <h3>${project.title}</h3>
              <p>${project.summary}</p>
              <div class="project-card-meta">
                <span>${project.year}</span>
                <span>${project.status}</span>
              </div>
              <div class="project-card-actions">
                <button type="button" class="project-preview-btn" data-project-id="${project.id}">View details</button>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" view="inline">Live demo</a>
              </div>
            </div>
          </article>
        `
      )
      .join('');
  }

  function openProjectModal(project) {
    if (!projectModal || !projectModalImage || !projectModalCategory || !projectModalTitle || !projectModalDescription || !projectModalTech || !projectModalLink) {
      return;
    }

    projectModalImage.src = project.image;
    projectModalImage.alt = project.alt;
    projectModalCategory.textContent = project.categoryLabel;
    projectModalTitle.textContent = project.title;
    projectModalDescription.textContent = project.description;
    projectModalLink.href = project.link;
    projectModalTech.innerHTML = project.tech.map((item) => `<li>${item}</li>`).join('');
    projectModal.classList.add('is-visible');
    projectModal.setAttribute('aria-hidden', 'false');
  }

  function closeProjectModal() {
    if (!projectModal) {
      return;
    }

    projectModal.classList.remove('is-visible');
    projectModal.setAttribute('aria-hidden', 'true');
  }

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
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
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

  if (projectGrid) {
    renderProjects();

    projectGrid.addEventListener('click', (event) => {
      const previewButton = event.target.closest('.project-preview-btn');
      const projectCard = event.target.closest('.project-card');

      if (previewButton) {
        const project = projects.find((item) => item.id === previewButton.dataset.projectId);
        if (project) {
          openProjectModal(project);
        }
        return;
      }

      if (projectCard) {
        const project = projects.find((item) => item.id === projectCard.dataset.projectId);
        if (project) {
          openProjectModal(project);
        }
      }
    });
  }

  if (projectModalCloseButton) {
    projectModalCloseButton.addEventListener('click', closeProjectModal);
  }

  if (projectModalDismiss) {
    projectModalDismiss.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (event) => {
      if (event.target === projectModal) {
        closeProjectModal();
      }
    });
  }

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
