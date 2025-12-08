document.addEventListener("DOMContentLoaded", () => {
  const cta = document.querySelector(".cta");
  const eventsSection = document.querySelector("section:nth-of-type(3)");

  if (cta && eventsSection) {
    cta.addEventListener("click", e => {
      e.preventDefault();
      eventsSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach(link => {
    if (link.getAttribute("href") === window.location.pathname.split("/").pop()) {
      link.setAttribute("aria-current", "page");
    }
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.cursor = "pointer";
    
    card.addEventListener("click", () => {
      const link = card.querySelector("a");
      if (link) {
        link.click();
      }
    });
    
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  const announce = document.createElement("div");
  announce.className = "announce";
  announce.textContent = "Next match: Arsenal vs Chelsea — Sat 19:30 EAT!";
  document.body.insertBefore(announce, document.body.firstChild);
});