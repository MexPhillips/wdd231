async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    
    const spotlightMembers = members.filter(m => m.membership === "Gold" || m.membership === "Silver");

    
    const selected = [];
    while (selected.length < 3 && spotlightMembers.length > 0) {
      const index = Math.floor(Math.random() * spotlightMembers.length);
      selected.push(spotlightMembers.splice(index, 1)[0]);
    }

    const container = document.getElementById("spotlight-container");
    container.innerHTML = selected.map(m => `
      <div class="spotlight">
        <img src="${m.image}" alt="${m.name}">
        <h3>${m.name}</h3>
        <p>${m.phone}</p>
        <p>${m.address}</p>
        <a href="${m.website}" target="_blank">Visit Website</a>
        <p>Membership: ${m.membership}</p>
      </div>
    `).join("");
  } catch (error) {
    document.getElementById("spotlight-container").textContent = "Error loading member spotlights.";
  }
}

loadSpotlights();
