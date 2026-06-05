(function () {
  "use strict";

  var section = document.getElementById("about");
  if (!section) return;

  section.querySelectorAll("[data-timeline]").forEach(function (el) {
    var index = el.getAttribute("data-timeline");
    if (index !== null) {
      el.style.setProperty("--timeline-i", index);
    }
  });

  var headline = section.querySelector("#about-hero-title");
  if (headline && !headline.dataset.wordsSplit) {
    var text = headline.textContent.trim();
    headline.textContent = "";
    headline.setAttribute("aria-label", text);
    headline.dataset.wordsSplit = "true";

    text.split(/\s+/).forEach(function (word, index, words) {
      var mask = document.createElement("span");
      mask.className = "about-hero__word-mask";
      mask.style.setProperty("--word-i", String(index));

      var inner = document.createElement("span");
      inner.className = "about-hero__word";
      inner.textContent = word;
      mask.appendChild(inner);
      headline.appendChild(mask);

      if (index < words.length - 1) {
        headline.appendChild(document.createTextNode(" "));
      }
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("is-in-view");
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
  );

  observer.observe(section);
})();
