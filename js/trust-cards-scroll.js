(function () {
  "use strict";

  function initTrustCardsScroll() {
    var section = document.getElementById("credibility");
    if (!section) return;

    var grid = section.querySelector(".trust-grid");
    if (!grid) return;

    var cards = Array.prototype.slice.call(
      grid.querySelectorAll(".highlight-card-wrap")
    );
    if (!cards.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    var scrollDirection = "down";
    var lastScrollY = window.scrollY;
    var cardsState = "hidden";
    var runningAnims = [];

    function cancelAnims() {
      runningAnims.forEach(function (anim) {
        anim.cancel();
      });
      runningAnims = [];
    }

    function setHiddenStyles() {
      cards.forEach(function (card) {
        card.style.opacity = "0";
        card.style.transform = "translate3d(120px, 0, 0)";
      });
    }

    function setVisibleStyles() {
      cards.forEach(function (card) {
        card.style.opacity = "1";
        card.style.transform = "translate3d(0, 0, 0)";
      });
    }

    function playEnter() {
      if (cardsState === "visible") return;
      cancelAnims();
      cardsState = "visible";
      runningAnims = cards.map(function (card, index) {
        return card.animate(
          [
            { opacity: 0, transform: "translate3d(120px, 0, 0)" },
            { opacity: 1, transform: "translate3d(0, 0, 0)" },
          ],
          {
            duration: 700,
            delay: index * 150,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards",
          }
        );
      });
    }

    function playExitUp() {
      if (cardsState === "hidden") return;
      cancelAnims();
      cardsState = "exiting";
      runningAnims = cards.map(function (card, index) {
        return card.animate(
          [
            { opacity: 1, transform: "translate3d(0, 0, 0)" },
            { opacity: 0, transform: "translate3d(120px, 0, 0)" },
          ],
          {
            duration: 550,
            delay: index * 100,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards",
          }
        );
      });

      Promise.all(
        runningAnims.map(function (anim) {
          return anim.finished.catch(function () {});
        })
      ).then(function () {
        if (cardsState === "exiting") {
          cardsState = "hidden";
          setHiddenStyles();
        }
      });
    }

    function resetHidden() {
      cancelAnims();
      cardsState = "hidden";
      setHiddenStyles();
    }

    function gridShouldShow() {
      var rect = grid.getBoundingClientRect();
      var viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      var visibleHeight =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

      return (
        visibleHeight >= 120 &&
        rect.top < viewportHeight * 0.78 &&
        rect.bottom > viewportHeight * 0.12
      );
    }

    function sectionLeftUpward() {
      var rect = section.getBoundingClientRect();
      var viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      return scrollDirection === "up" && rect.top >= viewportHeight - 40;
    }

    function sectionLeftDownward() {
      var rect = section.getBoundingClientRect();
      return scrollDirection === "down" && rect.bottom <= 40;
    }

    function update() {
      if (gridShouldShow()) {
        if (cardsState === "hidden") {
          playEnter();
        }
        return;
      }

      if (cardsState === "visible" && sectionLeftUpward()) {
        playExitUp();
        return;
      }

      if (cardsState === "visible" && sectionLeftDownward()) {
        resetHidden();
      }
    }

    window.addEventListener(
      "scroll",
      function () {
        var currentY = window.scrollY;
        if (currentY > lastScrollY) {
          scrollDirection = "down";
        } else if (currentY < lastScrollY) {
          scrollDirection = "up";
        }
        lastScrollY = currentY;
        update();
      },
      { passive: true }
    );

    var observer = new IntersectionObserver(
      function () {
        update();
      },
      { threshold: [0, 0.1, 0.25, 0.4], rootMargin: "0px 0px -5% 0px" }
    );

    setHiddenStyles();
    observer.observe(grid);
    update();
    window.addEventListener("resize", update, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTrustCardsScroll);
  } else {
    initTrustCardsScroll();
  }
})();
