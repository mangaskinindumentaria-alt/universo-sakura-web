const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();


/* Carrusel automático de la galería */
(() => {
  const carousel = document.querySelector(".gallery-carousel");
  if (!carousel) return;

  const viewport = carousel.querySelector(".gallery-viewport");
  const track = carousel.querySelector(".gallery-track");
  const slides = Array.from(track.children);
  const prev = carousel.querySelector(".gallery-prev");
  const next = carousel.querySelector(".gallery-next");
  const dotsWrap = carousel.querySelector(".gallery-dots");

  let index = 0;
  let timer = null;
  let visibleCount = 3;

  const getVisibleCount = () => {
    if (window.matchMedia("(max-width: 680px)").matches) return 1;
    if (window.matchMedia("(max-width: 900px)").matches) return 2;
    return 3;
  };

  const maxIndex = () => Math.max(0, slides.length - visibleCount);

  const buildDots = () => {
    dotsWrap.innerHTML = "";
    for (let i = 0; i <= maxIndex(); i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "gallery-dot";
      dot.setAttribute("aria-label", `Ir al grupo de obras ${i + 1}`);
      dot.addEventListener("click", () => {
        index = i;
        update();
        restart();
      });
      dotsWrap.appendChild(dot);
    }
  };

  const update = () => {
    visibleCount = getVisibleCount();
    index = Math.min(index, maxIndex());
    const target = slides[index];
    track.style.transform = `translateX(-${target.offsetLeft}px)`;

    Array.from(dotsWrap.children).forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
      dot.setAttribute("aria-current", i === index ? "true" : "false");
    });
  };

  const move = (direction) => {
    index += direction;
    if (index > maxIndex()) index = 0;
    if (index < 0) index = maxIndex();
    update();
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const start = () => {
    stop();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = window.setInterval(() => move(1), 5200);
    }
  };

  const restart = () => {
    start();
  };

  prev.addEventListener("click", () => { move(-1); restart(); });
  next.addEventListener("click", () => { move(1); restart(); });
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", start);

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      visibleCount = getVisibleCount();
      buildDots();
      update();
    }, 120);
  });

  buildDots();
  update();
  start();
})();

/* =================================
   CARRUSEL 02 / VARIETE
================================= */

(() => {
  const carousel = document.querySelector("#varieteCarousel");

  if (!carousel || carousel.dataset.initialized) return;
  carousel.dataset.initialized = "true";

  const track = carousel.querySelector(".variete-track");
  const slides = Array.from(track.children);
  const dotsContainer = carousel.querySelector(".variete-dots");
  const prev = carousel.querySelector(".variete-prev");
  const next = carousel.querySelector(".variete-next");

  let current = 0;
  let timer;
  let startX = 0;

  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = "variete-dot";
    dot.setAttribute("aria-label", `Ir a imagen ${index + 1}`);

    dot.addEventListener("click", () => {
      goTo(index);
      restart();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === current);
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    update();
  }

  function moveNext() {
    goTo(current + 1);
  }

  function movePrev() {
    goTo(current - 1);
  }

  function start() {
    stop();
    timer = setInterval(moveNext, 5200);
  }

  function stop() {
    clearInterval(timer);
  }

  function restart() {
    start();
  }

  next.addEventListener("click", () => {
    moveNext();
    restart();
  });

  prev.addEventListener("click", () => {
    movePrev();
    restart();
  });

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);

  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", start);

  // Deslizamiento táctil en celulares
  carousel.addEventListener("touchstart", (event) => {
    startX = event.changedTouches[0].clientX;
    stop();
  }, { passive: true });

  carousel.addEventListener("touchend", (event) => {
    const endX = event.changedTouches[0].clientX;
    const difference = startX - endX;

    if (Math.abs(difference) > 45) {
      difference > 0 ? moveNext() : movePrev();
    }

    start();
  }, { passive: true });

  update();
  start();
})();
