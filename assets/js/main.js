/* ═══════════════════════════════════════════════════════
   GetFitByTania — Main JavaScript
   i18n · Theme · Navigation · Scroll Animations
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── TRANSLATIONS ── */
  const translations = {
    es: {
      // Meta
      skipLink: 'Saltar al contenido principal',
      navToggleLabel: 'Abrir menú de navegación',
      navToggleCloseLabel: 'Cerrar menú de navegación',
      langSwitcherLabel: 'Seleccionar idioma',
      themeToggleLabel: 'Cambiar a modo oscuro',
      themeToggleLabelDark: 'Cambiar a modo claro',
      settingsToggleLabel: 'Abrir ajustes',
      settingsToggleCloseLabel: 'Cerrar ajustes',
      fontSizeLabel: 'Aumentar tamaño de fuente',
      brandLabel: 'GetFitByTania \u2014 Inicio',
      langChanged: 'Idioma cambiado a español',
      newWindow: '(abre en ventana nueva)',
      instagramLabel: 'Instagram (abre en ventana nueva)',
      facebookLabel: 'Facebook (abre en ventana nueva)',
      whatsappLabel: 'WhatsApp (abre en ventana nueva)',

      // Nav
      navHome: 'Inicio',
      navAbout: 'Sobre mí',
      navDisciplines: 'Disciplinas',
      navGallery: 'Galería',
      navExperience: 'Experiencia',
      navContact: 'Contacto',

      // Hero
      heroEyebrow: 'Tania Angulo · Alicante',
      heroTitle: 'Tu transformación empieza aquí',
      heroSubtitle: 'Entrenadora Personal · Monitora de Clases Dirigidas · Especialista Postparto',
      heroCta: 'Empieza tu cambio',
      heroCtaSecondary: 'Ver disciplinas',

      // About
      aboutHeading: 'Sobre mí',
      statYears: 'Años de experiencia',
      statDisciplines: 'Disciplinas',
      statLanguages: 'Idiomas',
      statPersonalized: 'Personalizado',
      aboutP1: 'Soy entrenadora personal y monitora de clases dirigidas. Mi experiencia como mamá me llevó a prepararme en Gimnasia Hipopresiva y técnicas de entrenamiento postparto. Ahora ayudo a otras madres a recuperar su figura y sentirse mejor.',
      aboutP2: 'Con una energía arrolladora, mi metodología es muy personalizada. Trabajo tanto con jóvenes que quieran mejorar su físico y estado de salud, como con personas de mayor edad que necesiten ganar en calidad de vida y mantenerse activos y sanos.',
      aboutP3: 'Di un giro profesional desde el servicio al cliente en Barcelona hacia el mundo del fitness. Me he formado en varias disciplinas deportivas y sigo reciclándome y preparándome para rendir al máximo cada día.',

      // Disciplines
      disciplinesHeading: 'Disciplinas',
      disciplinesSubtitle: 'Formada en múltiples disciplinas para ofrecerte el entrenamiento que necesitas',
      discPilates: 'Fortalece tu core, mejora tu postura y flexibilidad',
      discBodyMindTitle: 'Cuerpo & Mente',
      discBodyMind: 'Conecta cuerpo y mente para un bienestar integral',
      discHypopressiveTitle: 'Gimnasia Hipopresiva',
      discHypopressive: 'Recuperación postparto y fortalecimiento del suelo pélvico',
      discCross: 'Entrenamiento de alta intensidad para superar tus límites',
      discFunctionalTitle: 'Entrenamiento Funcional',
      discFunctional: 'Movimientos reales para la vida real',
      discCyclingTitle: 'Ciclo Indoor',
      discCycling: 'Cardio intenso con energía grupal',
      discStrengthTitle: 'Musculación',
      discStrength: 'Construye fuerza, gana confianza',
      discAqua: 'Diversión acuática con resultados reales',

      // Gallery
      galleryHeading: 'Galería',
      gallerySubtitle: 'Momentos de entrenamiento, clases y estilo de vida saludable',

      // Image alts
      heroImgAlt: 'Tania Angulo, entrenadora personal en Alicante',
      aboutImgAlt: 'Tania entrenando en el gimnasio',
      galHipo: 'Tania enseñando hipopresivos en Alicante',
      galTraining1: 'Sesión de entrenamiento personal',
      galClass1: 'Clase dirigida en el gimnasio',
      galFunctional: 'Entrenamiento funcional en grupo',
      galCross: 'Tania durante sesión de cross training',
      galRoutine: 'Preparación de rutina de ejercicios',
      galLifestyle: 'Estilo de vida saludable y fitness',
      galPilates: 'Sesión de pilates',
      galPortrait: 'Tania Angulo, entrenadora personal',
      galNutrition: 'Nutrición y alimentación saludable',
      galOutdoor: 'Ejercicio al aire libre',
      galCycling: 'Clase de ciclo indoor',

      // Experience
      experienceHeading: 'Experiencia',
      experienceSubtitle: 'Mi trayectoria profesional en el mundo del fitness',
      present: 'Actualmente',
      expNh: 'Preparadora física para deportistas. Clases de Pilates y Funcionales.',
      expTotalBody: 'Clases de Pilates, Funcionales y Bungee.',
      expAltafit: 'Clases dirigidas con música, Ciclo Indoor, Cross Training, Pilates. Acompañamiento en sala fitness.',
      expGym24hTitle: 'Gimnasio 24H',
      expGym24h: 'Planes de entrenamiento personalizados, asesoramiento nutricional. Clases de Pilates, TRX, GAP y Cuerpo & Mente.',

      // Formation
      formationHeading: 'Formación',
      formAcredita: 'Certificación Profesional Nivel III — Área Deporte',
      formHypopressive: 'Gimnasia Hipopresiva y Acondicionamiento Físico Postparto',
      formFeda: 'Entrenamiento Personal · Nutrición Deportiva · Coaching',
      formApta: 'Monitora de Actividades Dirigidas con Soporte Musical',

      // Contact
      contactHeading: '¿Empezamos?',
      contactIntro: 'Cuéntame tu objetivo y diseñamos juntos el entrenamiento perfecto para ti.',
      formLabelName: 'Nombre',
      formPlaceholderName: 'Tu nombre',
      formLabelEmail: 'Email',
      formPlaceholderEmail: 'tu@email.com',
      formLabelMessage: 'Mensaje',
      formPlaceholderMessage: 'Cuéntame tu objetivo…',
      formSubmit: 'Enviar mensaje',

      // Footer
      footerRights: 'Todos los derechos reservados.',
    },

    en: {
      skipLink: 'Skip to main content',
      navToggleLabel: 'Open navigation menu',
      navToggleCloseLabel: 'Close navigation menu',
      langSwitcherLabel: 'Select language',
      themeToggleLabel: 'Switch to dark mode',
      themeToggleLabelDark: 'Switch to light mode',
      settingsToggleLabel: 'Open settings',
      settingsToggleCloseLabel: 'Close settings',
      fontSizeLabel: 'Increase font size',
      brandLabel: 'GetFitByTania \u2014 Home',
      langChanged: 'Language changed to English',
      newWindow: '(opens in new window)',
      instagramLabel: 'Instagram (opens in new window)',
      facebookLabel: 'Facebook (opens in new window)',
      whatsappLabel: 'WhatsApp (opens in new window)',

      navHome: 'Home',
      navAbout: 'About me',
      navDisciplines: 'Disciplines',
      navGallery: 'Gallery',
      navExperience: 'Experience',
      navContact: 'Contact',

      heroEyebrow: 'Tania Angulo · Alicante, Spain',
      heroTitle: 'Your transformation starts here',
      heroSubtitle: 'Personal Trainer · Group Fitness Instructor · Postpartum Specialist',
      heroCta: 'Start your change',
      heroCtaSecondary: 'See disciplines',

      aboutHeading: 'About me',
      statYears: 'Years of experience',
      statDisciplines: 'Disciplines',
      statLanguages: 'Languages',
      statPersonalized: 'Personalized',
      aboutP1: 'I\'m a personal trainer and group fitness instructor. My experience as a mother led me to specialize in Hypopressive Gymnastics and postpartum training techniques. Now I help other mothers recover their figure and feel their best.',
      aboutP2: 'With unstoppable energy, my methodology is highly personalized. I work with young people looking to improve their physique and health, as well as older adults who want to gain quality of life and stay active and healthy.',
      aboutP3: 'I made a bold career change from customer service in Barcelona to the fitness world. I\'ve trained across multiple sports disciplines and continue to learn and grow to perform at my best every day.',

      disciplinesHeading: 'Disciplines',
      disciplinesSubtitle: 'Trained in multiple disciplines to offer you the workout you need',
      discPilates: 'Strengthen your core, improve posture and flexibility',
      discBodyMindTitle: 'Body & Mind',
      discBodyMind: 'Connect body and mind for holistic wellness',
      discHypopressiveTitle: 'Hypopressive Gymnastics',
      discHypopressive: 'Postpartum recovery and pelvic floor strengthening',
      discCross: 'High-intensity training to push your limits',
      discFunctionalTitle: 'Functional Training',
      discFunctional: 'Real movements for real life',
      discCyclingTitle: 'Indoor Cycling',
      discCycling: 'Intense cardio with group energy',
      discStrengthTitle: 'Strength Training',
      discStrength: 'Build strength, gain confidence',
      discAqua: 'Aquatic fun with real results',

      // Gallery
      galleryHeading: 'Gallery',
      gallerySubtitle: 'Training moments, classes and healthy lifestyle',

      // Image alts
      heroImgAlt: 'Tania Angulo, personal trainer in Alicante',
      aboutImgAlt: 'Tania working out at the gym',
      galHipo: 'Tania teaching hypopressive exercises in Alicante',
      galTraining1: 'Personal training session',
      galClass1: 'Group fitness class at the gym',
      galFunctional: 'Group functional training',
      galCross: 'Tania during a cross training session',
      galRoutine: 'Setting up an exercise routine',
      galLifestyle: 'Healthy lifestyle and fitness',
      galPilates: 'Pilates session',
      galPortrait: 'Tania Angulo, personal trainer',
      galNutrition: 'Nutrition and healthy eating',
      galOutdoor: 'Outdoor exercise',
      galCycling: 'Indoor cycling class',

      experienceHeading: 'Experience',
      experienceSubtitle: 'My professional journey in the fitness world',
      present: 'Present',
      expNh: 'Fitness coach for athletes. Pilates and Functional classes.',
      expTotalBody: 'Pilates, Functional, and Bungee classes.',
      expAltafit: 'Group fitness classes with music, Indoor Cycling, Cross Training, Pilates. Gym floor support.',
      expGym24hTitle: 'Gym 24H',
      expGym24h: 'Personalized training plans, nutritional advice. Pilates, TRX, GAP, and Body & Mind classes.',

      formationHeading: 'Education',
      formAcredita: 'Professional Certification Level III — Sports Area',
      formHypopressive: 'Hypopressive Gymnastics and Postpartum Physical Conditioning',
      formFeda: 'Personal Training · Sports Nutrition · Coaching',
      formApta: 'Group Fitness Instructor with Musical Support',

      contactHeading: 'Ready to start?',
      contactIntro: 'Tell me your goal and we\'ll design the perfect training plan for you.',
      formLabelName: 'Name',
      formPlaceholderName: 'Your name',
      formLabelEmail: 'Email',
      formPlaceholderEmail: 'you@email.com',
      formLabelMessage: 'Message',
      formPlaceholderMessage: 'Tell me your goal…',
      formSubmit: 'Send message',

      footerRights: 'All rights reserved.',
    },

    pt: {
      skipLink: 'Pular para o conteúdo principal',
      navToggleLabel: 'Abrir menu de navegação',
      navToggleCloseLabel: 'Fechar menu de navegação',
      langSwitcherLabel: 'Selecionar idioma',
      themeToggleLabel: 'Mudar para modo escuro',
      themeToggleLabelDark: 'Mudar para modo claro',
      settingsToggleLabel: 'Abrir configurações',
      settingsToggleCloseLabel: 'Fechar configurações',      fontSizeLabel: 'Aumentar tamanho da fonte',      brandLabel: 'GetFitByTania \u2014 In\u00edcio',
      langChanged: 'Idioma alterado para portugu\u00eas',
      newWindow: '(abre em nova janela)',
      instagramLabel: 'Instagram (abre em nova janela)',
      facebookLabel: 'Facebook (abre em nova janela)',
      whatsappLabel: 'WhatsApp (abre em nova janela)',

      navHome: 'Início',
      navAbout: 'Sobre mim',
      navDisciplines: 'Disciplinas',
      navGallery: 'Galeria',
      navExperience: 'Experiência',
      navContact: 'Contato',

      heroEyebrow: 'Tania Angulo · Alicante, Espanha',
      heroTitle: 'A sua transformação começa aqui',
      heroSubtitle: 'Personal Trainer · Instrutora de Aulas Coletivas · Especialista Pós-parto',
      heroCta: 'Comece sua mudança',
      heroCtaSecondary: 'Ver disciplinas',

      aboutHeading: 'Sobre mim',
      statYears: 'Anos de experiência',
      statDisciplines: 'Disciplinas',
      statLanguages: 'Idiomas',
      statPersonalized: 'Personalizado',
      aboutP1: 'Sou personal trainer e instrutora de aulas coletivas. Minha experiência como mãe me levou a me especializar em Ginástica Hipopressiva e técnicas de treinamento pós-parto. Agora ajudo outras mães a recuperar a forma e se sentir melhor.',
      aboutP2: 'Com uma energia contagiante, minha metodologia é altamente personalizada. Trabalho tanto com jovens que querem melhorar seu físico e saúde, quanto com pessoas mais velhas que precisam ganhar qualidade de vida e se manter ativas e saudáveis.',
      aboutP3: 'Fiz uma mudança de carreira ousada, saindo do atendimento ao cliente em Barcelona para o mundo do fitness. Me formei em várias disciplinas esportivas e continuo me atualizando e treinando para dar o meu melhor a cada dia.',

      disciplinesHeading: 'Disciplinas',
      disciplinesSubtitle: 'Formada em múltiplas disciplinas para oferecer o treino que você precisa',
      discPilates: 'Fortaleça seu core, melhore postura e flexibilidade',
      discBodyMindTitle: 'Corpo & Mente',
      discBodyMind: 'Conecte corpo e mente para um bem-estar integral',
      discHypopressiveTitle: 'Ginástica Hipopressiva',
      discHypopressive: 'Recuperação pós-parto e fortalecimento do assoalho pélvico',
      discCross: 'Treino de alta intensidade para superar seus limites',
      discFunctionalTitle: 'Treino Funcional',
      discFunctional: 'Movimentos reais para a vida real',
      discCyclingTitle: 'Ciclismo Indoor',
      discCycling: 'Cardio intenso com energia do grupo',
      discStrengthTitle: 'Musculação',
      discStrength: 'Construa força, ganhe confiança',
      discAqua: 'Diversão aquática com resultados reais',

      // Gallery
      galleryHeading: 'Galeria',
      gallerySubtitle: 'Momentos de treino, aulas e estilo de vida saudável',

      // Image alts
      heroImgAlt: 'Tania Angulo, personal trainer em Alicante',
      aboutImgAlt: 'Tania treinando na academia',
      galHipo: 'Tania ensinando hipopressivos em Alicante',
      galTraining1: 'Sessão de treino pessoal',
      galClass1: 'Aula coletiva na academia',
      galFunctional: 'Treino funcional em grupo',
      galCross: 'Tania durante sessão de cross training',
      galRoutine: 'Preparação de rotina de exercícios',
      galLifestyle: 'Estilo de vida saudável e fitness',
      galPilates: 'Sessão de pilates',
      galPortrait: 'Tania Angulo, personal trainer',
      galNutrition: 'Nutrição e alimentação saudável',
      galOutdoor: 'Exercício ao ar livre',
      galCycling: 'Aula de ciclismo indoor',

      experienceHeading: 'Experiência',
      experienceSubtitle: 'Minha trajetória profissional no mundo do fitness',
      present: 'Atualmente',
      expNh: 'Preparadora física para atletas. Aulas de Pilates e Funcionais.',
      expTotalBody: 'Aulas de Pilates, Funcionais e Bungee.',
      expAltafit: 'Aulas coletivas com música, Ciclismo Indoor, Cross Training, Pilates. Suporte na sala fitness.',
      expGym24hTitle: 'Academia 24H',
      expGym24h: 'Planos de treino personalizados, assessoria nutricional. Aulas de Pilates, TRX, GAP e Corpo & Mente.',

      formationHeading: 'Formação',
      formAcredita: 'Certificação Profissional Nível III — Área Esportiva',
      formHypopressive: 'Ginástica Hipopressiva e Condicionamento Físico Pós-parto',
      formFeda: 'Personal Training · Nutrição Esportiva · Coaching',
      formApta: 'Instrutora de Atividades em Grupo com Suporte Musical',

      contactHeading: 'Vamos começar?',
      contactIntro: 'Conte-me seu objetivo e juntos criamos o treino perfeito para você.',
      formLabelName: 'Nome',
      formPlaceholderName: 'Seu nome',
      formLabelEmail: 'Email',
      formPlaceholderEmail: 'seu@email.com',
      formLabelMessage: 'Mensagem',
      formPlaceholderMessage: 'Conte-me seu objetivo…',
      formSubmit: 'Enviar mensagem',

      footerRights: 'Todos os direitos reservados.',
    },
  };


  /* ── STATE ── */
  let currentLang = localStorage.getItem('gfbt-lang') || 'es';
  let currentTheme = localStorage.getItem('gfbt-theme') || null;


  /* ── i18n ENGINE ── */
  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('gfbt-lang', lang);
    document.documentElement.lang = lang;

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[lang][key] !== undefined) {
        el.textContent = translations[lang][key];
      }
    });

    // Update aria-label attributes
    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria-label');
      if (translations[lang][key] !== undefined) {
        el.setAttribute('aria-label', translations[lang][key]);
      }
    });

    // Update alt attributes on images
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-alt');
      if (translations[lang][key] !== undefined) {
        el.setAttribute('alt', translations[lang][key]);
      }
    });

    // Update placeholder attributes on inputs/textareas
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key] !== undefined) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // Update lang buttons
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Update theme toggle label for current theme
    updateThemeToggleLabel();

    // Update nav toggle label
    updateNavToggleLabel();

    // Announce language change to screen readers (WCAG 4.1.3)
    var statusEl = document.getElementById('a11y-status');
    if (statusEl && translations[lang].langChanged) {
      statusEl.textContent = translations[lang].langChanged;
    }
  }


  /* ── THEME ENGINE ── */
  function getPreferredTheme() {
    if (currentTheme) return currentTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('gfbt-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeToggleLabel();
  }

  function toggleTheme() {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  function updateThemeToggleLabel() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var key = isDark ? 'themeToggleLabelDark' : 'themeToggleLabel';
    var label = translations[currentLang] ? translations[currentLang][key] : '';
    if (label) btn.setAttribute('aria-label', label);
  }

  function updateNavToggleLabel() {
    var toggle = document.querySelector('.nav-toggle');
    if (!toggle) return;
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    var key = expanded ? 'navToggleCloseLabel' : 'navToggleLabel';
    var label = translations[currentLang] ? translations[currentLang][key] : '';
    if (label) toggle.setAttribute('aria-label', label);
  }

  function updateSettingsToggleLabel() {
    var toggle = document.querySelector('.settings-toggle');
    if (!toggle) return;
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    var key = expanded ? 'settingsToggleCloseLabel' : 'settingsToggleLabel';
    var label = translations[currentLang] ? translations[currentLang][key] : '';
    if (label) toggle.setAttribute('aria-label', label);
  }


  /* ── FONT SIZE ENGINE ── */
  var fontSizeSteps = [100, 125, 150, 175, 200];
  var fontSizeIndex = (function () {
    var saved = parseInt(localStorage.getItem('gfbt-font-size'), 10);
    var idx = fontSizeSteps.indexOf(saved);
    return idx >= 0 ? idx : 0;
  })();

  function applyFontSize() {
    var size = fontSizeSteps[fontSizeIndex];
    document.documentElement.style.fontSize = size + '%';
    localStorage.setItem('gfbt-font-size', size);

    // Cap brand scaling at 125 %
    var brandScale = size <= 125 ? 1 : (125 / size);
    document.documentElement.style.setProperty('--brand-scale', brandScale);

    // Toggle compact nav mode (hamburger on desktop at ≥ 150 %)
    if (size >= 150) {
      document.documentElement.setAttribute('data-font-compact', '');
    } else {
      document.documentElement.removeAttribute('data-font-compact');
      // Close nav if it was open in compact mode
      var navToggle = document.querySelector('.nav-toggle');
      var navList = document.getElementById('main-nav');
      if (navToggle && navList) {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
        updateNavToggleLabel();
      }
    }

    // Update all toggle buttons
    document.querySelectorAll('.font-size-toggle').forEach(function (btn) {
      btn.querySelector('.font-size-value').textContent = size + '%';
      btn.classList.toggle('active', size > 100);
    });
  }

  function cycleFontSize() {
    fontSizeIndex = (fontSizeIndex + 1) % fontSizeSteps.length;
    applyFontSize();
  }

  function initFontSizeToggle() {
    document.querySelectorAll('.font-size-toggle').forEach(function (btn) {
      btn.addEventListener('click', cycleFontSize);
    });
    // Apply saved
    applyFontSize();
  }


  /* ── MOBILE NAVIGATION ── */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var navList = document.getElementById('main-nav');
    if (!toggle || !navList) return;

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('open', !expanded);
      updateNavToggleLabel();

      if (!expanded) {
        // Focus first link when opening
        var firstLink = navList.querySelector('.nav-link');
        if (firstLink) firstLink.focus();
      }
    });

    // Close on link click
    navList.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
        updateNavToggleLabel();
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
        updateNavToggleLabel();
        toggle.focus();
      }
    });
  }


  /* ── SETTINGS PANEL (mobile) ── */
  function initSettingsPanel() {
    var toggle = document.querySelector('.settings-toggle');
    var panel = document.getElementById('settings-panel');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      panel.classList.toggle('open', !expanded);
      updateSettingsToggleLabel();
    });

    // Sync mobile lang buttons with desktop ones
    panel.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLanguage(btn.getAttribute('data-lang'));
        // Sync both switchers
        syncLangButtons(btn.getAttribute('data-lang'));
      });
    });

    // Mobile theme toggle
    var mobileThemeBtn = panel.querySelector('.theme-toggle--mobile');
    if (mobileThemeBtn) {
      mobileThemeBtn.addEventListener('click', toggleTheme);
    }

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        panel.classList.remove('open');
        updateSettingsToggleLabel();
        toggle.focus();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (panel.classList.contains('open') && !panel.contains(e.target) && !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        panel.classList.remove('open');
        updateSettingsToggleLabel();
      }
    });
  }

  // Keep desktop and mobile lang switchers in sync
  function syncLangButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }


  /* ── ACTIVE NAV HIGHLIGHT ── */
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              var href = link.getAttribute('href');
              var isActive = href === '#' + id;
              link.classList.toggle('active', isActive);
              if (isActive) {
                link.setAttribute('aria-current', 'true');
              } else {
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-' + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) + 'px 0px -40% 0px' }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }


  /* ── SCROLL REVEAL ANIMATIONS ── */
  function initScrollReveal() {
    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Add reveal class to elements
    var revealTargets = [
      '.section-header',
      '.about-visual',
      '.about-text',
      '.discipline-card',
      '.timeline-item',
      '.formation-card',
      '.contact-intro',
      '.contact-form',
    ];

    revealTargets.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.classList.add('reveal');
      });
    });

    // Add stagger class to discipline grid row
    var discRow = document.querySelector('#disciplines .row');
    if (discRow) discRow.classList.add('reveal-stagger');

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      observer.observe(el);
    });
  }


  /* ── YEAR IN FOOTER ── */
  function setFooterYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }


  /* ── INIT ── */
  function init() {
    // Set initial theme
    setTheme(getPreferredTheme());

    // Set initial language
    setLanguage(currentLang);

    // Language switcher buttons (desktop header-actions)
    document.querySelectorAll('.header-actions .lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLanguage(btn.getAttribute('data-lang'));
        syncLangButtons(btn.getAttribute('data-lang'));
      });
    });

    // Theme toggle
    var themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem('gfbt-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Mobile nav
    initMobileNav();

    // Settings panel (mobile)
    initSettingsPanel();

    // Font size toggle
    initFontSizeToggle();

    // Active nav
    initActiveNav();

    // Scroll reveal
    initScrollReveal();

    // Footer year
    setFooterYear();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
