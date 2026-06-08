(function () {
  "use strict";

  var QUOTE_SECTION_ID = "consultation";
  var STORAGE_KEY = "dependable-scroll-to-quote";

  function scrollToQuoteForm() {
    var section = document.getElementById(QUOTE_SECTION_ID);
    if (!section) return false;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  function clearQuoteHashFromUrl() {
    if (window.location.hash === "#" + QUOTE_SECTION_ID) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  document.querySelectorAll("[data-scroll-to-quote]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      scrollToQuoteForm();
      clearQuoteHashFromUrl();
    });
  });

  function runDeferredScroll() {
    window.setTimeout(function () {
      scrollToQuoteForm();
      clearQuoteHashFromUrl();
    }, 100);
  }

  if (sessionStorage.getItem(STORAGE_KEY) === "1") {
    sessionStorage.removeItem(STORAGE_KEY);
    runDeferredScroll();
  } else if (window.location.hash === "#" + QUOTE_SECTION_ID) {
    runDeferredScroll();
  }
})();
