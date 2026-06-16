// Luminé Salon Studio - Frontend Interactions

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const reveals = document.querySelectorAll(".reveal");
const cursorGlow = document.querySelector(".cursor-glow");
const form = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");
const year = document.getElementById("year");

// Set current year
if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile navigation
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navLinks.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navLinks.classList.remove("open");
    document.body.classList.remove("no-scroll");
  });
});

// Active navigation on scroll
function setActiveLink() {
  const scrollPosition = window.scrollY + 160;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (scrollPosition >= top && scrollPosition < top + height) {
      navItems.forEach((item) => item.classList.remove("active"));
      if (link) link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// Reveal elements on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach((item) => revealObserver.observe(item));

// Soft cursor glow
window.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;

  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

// Testimonial slider
const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
let testimonialIndex = 0;
let testimonialTimer;

function showTestimonial(index) {
  testimonials.forEach((testimonial) => testimonial.classList.remove("active"));

  testimonialIndex = (index + testimonials.length) % testimonials.length;
  testimonials[testimonialIndex].classList.add("active");
}

function nextTestimonial() {
  showTestimonial(testimonialIndex + 1);
}

function prevTestimonial() {
  showTestimonial(testimonialIndex - 1);
}

function startTestimonialAutoPlay() {
  testimonialTimer = setInterval(nextTestimonial, 5500);
}

function resetTestimonialAutoPlay() {
  clearInterval(testimonialTimer);
  startTestimonialAutoPlay();
}

if (testimonials.length && prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    prevTestimonial();
    resetTestimonialAutoPlay();
  });

  nextBtn.addEventListener("click", () => {
    nextTestimonial();
    resetTestimonialAutoPlay();
  });

  startTestimonialAutoPlay();
}

// Booking form demo validation
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const date = document.getElementById("date").value;
    const service = document.getElementById("service").value;

    if (!name || !phone || !date || !service) {
      formStatus.textContent = "Please fill all required fields before sending.";
      formStatus.style.color = "#ffb4c8";
      return;
    }

    formStatus.textContent = `Thank you, ${name}! Your ${service} request has been prepared.`;
    formStatus.style.color = "#65f0bc";

    form.reset();

    setTimeout(() => {
      formStatus.textContent = "";
    }, 6000);
  });
}

// Prevent selecting a past date
const dateInput = document.getElementById("date");

if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

// Header show/hide on scroll
let lastScroll = 0;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (!header) return;

  if (currentScroll > lastScroll && currentScroll > 450) {
    header.style.transform = "translateY(-120%)";
    header.style.opacity = "0";
  } else {
    header.style.transform = "translateY(0)";
    header.style.opacity = "1";
  }

  lastScroll = currentScroll;
});


// CK IT OPS demo loading screen
window.addEventListener("load", () => {
  const siteLoader = document.getElementById("siteLoader");

  if (!siteLoader) return;

  setTimeout(() => {
    siteLoader.classList.add("loader-hidden");
    document.body.classList.remove("loading-active");
  }, 8000);

  setTimeout(() => {
    siteLoader.remove();
  }, 8000);
});
