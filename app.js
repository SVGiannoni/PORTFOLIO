// ==========================================================================
// PORTFOLIO APPLICATION LOGIC — HU-01 & HU-02 Implementation
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  renderSkills('all');
  renderProjects();
  initCategoryFilters();
  initActiveNavLinkOnScroll();
  initModalEventListeners();
  initContactFormValidation();
});

/* ==========================================================================
   1. Theme Switcher (Dark / Light Mode)
   ========================================================================== */

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  
  // Check stored preference or default to dark
  const storedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(storedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }
}

/* ==========================================================================
   2. Skills Data & Dynamic Rendering (RF-02)
   ========================================================================== */

const skillsData = [
  // Frontend
  { name: 'React / Next.js', category: 'frontend', icon: '⚛️', level: 95, desc: 'SPAs, SSR, Componentes Reutilizables, Hooks' },
  { name: 'TypeScript / JavaScript', category: 'frontend', icon: '💻', level: 92, desc: 'ES6+, Type Safety, Funcional & OOP' },
  { name: 'HTML5 & CSS3 / Tailwind', category: 'frontend', icon: '🎨', level: 95, desc: 'Semántica, Grid/Flexbox, Animaciones, Theme Tokens' },
  { name: 'State Management (Redux/Zustand)', category: 'frontend', icon: '🔄', level: 88, desc: 'Manejo de estado global asíncrono' },

  // Backend
  { name: 'Node.js & Express', category: 'backend', icon: '🟢', level: 90, desc: 'APIs RESTful, Middleware, Event Loop' },
  { name: 'PostgreSQL & SQL Databases', category: 'backend', icon: '🐘', level: 85, desc: 'Modelado relacional, Consultas optimizadas, ORMs' },
  { name: 'MongoDB / NoSQL', category: 'backend', icon: '🍃', level: 82, desc: 'Document Stores, Agregaciones' },
  { name: 'Autenticación & JWT / OAuth', category: 'backend', icon: '🔒', level: 88, desc: 'Seguridad en APIs, RBAC, Tokens' },

  // Tools & Cloud
  { name: 'Git & GitHub / CI/CD', category: 'tools', icon: '🚀', level: 92, desc: 'Flujo Gitflow, Actions, Pull Requests' },
  { name: 'Docker & Contenedores', category: 'tools', icon: '🐳', level: 80, desc: 'Containerización de aplicaciones y servicios' },
  { name: 'Jest / Testing Library', category: 'tools', icon: '🧪', level: 85, desc: 'Unit Tests, Integration Tests, TDD' },
  { name: 'Performance & SEO', category: 'tools', icon: '⚡', level: 90, desc: 'Lighthouse 100, Accesibilidad Web (a11y)' }
];

function renderSkills(selectedCategory) {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const filteredSkills = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter(s => s.category === selectedCategory);

  container.innerHTML = filteredSkills.map(skill => `
    <div class="skill-card">
      <div class="skill-header">
        <div class="skill-icon" aria-hidden="true">${skill.icon}</div>
        <div>
          <div class="skill-name">${skill.name}</div>
          <div class="skill-category-tag">${getCategoryLabel(skill.category)}</div>
        </div>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${skill.desc}</p>
      <div class="skill-progress-bar" title="${skill.level}% Dominio">
        <div class="skill-progress-fill" style="width: ${skill.level}%;"></div>
      </div>
    </div>
  `).join('');
}

function getCategoryLabel(cat) {
  switch (cat) {
    case 'frontend': return 'Frontend';
    case 'backend': return 'Backend';
    case 'tools': return 'Herramientas & Cloud';
    default: return cat;
  }
}

function initCategoryFilters() {
  const tabs = document.querySelectorAll('.skill-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      e.target.classList.add('active');
      e.target.setAttribute('aria-selected', 'true');
      const cat = e.target.getAttribute('data-category');
      renderSkills(cat);
    });
  });
}

/* ==========================================================================
   3. Projects Data & Case Studies (RF-03 & HU-02)
   ========================================================================== */

