/**
 * Static port of TextRoll for index.html navbar links.
 */
(function initTextRollNav() {
  var STAGGER_MS = 35;
  var nodes = document.querySelectorAll("[data-text-roll]");

  nodes.forEach(function (anchor) {
    var label =
      anchor.getAttribute("data-text-roll-label") ||
      anchor.textContent.trim();
    var center = anchor.hasAttribute("data-text-roll-center");

    anchor.textContent = "";
    anchor.classList.add("nav-text-roll-link");

    var wrap = document.createElement("span");
    wrap.className = "text-roll";
    wrap.setAttribute("aria-hidden", "true");

    var top = document.createElement("span");
    top.className = "text-roll__row text-roll__row--top";

    var bottom = document.createElement("span");
    bottom.className = "text-roll__row text-roll__row--bottom";

    for (var i = 0; i < label.length; i++) {
      var delay = center
        ? STAGGER_MS * Math.abs(i - (label.length - 1) / 2)
        : STAGGER_MS * i;
      var isSpace = label[i] === " ";

      var topChar = document.createElement("span");
      topChar.className = isSpace
        ? "text-roll__char text-roll__char--space"
        : "text-roll__char";
      topChar.style.transitionDelay = delay + "ms";
      topChar.textContent = isSpace ? "\u00A0" : label[i];
      top.appendChild(topChar);

      var bottomChar = document.createElement("span");
      bottomChar.className = isSpace
        ? "text-roll__char text-roll__char--space"
        : "text-roll__char";
      bottomChar.style.transitionDelay = delay + "ms";
      bottomChar.textContent = isSpace ? "\u00A0" : label[i];
      bottom.appendChild(bottomChar);
    }

    wrap.appendChild(top);
    wrap.appendChild(bottom);
    anchor.appendChild(wrap);
    anchor.setAttribute("aria-label", label);
  });
})();
