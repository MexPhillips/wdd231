document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("events-container");
  
  // Image rotation sets discovered in project/images/
  // Only include files that actually exist in the workspace; other events will fall back to their
  // `image` property from `data/events.json` (or the placeholder behavior).
  const imageRotations = {
    1: [
      "images/event1-img1.jpeg",
      "images/event1-img2.jpeg",
      "images/event1-img3.jpeg"
    ],
    2: [
      "images/event2-img1.jpeg",
      "images/event2-img2.jpeg",
      "images/event2-img3.jpeg"
    ]
  };

  // Added mapping for event 3 images found in project/images
  imageRotations[3] = [
    "images/event3-img1.jpeg",
    "images/event3-img2.jpeg",
    "images/event3-img3.jpeg"
  ];

  fetch("data/events.json")
    .then(response => response.json())
    .then(events => {
      events.forEach((event) => {
        const article = document.createElement("article");
        article.className = "card";
        article.style.cursor = "pointer";
        article.tabIndex = 0;
        
        const dateObj = new Date(event.date);
        const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
        const img = document.createElement("img");
        
        // Get image rotation set or use fallback
        const imageSet = imageRotations[event.id] || [event.image];
        let currentImageIndex = 0;
        img.src = imageSet[currentImageIndex];
        img.alt = event.title;
        img.className = "thumb";
        img.style.cssText = "width: 100%; height: 200px; object-fit: cover; border-radius: 6px; margin-bottom: 0.75rem; transition: opacity 0.5s ease;";
        
        article.innerHTML = `
          <h3>${event.title}</h3>
          <p>${dayName}, ${event.time} ${event.timezone} • ${event.location}</p>
          <p>${event.description}</p>
          <form class="form" aria-label="RSVP for ${event.title}">
            <input class="input" type="text" name="name" placeholder="Your name" aria-label="Your name" required />
            <input class="input" type="tel" name="phone" placeholder="Phone (for updates)" aria-label="Phone" required />
            <button class="btn secondary" type="button">RSVP</button>
          </form>
        `;
        
        article.insertBefore(img, article.firstChild);
        
        // Rotate images every 10 seconds
        setInterval(() => {
          currentImageIndex = (currentImageIndex + 1) % imageSet.length;
          img.style.opacity = "0.5";
          setTimeout(() => {
            img.src = imageSet[currentImageIndex];
            img.style.opacity = "1";
          }, 250);
        }, 10000);
        
        const form = article.querySelector(".form");
        const button = form.querySelector("button");
        
        button.addEventListener("click", (e) => {
          e.stopPropagation();
          const name = form.querySelector("input[name='name']").value.trim();
          const phone = form.querySelector("input[name='phone']").value.trim();
          
          if (name && phone) {
            form.innerHTML = `<p style="color: green; font-weight: bold;">Thanks ${name}! You're confirmed. We'll send updates to ${phone}.</p>`;
          }
        });
        
        article.addEventListener("click", () => {
          form.querySelector("button").focus();
        });
        
        article.addEventListener("keypress", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            form.querySelector("button").focus();
          }
        });
        
        container.appendChild(article);
      });
    })
    .catch(error => console.error("Error loading events:", error));
});