const projectsData = [
  {
    id: 'proj-1',
    title: 'Plataforma E-Commerce Next.js',
    badge: 'Destacado',
    description: 'Plataforma de comercio electrónico de alta performance con carrito en tiempo real, integración con Stripe, panel de control administrativo e historial de pedidos.',
    extendedDescription: 'Este proyecto fue diseñado para resolver el desafío de latencia en catálogos extensos mediante Server-Side Rendering (SSR) e Incremental Static Regeneration (ISR). Se estructuró una arquitectura escalable desacoplando el frontend en Next.js del microservicio de pagos y gestión de inventario.',
    image: 'assets/project1.png',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'Stripe'],
    demoUrl: 'https://github.com/SVGiannoni/PORTFOLIO',
    codeUrl: 'https://github.com/SVGiannoni/PORTFOLIO',
    architecture: [
      { title: 'Frontend SSR & ISR', desc: 'Next.js App Router con renderizado optimizado por páginas.' },
      { title: 'Microservicio de Pagos', desc: 'Integración asíncrona con Stripe Webhooks para confirmaciones seguras.' },
      { title: 'Base de Datos Relacional', desc: 'PostgreSQL gestionado con Prisma ORM e índices para búsqueda rápida.' }
    ],
    challenges: [
      'Reducción del tiempo de carga inicial a menos de 0.8s aplicando optimización dinámica de imágenes y fuentes.',
      'Manejo de concurrencia y prevención de sobreventa mediante transacciones atómicas en base de datos.',
      'Cumplimiento de estándares de accesibilidad WCAG 2.1 nivel AA en el checkout.'
    ]
  },
  {
    id: 'proj-2',
    title: 'Real-Time Analytics Dashboard',
    badge: 'SaaS App',
    description: 'Dashboard en tiempo real para analítica de datos de negocio con visualización de métricas interactivas, métricas clave, exportación a reportes y notificaciones.',
    extendedDescription: 'Plataforma analítica SaaS construida para procesar y visualizar eventos en tiempo real recibidos vía WebSockets. Implementa un sistema de caché multi-nivel para soportar más de 10,000 eventos por segundo sin degradación de rendimiento.',
    image: 'assets/project2.png',
    techStack: ['React', 'Chart.js', 'Express', 'PostgreSQL', 'WebSockets'],
    demoUrl: 'https://github.com/SVGiannoni/PORTFOLIO',
    codeUrl: 'https://github.com/SVGiannoni/PORTFOLIO',
    architecture: [
      { title: 'Comunicación Bi-direccional', desc: 'WebSockets (Socket.io) para transmisión de métricas en tiempo real.' },
      { title: 'Capa de Visualización', desc: 'Componentes canvas optimizados con Chart.js y virtualización de listas.' },
      { title: 'Caché en Memoria', desc: 'Redis para agregación temporal de datos de alto tráfico.' }
    ],
    challenges: [
      'Optimización de re-renders en React utilizando memoización estricta y Web Workers para cálculos complejos.',
      'Alertas configurables con rate-limiting para evitar saturación de notificaciones al cliente.',
      'Soporte completo para exportación asíncrona de reportes masivos en formatos PDF y CSV.'
    ]
  },
  {
    id: 'proj-3',
    title: 'AI Code Assistant Workstation',
    badge: 'AI Integration',
    description: 'Entorno web interactivo asistido por Inteligencia Artificial para refactorización de código, detección de errores en tiempo real y generación de documentación técnica.',
    extendedDescription: 'Aplicación web que integra modelos de lenguaje avanzado (LLMs) para asistir a desarrolladores en tareas de refactorización, generación de unit tests y análisis estático de vulnerabilidades directamente desde el navegador.',
    image: 'assets/project3.png',
    techStack: ['React', 'TypeScript', 'OpenAI API', 'Monaco Editor', 'Node.js'],
    demoUrl: 'https://github.com/SVGiannoni/PORTFOLIO',
    codeUrl: 'https://github.com/SVGiannoni/PORTFOLIO',
    architecture: [
      { title: 'Editor de Código Embebido', desc: 'Monaco Editor con soporte para resaltado de sintaxis e Intellisense.' },
      { title: 'Streaming de Respuestas', desc: 'Server-Sent Events (SSE) para entrega de código generado palabra por palabra.' },
      { title: 'Sandbox de Ejecución', desc: 'Entorno aislado mediante Web Workers para formateo y validación de AST.' }
    ],
    challenges: [
      'Reducción de latencia en la transmisión de sugerencias mediante streaming continuo de tokens.',
      'Diseño de interfaz con panel divisorio arrastrable y preservación de estado del editor.',
      'Sistema de prompts estructurados para garantizar respuestas formateadas en JSON estricto.'
    ]
  }
];

