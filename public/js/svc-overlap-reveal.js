(function () {
  "use strict";

  function initSvcOverlapReveal() {
    var root = document.querySelector(".svc-overlap");
    if (!root || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    var panel = root.querySelector(".svc-panel");
    var cardsWrap = root.querySelector(".svc-cards-wrap");
    var cards = root.querySelector(".svc-cards");
    var heading = root.querySelector(".svc-heading");
    var credInner = document.querySelector("#credibility .trust-section__inner");

    if (!panel || !cardsWrap || !cards) {
      return;
    }

    gsap.context(function () {
      if (credInner) {
        gsap.to(credInner, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      }

      gsap.from(cards, {
        x: function () {
          return window.innerWidth * 0.55;
        },
        ease: "none",
        scrollTrigger: {
          trigger: cardsWrap,
          start: "top 90%",
          end: "top 40%",
          scrub: true,
        },
      });

      gsap.utils.toArray(".svc-card", root).forEach(function (card, i) {
        var body = card.querySelector(".body");
        var row = Math.floor(i / 3);
        var col = i % 3;
        var batchDelay = row * 0.55 + col * 0.08;

        gsap.from(card, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power3.out",
          delay: batchDelay,
          scrollTrigger: {
            trigger: cardsWrap,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        if (body) {
          gsap.from(body, {
            opacity: 0,
            y: 28,
            duration: 0.7,
            ease: "power3.out",
            delay: batchDelay + 0.12,
            scrollTrigger: {
              trigger: cardsWrap,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      if (heading) {
        gsap.from(heading, {
          y: 26,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 85%",
          },
        });
      }
    }, root);

    window.addEventListener(
      "load",
      function () {
        ScrollTrigger.refresh();
      },
      { once: true }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSvcOverlapReveal);
  } else {
    initSvcOverlapReveal();
  }
})();
