/**
 * Static port of AnimatedTestimonials for index.html
 */
(function initAnimatedTestimonials() {
  var root = document.getElementById("animated-testimonials");
  if (!root) return;

  var testimonials = [
    {
      id: 1,
      name: "Derrick L.",
      role: "Customer",
      company: "Norfolk, WA",
      content:
        "From the moment that I contacted your company, I received excellent all-around customer service. First and foremost, she was knowledgeable and walked me through every step of the move.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
    {
      id: 2,
      name: "Barbara S.",
      role: "Customer",
      company: "Lawrence, NJ",
      content:
        "We chose you due to the great follow-up you had and the professionalism of the estimator. The service was excellent and the team was careful with our home from start to finish.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
    {
      id: 3,
      name: "Marsha K.",
      role: "Customer",
      company: "Raleigh, NC",
      content:
        "I couldn't have done this move without the move consultant. He was absolutely terrific. There was no question he could not answer, and he made a difficult relocation feel manageable.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    {
      id: 4,
      name: "Katie S.",
      role: "Customer",
      company: "New York, NY",
      content:
        "I had a most delightful experience today. I was dreading this move to 3 different states. Along came Angel and Luis. They were professional, efficient, and kept me at ease the entire time.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    },
    {
      id: 5,
      name: "Ben R.",
      role: "Customer",
      company: "San Diego, CA",
      content:
        "Global was a great support to make our move so successful. The Move Consultant coached us through the process, assessed our needs, and matched us with the right services for our family.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    },
    {
      id: 6,
      name: "Thomas M.",
      role: "Customer",
      company: "Chicago, IL",
      content:
        "Great overall experience! Very friendly and helpful individuals that loaded and unloaded all of my goods and furniture. They were careful, on time, and communicative throughout the move.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
    {
      id: 7,
      name: "Emily S.",
      role: "Customer",
      company: "Bloomington, IN",
      content:
        "The move all around went very smoothly! Thank you so much for your consistent communication and patience answering all my questions along the way.",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    },
    {
      id: 8,
      name: "Christopher G.",
      role: "Customer",
      company: "Dallas, TX",
      content:
        "The movement of the goods was quick and efficient. Everything arrived when expected and the crew handled our belongings with care.",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop",
    },
  ];

  var activeIndex = 0;
  var intervalMs = 6000;
  var dotsEl = root.querySelector("[data-testimonial-dots]");
  var stageEl = root.querySelector("[data-testimonial-stage]");
  var starSvg =
    '<svg class="h-5 w-5 fill-yellow-500 text-yellow-500" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

  function buildCard(t, index) {
    var card = document.createElement("article");
    card.className = "testimonial-slide";
    card.setAttribute("data-slide-index", String(index));
    card.setAttribute("aria-hidden", index === 0 ? "false" : "true");

    var stars = "";
    for (var s = 0; s < 5; s++) stars += starSvg;

    card.innerHTML =
      '<div class="flex h-full flex-col rounded-xl border border-[#e5e7eb] bg-white p-8 shadow-lg">' +
      '<div class="mb-6 flex gap-2" aria-label="5 out of 5 stars">' +
      stars +
      "</div>" +
      '<div class="relative mb-6 flex-1">' +
      '<svg class="absolute -left-2 -top-2 h-8 w-8 text-[#16335B]/20 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 21c3 0 7-4 7-10V5"/><path d="M21 21c-3 0-7-4-7-10V5"/></svg>' +
      '<p class="relative z-10 text-lg font-medium leading-relaxed text-[#1A1A1A]">&ldquo;' +
      t.content +
      "&rdquo;</p></div>" +
      '<hr class="my-4 border-[#e5e7eb]" />' +
      '<div class="flex items-center gap-4">' +
      '<img src="' +
      t.avatar +
      '" alt="' +
      t.name +
      '" width="48" height="48" class="h-12 w-12 rounded-full border border-[#e5e7eb] object-cover" loading="lazy" decoding="async">' +
      "<div><h3 class=\"font-semibold text-[#1A1A1A]\">" +
      t.name +
      '</h3><p class="text-sm text-[#555555]">' +
      t.role +
      ", " +
      t.company +
      "</p></div></div></div>";

    return card;
  }

  function updateSlides() {
    var slides = stageEl.querySelectorAll(".testimonial-slide");
    slides.forEach(function (slide, i) {
      var active = i === activeIndex;
      slide.style.opacity = active ? "1" : "0";
      slide.style.transform = active
        ? "translateX(0) scale(1)"
        : "translateX(100px) scale(0.9)";
      slide.style.pointerEvents = active ? "auto" : "none";
      slide.style.zIndex = active ? "10" : "0";
      slide.setAttribute("aria-hidden", active ? "false" : "true");
    });

    var dots = dotsEl.querySelectorAll("[data-dot]");
    dots.forEach(function (dot, i) {
      if (i === activeIndex) {
        dot.className =
          "h-2.5 w-10 rounded-full bg-[#16335B] transition-all duration-300";
      } else {
        dot.className =
          "h-2.5 w-2.5 rounded-full bg-[#555555]/30 transition-all duration-300";
      }
      dot.setAttribute("aria-current", i === activeIndex ? "true" : "false");
    });
  }

  testimonials.forEach(function (t, i) {
    stageEl.appendChild(buildCard(t, i));
    var dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("data-dot", String(i));
    dot.setAttribute(
      "aria-label",
      "View testimonial " + (i + 1) + " from " + t.name
    );
    dot.addEventListener("click", function () {
      activeIndex = i;
      updateSlides();
    });
    dotsEl.appendChild(dot);
  });

  updateSlides();

  if (testimonials.length > 1) {
    setInterval(function () {
      activeIndex = (activeIndex + 1) % testimonials.length;
      updateSlides();
    }, intervalMs);
  }
})();