function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = projectsData.map(proj => `
    <article class="project-card">
      <div class="project-image-container" onclick="openProjectModal('${proj.id}')" style="cursor: pointer;" title="Hacé clic para ver el Caso de Estudio">
        <img src="${proj.image}" alt="Captura de pantalla de ${proj.title}" class="project-image" loading="lazy" />
        <span class="project-badge">${proj.badge}</span>
      </div>
      <div class="project-content">
        <h3 class="project-title" onclick="openProjectModal('${proj.id}')" style="cursor: pointer;">${proj.title}</h3>
        <p class="project-description">${proj.description}</p>
        
        <div class="project-tech-stack">
          ${proj.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        
        <div class="project-actions">
          <button onclick="openProjectModal('${proj.id}')" class="project-btn project-btn-primary" aria-label="Ver Caso de Estudio de ${proj.title}">
            <span>Caso de Estudio</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <a href="${proj.codeUrl}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-outline" aria-label="Ver código fuente de ${proj.title}">
            <span>Código</span>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

/* ==========================================================================
   4. Case Study Modal Logic (HU-02 Implementation)
   ========================================================================== */

function openProjectModal(projectId) {
  const proj = projectsData.find(p => p.id === projectId);
  if (!proj) return;

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <img src="${proj.image}" alt="Detalle de ${proj.title}" class="modal-header-image" />
    
    <div class="modal-title-row">
      <div>
        <span class="project-badge" style="position: static; margin-bottom: 0.5rem; display: inline-block;">${proj.badge}</span>
        <h2 class="modal-project-title">${proj.title}</h2>
      </div>
      <div style="display: flex; gap: 0.75rem;">
        <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 0.6rem 1.2rem; font-size: 0.9rem;">
          <span>Live Demo</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <a href="${proj.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding: 0.6rem 1.2rem; font-size: 0.9rem;">
          <span>Repositorio GitHub</span>
        </a>
      </div>
    </div>

    <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
      ${proj.extendedDescription}
    </p>

    <div class="project-tech-stack" style="margin-bottom: 2rem;">
      ${proj.techStack.map(t => `<span class="tech-tag" style="padding: 0.35rem 0.85rem; font-size: 0.85rem;">${t}</span>`).join('')}
    </div>

    <h3 class="modal-section-heading">
      <span>📐</span> Arquitectura del Sistema
    </h3>
    <div class="modal-arch-grid">
      ${proj.architecture.map(a => `
        <div class="arch-card">
          <div class="arch-card-title">${a.title}</div>
          <div class="arch-card-desc">${a.desc}</div>
        </div>
      `).join('')}
    </div>

    <h3 class="modal-section-heading">
      <span>🎯</span> Desafíos Técnicos & Soluciones
    </h3>
    <ul class="challenges-list">
      ${proj.challenges.map(c => `
        <li class="challenge-item">
          <span class="challenge-icon">✓</span>
          <span>${c}</span>
        </li>
      `).join('')}
    </ul>
  `;

  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
}

function initModalEventListeners() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });
}

/* ==========================================================================
   5. Scroll Navigation Active Link State
   ========================================================================== */

function initActiveNavLinkOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   6. Contact Form Validation & Anti-Spam (HU-03 & RF-01)
   ========================================================================== */

function initContactFormValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const pageLoadTime = Date.now();
  const RATE_LIMIT_MS = 30000; // 30 seconds between submissions

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');
  const alertContainer = document.getElementById('form-alert');

  // Input validation rules
  const fields = [
    {
      input: nameInput,
      errorEl: document.getElementById('name-error'),
      validate: (val) => {
        if (!val.trim()) return 'El nombre es obligatorio.';
        if (val.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.';
        return '';
      }
    },
    {
      input: emailInput,
      errorEl: document.getElementById('email-error'),
      validate: (val) => {
        if (!val.trim()) return 'El correo electrónico es obligatorio.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) return 'Ingresá un correo electrónico válido (ejemplo@correo.com).';
        return '';
      }
    },
    {
      input: subjectInput,
      errorEl: document.getElementById('subject-error'),
      validate: (val) => {
        if (!val.trim()) return 'El asunto es obligatorio.';
        if (val.trim().length < 3) return 'El asunto debe tener al menos 3 caracteres.';
        return '';
      }
    },
    {
      input: messageInput,
      errorEl: document.getElementById('message-error'),
      validate: (val) => {
        if (!val.trim()) return 'El mensaje es obligatorio.';
        if (val.trim().length < 10) return 'El mensaje debe ser más descriptivo (mínimo 10 caracteres).';
        return '';
      }
    }
  ];

  // Attach real-time input and blur event listeners
  fields.forEach(({ input, errorEl, validate }) => {
    if (!input) return;

    const handleValidation = () => {
      const error = validate(input.value);
      const wrapper = input.closest('.input-wrapper');
      const statusIcon = wrapper ? wrapper.querySelector('.status-icon') : null;

      if (error) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        if (errorEl) errorEl.textContent = error;
        if (statusIcon) {
          statusIcon.innerHTML = '❌';
          statusIcon.title = error;
        }
        return false;
      } else {
        input.classList.remove('invalid');
        input.classList.add('valid');
        if (errorEl) errorEl.textContent = '';
        if (statusIcon) {
          statusIcon.innerHTML = '✓';
          statusIcon.title = 'Campo válido';
        }
        return true;
      }
    };

    input.addEventListener('input', handleValidation);
    input.addEventListener('blur', handleValidation);
  });

  // Form Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideFormAlert();

    // 1. Honeypot check (anti-bot)
    const hpWebsite = document.getElementById('hp-website');
    if (hpWebsite && hpWebsite.value) {
      console.warn('Bot detectado vía honeypot antispam.');
      showFormAlert('error', 'Error al enviar el mensaje. Intente nuevamente.');
      return;
    }

    // 2. Minimum interaction time check (bot prevention)
    if (Date.now() - pageLoadTime < 1500) {
      console.warn('Formulario enviado demasiado rápido (posible bot).');
      showFormAlert('error', 'Por favor tómate un momento para revisar el mensaje antes de enviar.');
      return;
    }

    // 3. Rate limiting check
    const lastSubmit = localStorage.getItem('portfolio_last_submit_ts');
    if (lastSubmit && (Date.now() - parseInt(lastSubmit, 10) < RATE_LIMIT_MS)) {
      const secondsLeft = Math.ceil((RATE_LIMIT_MS - (Date.now() - parseInt(lastSubmit, 10))) / 1000);
      showFormAlert('warning', `⚠️ Aguardá ${secondsLeft} segundos antes de enviar otro mensaje para evitar saturación de correo.`);
      return;
    }

    // 4. Validate all fields
    let isAllValid = true;
    fields.forEach(({ input, validate }) => {
      if (!input) return;
      const isValid = input.dispatchEvent(new Event('blur'));
      if (validate(input.value) !== '') {
        isAllValid = false;
      }
    });

    if (!isAllValid) {
      showFormAlert('error', 'Por favor corregí los campos marcados antes de enviar.');
      const firstInvalid = form.querySelector('.form-input.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // 5. Asynchronous Submission Simulation
    setSubmittingState(true);

    setTimeout(() => {
      setSubmittingState(false);

      // Save rate limit timestamp
      localStorage.setItem('portfolio_last_submit_ts', Date.now().toString());

      const userName = nameInput.value.trim();
      showFormAlert('success', `¡Muchas gracias ${userName}! Tu mensaje ha sido enviado exitosamente. Santiago se pondrá en contacto con vos a la brevedad.`);

      // Reset form and clear validation styles
      form.reset();
      fields.forEach(({ input, errorEl }) => {
        if (!input) return;
        input.classList.remove('valid', 'invalid');
        if (errorEl) errorEl.textContent = '';
        const wrapper = input.closest('.input-wrapper');
        const statusIcon = wrapper ? wrapper.querySelector('.status-icon') : null;
        if (statusIcon) statusIcon.innerHTML = '';
      });
    }, 1200);
  });

  function setSubmittingState(isSubmitting) {
    if (!submitBtn) return;
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');

    if (isSubmitting) {
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Enviando...';
      if (btnSpinner) btnSpinner.style.display = 'inline-block';
    } else {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Enviar Mensaje';
      if (btnSpinner) btnSpinner.style.display = 'none';
    }
  }

  function showFormAlert(type, message) {
    if (!alertContainer) return;
    alertContainer.className = `form-alert alert-${type}`;
    alertContainer.innerHTML = `
      <div class="alert-content">
        <span>${message}</span>
        <button type="button" class="alert-dismiss-btn" onclick="document.getElementById('form-alert').style.display='none'">&times;</button>
      </div>
    `;
    alertContainer.style.display = 'block';
    alertContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideFormAlert() {
    if (alertContainer) {
      alertContainer.style.display = 'none';
      alertContainer.innerHTML = '';
    }
  }
}

