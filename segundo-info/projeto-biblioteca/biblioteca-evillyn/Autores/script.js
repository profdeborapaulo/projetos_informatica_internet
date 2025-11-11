// ==========================
// INICIALIZAÇÃO DO LOCOMOTIVE + GSAP
// ==========================
function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  // Atualiza ScrollTrigger com Locomotive
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  return locoScroll;
}

const locoScroll = locomotiveAnimation();

// ==========================
// NAVBAR ANIMAÇÃO
// ==========================
function navbarAnimation() {
  // Logo principal some com o scroll
  gsap.to("#nav-logo", {
    y: "-100%",
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });

  // Links do menu somem com o scroll
  gsap.to("#nav-part2 #links", {
    y: "-100%",
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });

  // Logo substituta aparece quando a principal some
  ScrollTrigger.create({
    trigger: "#page1",
    scroller: "#main",
    start: "top -5%",
    end: "bottom top",
    onEnter: () => {
      gsap.to("#logo-substituta", {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
      });
    },
    onLeaveBack: () => {
      gsap.to("#logo-substituta", {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      });
    },
  });
}

navbarAnimation();

// ==========================
// CURSOR ANIMAÇÃO
// ==========================
function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      left: dets.x,
      top: dets.y,
      duration: 0.2,
    });
  });

  document.querySelectorAll(".child").forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(1)",
        duration: 0.2,
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(0)",
        duration: 0.2,
      });
    });
  });
}

cursorAnimation();

// ==========================
// AOS (Animate On Scroll)
// ==========================
AOS.init({
  duration: 1000,
  once: true, // só anima 1 vez
});

// Atualiza AOS quando Locomotive Scroll é usado
locoScroll.on("scroll", AOS.refresh);
