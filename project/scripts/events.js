document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("events-container");
  
  // Image rotation sets auto-detected from project/images/
  // Events not listed fall back to their `image` property from `data/events.json`
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
    ],
    3: [
      "images/event3-img1.jpeg",
      "images/event3-img2.jpeg",
      "images/event3-img3.jpeg"
    ],
    4: [
      "images/event4-img1.jpeg",
      "images/event4-img2.jpeg",
      "images/event4-img3.jpeg"
    ],
    5: [
      "images/event5-img1.jpeg",
      "images/event5-img2.jpeg",
      "images/event5-img3.jpeg"
    ],
    6: [
      "images/event6-img1.jpeg",
      "images/event6-img2.jpeg",
      "images/event6-img3.jpeg"
    ]
  };

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
            <input class="input" type="email" name="email" placeholder="Email address" aria-label="Email" required />
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
          const email = form.querySelector("input[name='email']").value.trim();
          const phone = form.querySelector("input[name='phone']").value.trim();
          
          // Strict email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isValidEmail = emailRegex.test(email);
          
          if (name && email && phone && isValidEmail) {
            form.innerHTML = `<p style="color: green; font-weight: bold;">Thanks ${name}! You're confirmed. Confirmation sent to ${email}.</p>`;
          } else if (!isValidEmail && email) {
            alert("Please enter a valid email address.");
          } else {
            alert("Please fill in all fields correctly.");
          }
        });
        
        // Add click handlers to inputs to prevent card click interference
        const inputs = form.querySelectorAll("input");
        inputs.forEach(input => {
          input.addEventListener("click", (e) => {
            e.stopPropagation();
          });
          input.addEventListener("keydown", (e) => {
            e.stopPropagation();
          });
          input.addEventListener("keyup", (e) => {
            e.stopPropagation();
          });
        });
        
        article.addEventListener("click", (e) => {
          // Only focus button if clicking on the card itself, not on form elements
          if (!e.target.closest(".form")) {
            form.querySelector("button").focus();
          }
        });
        
        article.addEventListener("keypress", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            form.querySelector("button").focus();
          }
        });
        
        container.appendChild(article);
      });

      // Populate past events section with rotating images
      const pastEventCards = document.querySelectorAll(".section.soft .card");
      const pastImageSets = [
        ["images/event1-img1.jpeg", "images/event1-img2.jpeg", "images/event1-img3.jpeg"],
        ["images/event2-img1.jpeg", "images/event2-img2.jpeg", "images/event2-img3.jpeg"],
        ["images/event3-img1.jpeg", "images/event3-img2.jpeg", "images/event3-img3.jpeg"]
      ];

      pastEventCards.forEach((card, index) => {
        const imageSet = pastImageSets[index] || [];
        if (imageSet.length > 0) {
          let currentImageIndex = 0;
          const img = document.createElement("img");
          img.alt = card.querySelector("figcaption")?.textContent || "Past event";
          img.style.cssText = "width: 100%; height: 200px; object-fit: cover; border-radius: 6px; margin-bottom: 0.75rem; display: block; transition: opacity 0.5s ease;";
          img.src = imageSet[currentImageIndex];
          
          // Insert image at the beginning of the card
          card.insertBefore(img, card.firstChild);

          // Rotate images every 10 seconds
          setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % imageSet.length;
            img.style.opacity = "0.5";
            setTimeout(() => {
              img.src = imageSet[currentImageIndex];
              img.style.opacity = "1";
            }, 250);
          }, 10000);
        }
      });
    })
    .catch(error => console.error("Error loading events:", error));
});