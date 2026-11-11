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


/* ==========================================
   CARRUSEL 02 / VARIETÉ
   Mismo funcionamiento que GALERÍA
========================================== */

(() => {
  const carousel = document.querySelector("#varieteCarousel");
  if (!carousel) return;

  const track = carousel.querySelector(".art-track");
  const slides = Array.from(track.children);
  const prev = carousel.querySelector(".art-prev");
  const next = carousel.querySelector(".art-next");
  const dotsWrap = carousel.querySelector(".art-dots");

  if (!track || !slides.length || !prev || !next || !dotsWrap) return;

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
      dot.className = "art-dot";
      dot.setAttribute("aria-label", `Ir al grupo de piezas ${i + 1}`);

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

    if (
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      maxIndex() > 0
    ) {
      timer = window.setInterval(() => move(1), 5200);
    }
  };

  const restart = () => start();

  prev.addEventListener("click", () => {
    move(-1);
    restart();
  });

  next.addEventListener("click", () => {
    move(1);
    restart();
  });

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
      start();
    }, 120);
  });

  visibleCount = getVisibleCount();
  buildDots();
  update();
  start();
})();

