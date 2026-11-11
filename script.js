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


/* ==========================================
   CARRUSEL 02 / VARIETE
   Mismo comportamiento que GALERIA
========================================== */

(() => {
  const carousel = document.querySelector("#varieteCarousel");

  if (!carousel || carousel.dataset.initialized) return;
  carousel.dataset.initialized = "true";

  const track = carousel.querySelector(".art-track");
  const slides = Array.from(track.children);
  const prev = carousel.querySelector(".art-prev");
  const next = carousel.querySelector(".art-next");
  const dotsContainer = carousel.querySelector(".art-dots");

  let current = 0;
  let timer = null;
  let visible = 3;

  function getVisible() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, slides.length - visible);
  }

  function createDots() {
    dotsContainer.innerHTML = "";

    for (let i = 0; i <= getMaxIndex(); i++) {
      const dot = document.createElement("button");

      dot.className = "art-dot";
      dot.setAttribute("aria-label", `Ir a posición ${i + 1}`);

      dot.addEventListener("click", () => {
        current = i;
        update();
        restart();
      });

      dotsContainer.appendChild(dot);
    }
  }

  function update() {
    const slideWidth = 100 / visible;

    track.style.transform =
      `translateX(-${current * slideWidth}%)`;

    const dots = dotsContainer.querySelectorAll(".art-dot");

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === current);
    });
  }

  function moveNext() {
    current = current >= getMaxIndex() ? 0 : current + 1;
    update();
  }

  function movePrev() {
    current = current <= 0 ? getMaxIndex() : current - 1;
    update();
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  function start() {
    stop();

    if (getMaxIndex() === 0) return;

    timer = setInterval(moveNext, 5200);
  }

  function restart() {
    start();
  }

  prev.addEventListener("click", () => {
    movePrev();
    restart();
  });

  next.addEventListener("click", () => {
    moveNext();
    restart();
  });

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);

  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", start);

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      visible = getVisible();
      current = Math.min(current, getMaxIndex());

      createDots();
      update();
      start();
    }, 150);
  });

  visible = getVisible();
  createDots();
  update();
  start();

})();

