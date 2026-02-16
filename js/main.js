/* ============================================
   Clovis Lawn Services — Main JavaScript
   GSAP ScrollTrigger animations & interactive features
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------
  // Register GSAP plugins
  // -------------------------------------------
  gsap.registerPlugin(ScrollTrigger);

  // -------------------------------------------
  // Reduced-motion preference
  // -------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Helper: returns 0 duration when reduced motion is preferred
  const dur = (d) => prefersReducedMotion ? 0 : d;

  // -------------------------------------------
  // Utility: debounce
  // -------------------------------------------
  const debounce = (fn, delay = 150) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(null, args), delay);
    };
  };

  // -------------------------------------------
  // Utility: batch fade-in animation
  // Consolidates repeated fade-in-from-bottom patterns
  // -------------------------------------------
  const batchFadeIn = (elements, opts = {}) => {
    if (!elements.length || prefersReducedMotion) return;

    const from = { opacity: 0, y: 30, ...opts.from };
    const to = {
      opacity: 1, y: 0,
      duration: dur(0.8),
      stagger: 0.15,
      ease: 'power2.out',
      overwrite: true,
      ...opts.to
    };

    gsap.set(elements, from);

    ScrollTrigger.batch(elements, {
      start: opts.start || 'top 85%',
      onEnter: (batch) => { gsap.to(batch, to); },
      once: true
    });
  };

  // -------------------------------------------
  // Cache ALL DOM references (single query pass)
  // -------------------------------------------
  const nav = document.querySelector('.nav');
  const navHamburger = document.getElementById('navHamburger');
  const mobileNav = document.getElementById('mobileNav');
  const contactForm = document.getElementById('contactForm');
  const heroContent = document.querySelector('.hero__content');

  const bgPanels = document.querySelectorAll('.bg-panel');
  const revealSections = gsap.utils.toArray('.bg-panel__reveal');
  const animateElements = gsap.utils.toArray('[data-animate]');
  const steps = gsap.utils.toArray('.step');
  const connectors = gsap.utils.toArray('.step__connector');
  const pricingCards = gsap.utils.toArray('.pricing-card');

  const testimonialCards = gsap.utils.toArray('.testimonial-card');
  const serviceAreaCards = gsap.utils.toArray('.service-area-card');
  const faqItems = document.querySelectorAll('.faq__item');
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  // ============================================
  // PREPARE BG-PANEL INNER DIVS
  // Must run BEFORE ScrollTrigger pinning (Section 2) so
  // measurements are correct when pins are calculated.
  // ============================================
  const bgPanelInners = new Map();

  const isMobileView = window.matchMedia('(max-width: 767px)').matches;

  if (!prefersReducedMotion) {
    revealSections.forEach((reveal, index) => {
      const panel = reveal.closest('.bg-panel');
      const bgImage = panel ? panel.querySelector('.bg-panel__image') : null;
      if (!bgImage) return;

      const bgUrl = bgImage.dataset.bg || '';
      const inlineUrl = bgImage.style.backgroundImage;

      if (isMobileView) {
        // MOBILE: No inner div needed — no parallax/zoom/pinning.
        // Set background directly on the outer element to avoid
        // stacking/lazy-load issues that cause wrong images to show.
        // CSS default background-size: cover handles all sections correctly.
        if (bgUrl) {
          bgImage.style.backgroundImage = "url('" + bgUrl + "')";
          bgImage.removeAttribute('data-bg');
        }
        return; // skip inner div creation on mobile
      }

      // DESKTOP: Create inner div for parallax + zoom (scale on inner avoids
      // breaking ScrollTrigger pin calculations on the outer element)
      const inner = document.createElement('div');
      inner.style.position = 'absolute';
      inner.style.inset = '0';
      inner.style.backgroundSize = 'cover';
      inner.style.backgroundPosition = 'center';
      inner.style.backgroundRepeat = 'no-repeat';
      inner.style.transformOrigin = 'center center';

      // Preserve About section's custom background sizing
      if (panel.id === 'about') {
        inner.style.backgroundSize = '120% auto';
      }

      if (bgUrl) {
        // First panel (services) is near-fold — load eagerly
        // Others use IntersectionObserver for lazy loading
        if (index === 0) {
          inner.style.backgroundImage = "url('" + bgUrl + "')";
        } else {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.style.backgroundImage = "url('" + bgUrl + "')";
                observer.unobserve(entry.target);
              }
            });
          }, { rootMargin: '300px 0px' });
          observer.observe(inner);
        }
        bgImage.removeAttribute('data-bg');
      } else if (inlineUrl && inlineUrl !== 'none') {
        inner.style.backgroundImage = inlineUrl;
      }

      // Transfer background from outer (pinned) to inner
      bgImage.style.backgroundImage = 'none';
      bgImage.style.overflow = 'hidden';
      bgImage.appendChild(inner);

      bgPanelInners.set(reveal, { inner, panel });
    });
  }

  // ============================================
  // 1. STICKY NAV SCROLL EFFECT
  // ============================================
  if (nav) {
    ScrollTrigger.create({
      start: 'top -80',
      onEnter: () => nav.classList.add('nav--scrolled'),
      onLeaveBack: () => nav.classList.remove('nav--scrolled')
    });
  }

  // ============================================
  // 2. BACKGROUND PANEL REVEAL SYSTEM
  // ============================================
  if (bgPanels.length && !prefersReducedMotion) {
    ScrollTrigger.matchMedia({
      // --- DESKTOP: pin the background image ---
      '(min-width: 768px)': function () {
        bgPanels.forEach((panel) => {
          const bgImage = panel.querySelector('.bg-panel__image');
          if (!bgImage) return;

          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            end: 'bottom bottom',
            pin: bgImage,
            pinSpacing: false
          });
        });
      },

      // --- MOBILE: no pinning, no parallax (saves scroll perf) ---
      '(max-width: 767px)': function () {
        // Static background — parallax shift is barely visible on
        // small screens and the scrubbed ScrollTrigger per panel
        // adds measurable overhead on low-end devices.
      }
    });
  }

  // ============================================
  // 3. SECTION CONTENT ANIMATIONS [data-animate]
  //    + PRICING CARDS + TESTIMONIAL CARDS
  //    Media-aware: skip carousel cards on mobile
  // ============================================
  const carouselCardSelectors = ['.service-card', '.pricing-card', '.testimonial-card', '.service-area-card'];

  ScrollTrigger.matchMedia({
    '(min-width: 768px)': function () {
      // Desktop/tablet: animate all except service-area-cards (shuffle handles those)
      var nonShuffleElements = animateElements.filter(function (el) {
        return !el.matches('.service-area-card');
      });
      batchFadeIn(nonShuffleElements);
      batchFadeIn(pricingCards, {
        from: { opacity: 0, scale: 0.95, y: 0 },
        to: { opacity: 1, scale: 1, y: 0, duration: dur(0.8), stagger: 0.15, ease: 'power2.out', overwrite: true }
      });
      batchFadeIn(testimonialCards);
      // Clear data-animate initial state from service area cards (shuffle handles them)
      gsap.set(serviceAreaCards, { clearProps: 'all' });
    },

    '(max-width: 767px)': function () {
      // Mobile: animate only non-carousel elements
      var nonCarouselElements = animateElements.filter(function (el) {
        return !carouselCardSelectors.some(function (sel) { return el.matches(sel); });
      });
      batchFadeIn(nonCarouselElements);

      // Clear GSAP inline styles from carousel cards (CSS !important handles visibility)
      var carouselCards = document.querySelectorAll(
        '.service-card[data-animate], .pricing-card[data-animate], .testimonial-card[data-animate]'
      );
      gsap.set(carouselCards, { clearProps: 'all' });

      // Clear data-animate initial state from service area cards (shuffle handles them)
      gsap.set(serviceAreaCards, { clearProps: 'all' });
    }
  });

  // ============================================
  // 4. HOW IT WORKS STEPS — batch reveal
  // ============================================
  if (!prefersReducedMotion && (steps.length || connectors.length)) {
    gsap.set(steps, { opacity: 0, y: 40 });
    gsap.set(connectors, { scaleX: 0, opacity: 0 });

    const stepsAndConnectors = gsap.utils.toArray('.step, .step__connector');

    ScrollTrigger.batch(stepsAndConnectors, {
      start: 'top 85%',
      onEnter: (batch) => {
        batch.forEach((el, i) => {
          const isConnector = el.classList.contains('step__connector');
          gsap.to(el, {
            opacity: 1,
            y: isConnector ? undefined : 0,
            scaleX: isConnector ? 1 : undefined,
            duration: dur(isConnector ? 0.6 : 0.7),
            ease: 'power2.out',
            delay: i * 0.15
          });
        });
      },
      once: true
    });
  }

  // ============================================
  // 5. (Pricing cards now handled by matchMedia in section 3)
  // ============================================

  // ============================================
  // 6. WINDOWED REVEAL — text entrance animations
  // ============================================
  if (!prefersReducedMotion) {
    revealSections.forEach((reveal) => {
      const side = reveal.getAttribute('data-side') || 'right';
      const label = reveal.querySelector('.bg-panel__reveal-label');
      const heading = reveal.querySelector('.bg-panel__reveal-heading');
      const desc = reveal.querySelector('.bg-panel__reveal-desc');
      const stats = reveal.querySelector('.bg-panel__reveal-stats');
      const scrollHint = reveal.querySelector('.bg-panel__reveal-scroll-hint');

      const xOffset = side === 'right' ? 40 : -40;
      const elements = [label, heading, desc, stats, scrollHint].filter(Boolean);

      gsap.set(elements, { opacity: 0, y: 20, x: xOffset });

      ScrollTrigger.create({
        trigger: reveal,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          if (label) {
            tl.to(label, {
              opacity: 1, y: 0, x: 0,
              duration: dur(0.6),
              ease: 'power2.out'
            });
          }
          if (heading) {
            tl.to(heading, {
              opacity: 1, y: 0, x: 0,
              duration: dur(0.7),
              ease: 'power2.out'
            }, '-=0.35');
          }
          if (desc) {
            tl.to(desc, {
              opacity: 1, y: 0, x: 0,
              duration: dur(0.7),
              ease: 'power2.out'
            }, '-=0.35');
          }
          if (stats) {
            tl.to(stats, {
              opacity: 1, y: 0, x: 0,
              duration: dur(0.6),
              ease: 'power2.out'
            }, '-=0.3');
          }
          if (scrollHint) {
            tl.to(scrollHint, {
              opacity: 1, y: 0, x: 0,
              duration: dur(0.5),
              ease: 'power2.out'
            }, '-=0.2');
          }
        }
      });
    });
  }

  // ============================================
  // 6b. WINDOWED REVEAL — parallax + subtle zoom
  // DOM was already prepared above; this only creates animations.
  // ============================================
  if (!prefersReducedMotion) {
    // Parallax + zoom on DESKTOP only — on mobile these scrubbed
    // ScrollTriggers (one per panel) cause measurable scroll jank.
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': function () {
        bgPanelInners.forEach(({ inner }, reveal) => {
          // Subtle zoom
          gsap.fromTo(inner, { scale: 1 }, {
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: reveal,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1
            }
          });

          // Background position shift
          gsap.fromTo(inner, {
            backgroundPosition: '50% 40%'
          }, {
            backgroundPosition: '50% 60%',
            ease: 'none',
            scrollTrigger: {
              trigger: reveal,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1
            }
          });
        });
      }
    });
  }

  // ============================================
  // 7. HERO CONTENT — fade in on page load
  // ============================================
  if (heroContent) {
    const heroTitle = heroContent.querySelector('.hero__title');
    const heroSubtitle = heroContent.querySelector('.hero__subtitle');
    const heroCtas = heroContent.querySelector('.hero__ctas');

    const heroTl = gsap.timeline({ delay: 0.3 });

    if (heroTitle) {
      heroTl.from(heroTitle, {
        opacity: 0,
        y: 30,
        duration: dur(0.8),
        ease: 'power2.out'
      });
    }

    if (heroSubtitle) {
      heroTl.from(heroSubtitle, {
        opacity: 0,
        y: 20,
        duration: dur(0.7),
        ease: 'power2.out'
      }, '-=0.4');
    }

    if (heroCtas) {
      heroTl.from(heroCtas, {
        opacity: 0,
        y: 20,
        duration: dur(0.7),
        ease: 'power2.out'
      }, '-=0.3');
    }
  }

  // Section 8 (scroll indicator bounce) REMOVED — CSS @keyframes scrollBounce
  // already handles this animation more efficiently on the compositor thread.

  // ============================================
  // 9. TRUST BAR — infinite marquee
  // ============================================
  (function initTrustBarMarquee() {
    const track = document.querySelector('.trust-bar__track');
    const bar = document.querySelector('.trust-bar');
    if (!track || !bar) return;

    // Measure one set (1/4 of total content)
    const setWidth = track.scrollWidth / 4;
    if (setWidth === 0) return;

    const speed = 20; // px per second (lower = slower)
    const maxSpeedMultiplier = 4;
    let isPaused = false;

    // Infinite scroll tween
    const marquee = gsap.to(track, {
      x: -setWidth,
      duration: setWidth / speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(function (x) {
          return parseFloat(x) % setWidth;
        })
      }
    });

    // Pause on hover (smooth timeScale ramp)
    bar.addEventListener('mouseenter', function () {
      isPaused = true;
      gsap.to(marquee, { timeScale: 0, duration: 0.5, ease: 'power2.out' });
    });
    bar.addEventListener('mouseleave', function () {
      isPaused = false;
      gsap.to(marquee, { timeScale: 1, duration: 0.5, ease: 'power2.out' });
    });

    // Scroll acceleration — DESKTOP ONLY
    // On mobile the scroll listener + rAF loop conflicts with touch
    // swiping, causing jank. The marquee still runs at constant speed.
    if (!prefersReducedMotion && window.matchMedia('(min-width: 768px)').matches) {
      let lastScrollY = window.scrollY;
      let targetSpeed = 1;
      let currentSpeed = 1;
      let scrollTimeout;

      function updateSpeed() {
        var diff = targetSpeed - currentSpeed;
        var lerpSpeed = diff > 0 ? 0.1 : 0.025;
        currentSpeed += diff * lerpSpeed;
        if (!isPaused) {
          marquee.timeScale(currentSpeed);
        }
        requestAnimationFrame(updateSpeed);
      }

      window.addEventListener('scroll', function () {
        var currentScrollY = window.scrollY;
        var delta = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;
        var velocity = Math.min(delta / 15, 1);
        targetSpeed = 1 + Math.pow(velocity, 0.8) * (maxSpeedMultiplier - 1);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
          targetSpeed = 1;
        }, 300);
      }, { passive: true });

      requestAnimationFrame(updateSpeed);
    }
  })();

  // ============================================
  // 10. (Testimonial cards now handled by matchMedia in section 3)
  // ============================================

  // ============================================
  // 11. SERVICE AREA CARDS — card shuffle (all screens)
  // ============================================
  if (!prefersReducedMotion && serviceAreaCards.length) {
    (function initServiceAreaShuffle() {
      var section = document.querySelector('.service-areas');
      var grid = document.querySelector('.service-areas__grid');
      if (!section || !grid) return;

      // Add shuffle class to activate CSS layout
      section.classList.add('service-areas--shuffle');

      // --- Lazy-load the map background ---
      var mapBg = section.querySelector('.service-areas__map');
      if (mapBg && mapBg.dataset.bg) {
        var bgUrl = mapBg.dataset.bg;
        var mapObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.backgroundImage = "url('" + bgUrl + "')";
              mapObserver.unobserve(entry.target);
            }
          });
        }, { rootMargin: '300px 0px' });
        mapObserver.observe(mapBg);
      }

      // --- z-index stacking: Card 1 on top ---
      var totalCards = serviceAreaCards.length;
      serviceAreaCards.forEach(function (card, i) {
        card.style.zIndex = totalCards - i;
      });

      // --- No pin! CSS sticky handles keeping content in view.
      // ScrollTrigger just scrubs the card animation as the
      // tall section scrolls through. ---
      // Higher scrub value on mobile for smoother interpolation
      var isMobile = window.matchMedia('(max-width: 767px)').matches;
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: isMobile ? 1.2 : 0.6
        }
      });

      // Timeline layout (3 cards):
      //   0.00–0.20  card 0 dwell (visible, no animation)
      //   0.20–0.40  card 0 peels away
      //   0.40–0.55  card 1 dwell
      //   0.55–0.75  card 1 peels away
      //   0.75–1.00  card 2 dwell (last card stays)
      var peels = totalCards - 1;     // 2 peel animations
      var peelDur = 0.20;             // each peel takes 20% of scroll
      var dwellFirst = 0.20;          // first card holds 20%
      var dwellMid = 0.15;            // middle dwell between peels
      var pos = dwellFirst;           // start after first dwell

      for (var i = 0; i < peels; i++) {
        tl.to(serviceAreaCards[i], {
          y: -(window.innerHeight * 0.6),
          rotation: -3 + (i * 3),
          scale: 0.95,
          opacity: 0,
          duration: peelDur,
          ease: 'power1.in'
        }, pos);
        pos += peelDur + (i < peels - 1 ? dwellMid : 0);
      }

      // Extend timeline so the last card gets a proper dwell period.
      // Without this, the timeline ends at the last peel (0.75) and
      // scrub maps 0–0.75 to the full scroll, leaving no time for
      // the last card to stay visible.
      tl.addLabel('end', 1.0);
    })();
  }

  // ============================================
  // 12. FAQ ACCORDION
  // ============================================
  if (faqItems.length) {
    // Set initial state: all answers collapsed
    faqItems.forEach((item) => {
      const answer = item.querySelector('.faq__answer');
      if (answer) {
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
      }
    });

    const closeFaq = (item) => {
      const question = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');
      const chevron = item.querySelector('.faq__chevron');

      if (!question || !answer) return;

      // Kill any in-progress tweens before starting new ones
      gsap.killTweensOf(answer);
      if (chevron) gsap.killTweensOf(chevron);

      question.setAttribute('aria-expanded', 'false');
      answer.setAttribute('aria-hidden', 'true');
      item.classList.remove('faq__item--active');

      // Snap overflow hidden immediately so content doesn't peek out
      answer.style.overflow = 'hidden';

      gsap.to(answer, {
        maxHeight: 0,
        duration: dur(0.35),
        ease: 'power2.inOut'
      });

      if (chevron) {
        gsap.to(chevron, {
          rotation: 0,
          duration: dur(0.3),
          ease: 'power2.inOut'
        });
      }
    };

    const openFaq = (item) => {
      const question = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');
      const chevron = item.querySelector('.faq__chevron');

      if (!question || !answer) return;

      // Kill any in-progress tweens before starting new ones
      gsap.killTweensOf(answer);
      if (chevron) gsap.killTweensOf(chevron);

      question.setAttribute('aria-expanded', 'true');
      answer.setAttribute('aria-hidden', 'false');
      item.classList.add('faq__item--active');

      // Measure natural height without causing a visual flash
      answer.style.maxHeight = 'none';
      const naturalHeight = answer.scrollHeight;
      answer.style.maxHeight = '0px';

      gsap.to(answer, {
        maxHeight: naturalHeight + 'px',
        duration: dur(0.4),
        ease: 'power2.inOut',
        onComplete: () => {
          answer.style.maxHeight = 'none';
          answer.style.overflow = 'visible';
        }
      });

      if (chevron) {
        gsap.to(chevron, {
          rotation: 180,
          duration: dur(0.3),
          ease: 'power2.inOut'
        });
      }
    };

    faqItems.forEach((item) => {
      const question = item.querySelector('.faq__question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isOpen = question.getAttribute('aria-expanded') === 'true';

        // Close all other FAQs first (only-one-open behavior)
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            closeFaq(otherItem);
          }
        });

        if (isOpen) {
          closeFaq(item);
        } else {
          openFaq(item);
        }
      });
    });
  }

  // ============================================
  // 13. MOBILE NAVIGATION
  // ============================================
  if (navHamburger && mobileNav) {
    const hamburgerSpans = navHamburger.querySelectorAll('span');
    let mobileNavOpen = false;

    const openMobileNav = () => {
      mobileNavOpen = true;
      mobileNav.classList.add('mobile-nav--active');
      navHamburger.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (hamburgerSpans.length >= 3) {
        gsap.to(hamburgerSpans[0], {
          rotation: 45,
          y: 8,
          duration: dur(0.3),
          ease: 'power2.inOut'
        });
        gsap.to(hamburgerSpans[1], {
          opacity: 0,
          duration: dur(0.2),
          ease: 'power2.inOut'
        });
        gsap.to(hamburgerSpans[2], {
          rotation: -45,
          y: -8,
          duration: dur(0.3),
          ease: 'power2.inOut'
        });
      }
    };

    const closeMobileNav = () => {
      mobileNavOpen = false;
      mobileNav.classList.remove('mobile-nav--active');
      navHamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (hamburgerSpans.length >= 3) {
        gsap.to(hamburgerSpans[0], {
          rotation: 0,
          y: 0,
          duration: dur(0.3),
          ease: 'power2.inOut'
        });
        gsap.to(hamburgerSpans[1], {
          opacity: 1,
          duration: dur(0.2),
          ease: 'power2.inOut'
        });
        gsap.to(hamburgerSpans[2], {
          rotation: 0,
          y: 0,
          duration: dur(0.3),
          ease: 'power2.inOut'
        });
      }
    };

    navHamburger.addEventListener('click', () => {
      if (mobileNavOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavOpen) {
        closeMobileNav();
      }
    });
  }

  // ============================================
  // 14. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = nav ? nav.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });

  // ============================================
  // 15. CONTACT FORM HANDLING
  // ============================================
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot check
      const honeypot = contactForm.querySelector('#website');
      if (honeypot && honeypot.value.trim() !== '') {
        showFormSuccess();
        return;
      }

      const name = contactForm.querySelector('#name');
      const phone = contactForm.querySelector('#phone');
      const address = contactForm.querySelector('#address');

      let isValid = true;
      const requiredFields = [name, phone, address];

      requiredFields.forEach((field) => {
        if (!field) return;
        clearFieldError(field);

        if (!field.value.trim()) {
          isValid = false;
          showFieldError(field, 'This field is required.');
        }
      });

      const email = contactForm.querySelector('#email');
      if (email && email.value.trim()) {
        clearFieldError(email);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
          isValid = false;
          showFieldError(email, 'Please enter a valid email address.');
        }
      }

      if (phone && phone.value.trim()) {
        const digits = phone.value.replace(/\D/g, '');
        if (digits.length < 10) {
          isValid = false;
          clearFieldError(phone);
          showFieldError(phone, 'Please enter a valid 10-digit phone number.');
        }
      }

      if (!isValid) return;

      showFormSuccess();
    });

    const showFieldError = (field, message) => {
      field.classList.add('form-input--error');
      const errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      errorEl.textContent = message;
      errorEl.setAttribute('role', 'alert');
      field.parentNode.appendChild(errorEl);
    };

    const clearFieldError = (field) => {
      field.classList.remove('form-input--error');
      const existing = field.parentNode.querySelector('.form-error');
      if (existing) existing.remove();
    };

    const showFormSuccess = () => {
      const formContainer = contactForm.parentNode;

      const successEl = document.createElement('div');
      successEl.className = 'contact-form__success';
      successEl.innerHTML = `
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <h3>Thanks! Your request has been sent.</h3>
        <p>Tyler will get back to you shortly — usually the same day.</p>
      `;

      gsap.to(contactForm, {
        opacity: 0,
        y: -10,
        duration: dur(0.4),
        ease: 'power2.inOut',
        onComplete: () => {
          contactForm.style.display = 'none';
          formContainer.insertBefore(successEl, formContainer.firstChild);
          gsap.from(successEl, {
            opacity: 0,
            y: 20,
            duration: dur(0.5),
            ease: 'power2.out'
          });
        }
      });
    };
  }

  // ============================================
  // 16. PERFORMANCE: debounced resize refresh
  // Only refresh when width changes — height-only changes (mobile
  // address bar show/hide) should NOT trigger a full recalculation.
  // ============================================
  var lastWidth = window.innerWidth;
  window.addEventListener('resize', debounce(function () {
    var newWidth = window.innerWidth;
    if (newWidth !== lastWidth) {
      lastWidth = newWidth;
      ScrollTrigger.refresh();
    }
  }, 250));

  // ============================================
  // 17. SCROLL-TRIGGER REFRESH on images loaded
  // ============================================
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  // ============================================
  // 18. SERVICES CAROUSEL — rAF auto-scroll + manual drag
  // ============================================
  (function initServicesCarousel() {
    var scroller = document.querySelector('.services-carousel__scroller');
    var track = scroller && scroller.querySelector('.services-carousel__track');
    var set = track && track.querySelector('.services-carousel__set');
    if (!scroller || !track || !set) return;

    // Clone the card set for seamless infinite loop
    var clone = set.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);

    var SPEED = 0.5;           // px per frame
    var RESUME_DELAY = 2000;   // ms pause after user interaction
    var paused = false;
    var resumeTimer = null;
    var halfWidth = 0;
    var pos = 0;               // float accumulator — avoids sub-pixel rounding
    var carouselVisible = false;
    var carouselRafId = null;

    function measure() {
      halfWidth = set.offsetWidth;
    }

    function tick() {
      if (!paused && !prefersReducedMotion && halfWidth > 0) {
        pos += SPEED;
        if (pos >= halfWidth) pos -= halfWidth;
        scroller.scrollLeft = Math.round(pos);
      }
      if (carouselVisible) {
        carouselRafId = requestAnimationFrame(tick);
      } else {
        carouselRafId = null;
      }
    }

    function pauseScroll() {
      paused = true;
      clearTimeout(resumeTimer);
    }

    function resumeScroll() {
      // Sync accumulator to actual scroll position before resuming
      pos = scroller.scrollLeft;
      if (halfWidth > 0 && pos >= halfWidth) pos -= halfWidth;
      paused = false;
    }

    function scheduleResume() {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(resumeScroll, RESUME_DELAY);
    }

    // Pause on hover
    scroller.addEventListener('mouseenter', pauseScroll);
    scroller.addEventListener('mouseleave', scheduleResume);

    // Pointer drag support
    var dragging = false;
    var dragStartX = 0;
    var dragScrollLeft = 0;

    scroller.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      dragging = true;
      pauseScroll();
      dragStartX = e.pageX;
      dragScrollLeft = scroller.scrollLeft;
      scroller.setPointerCapture(e.pointerId);
    });

    scroller.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var newScroll = dragScrollLeft - (e.pageX - dragStartX);
      if (halfWidth > 0) {
        if (newScroll >= halfWidth) {
          newScroll -= halfWidth;
          dragScrollLeft -= halfWidth;
        } else if (newScroll <= 0) {
          newScroll += halfWidth;
          dragScrollLeft += halfWidth;
        }
      }
      scroller.scrollLeft = newScroll;
    });

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      scheduleResume();
    }

    scroller.addEventListener('pointerup', endDrag);
    scroller.addEventListener('pointercancel', endDrag);

    // Touch swipe
    scroller.addEventListener('touchstart', function () {
      pauseScroll();
    }, { passive: true });
    scroller.addEventListener('touchend', function () {
      scheduleResume();
    }, { passive: true });

    // Seamless wrapping during native touch/scroll
    scroller.addEventListener('scroll', function () {
      if (dragging || !paused || halfWidth <= 0) return;
      var sl = scroller.scrollLeft;
      if (sl >= halfWidth) {
        scroller.scrollLeft = sl - halfWidth;
      } else if (sl <= 1) {
        scroller.scrollLeft = sl + halfWidth;
      }
    });

    // Only run rAF loop when carousel is visible
    var carouselObserver = new IntersectionObserver(function (entries) {
      carouselVisible = entries[0].isIntersecting;
      if (carouselVisible && carouselRafId === null) {
        // Sync accumulator before resuming
        pos = scroller.scrollLeft;
        if (halfWidth > 0 && pos >= halfWidth) pos -= halfWidth;
        carouselRafId = requestAnimationFrame(tick);
      }
    }, { rootMargin: '100px 0px' });

    // Defer init until after first paint so layout is settled
    requestAnimationFrame(function () {
      measure();
      carouselObserver.observe(scroller);
    });
    window.addEventListener('resize', debounce(measure, 250));
  })();

  // ============================================
  // 19. MOBILE CAROUSELS — dot indicators
  // ============================================
  (function initMobileCarousels() {
    var MOBILE_BP = 768;

    var configs = [
      { grid: document.querySelector('.pricing-grid'), card: '.pricing-card', label: 'Pricing carousel' },
      { grid: document.querySelector('.testimonials__grid'), card: '.testimonial-card', label: 'Testimonials carousel' }
    ];

    var carousels = [];

    function createDots(grid, cards, label) {
      var container = document.createElement('div');
      container.className = 'carousel-dots';
      container.setAttribute('role', 'tablist');
      container.setAttribute('aria-label', label + ' navigation');

      cards.forEach(function (card, i) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' carousel-dot--active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1) + ' of ' + cards.length);
        dot.setAttribute('tabindex', i === 0 ? '0' : '-1');

        dot.addEventListener('click', function () {
          card.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        });

        container.appendChild(dot);
      });

      grid.insertAdjacentElement('afterend', container);
      return container;
    }

    function observeCards(grid, cards, dotsContainer) {
      var dots = dotsContainer.querySelectorAll('.carousel-dot');

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            var idx = cards.indexOf(entry.target);
            if (idx === -1) return;

            dots.forEach(function (dot, i) {
              var active = i === idx;
              dot.classList.toggle('carousel-dot--active', active);
              dot.setAttribute('aria-selected', active ? 'true' : 'false');
              dot.setAttribute('tabindex', active ? '0' : '-1');
            });
          }
        });
      }, {
        root: grid,
        threshold: 0.5
      });

      cards.forEach(function (c) { observer.observe(c); });
      return observer;
    }

    function init() {
      if (window.innerWidth >= MOBILE_BP) return;

      configs.forEach(function (cfg) {
        if (!cfg.grid) return;
        var cards = Array.from(cfg.grid.querySelectorAll(cfg.card));
        if (!cards.length) return;

        var dotsContainer = createDots(cfg.grid, cards, cfg.label);
        var observer = observeCards(cfg.grid, cards, dotsContainer);

        carousels.push({ dots: dotsContainer, observer: observer, cards: cards });
      });
    }

    function destroy() {
      carousels.forEach(function (c) {
        c.cards.forEach(function (card) { c.observer.unobserve(card); });
        c.observer.disconnect();
        if (c.dots.parentNode) c.dots.parentNode.removeChild(c.dots);
      });
      carousels.length = 0;
    }

    init();

    var wasMobile = window.innerWidth < MOBILE_BP;
    window.addEventListener('resize', debounce(function () {
      var isMobile = window.innerWidth < MOBILE_BP;
      if (isMobile && !wasMobile) init();
      else if (!isMobile && wasMobile) destroy();
      wasMobile = isMobile;
    }, 250));
  })();
});
