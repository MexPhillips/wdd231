async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    const members = data.members || [];

    // Pick Gold (membershipLevel 3) and Silver (membershipLevel 2)
    const spotlightMembers = members.filter(m => m.membershipLevel >= 2);

    const selected = [];
    const pool = [...spotlightMembers];
    while (selected.length < 3 && pool.length > 0) {
      const index = Math.floor(Math.random() * pool.length);
      selected.push(pool.splice(index, 1)[0]);
    }

    const container = document.getElementById("spotlight-container");
    if (!container) return;

    if (selected.length === 0) {
      container.innerHTML = '<p>No featured members available at this time.</p>';
    } else {
      // use a fallback image for missing logos (relative to chamber page -> ../images/logo.svg)
      const fallback = '../images/logo.svg';
      container.innerHTML = selected.map(m => `
        <div class="spotlight">
          <img src="${m.image}" alt="${m.name} logo" onerror="this.onerror=null;this.src='${fallback}';">
          <h3>${m.name}</h3>
          <p>${m.phone}</p>
          <p>${m.address}</p>
          <a href="${m.website}" target="_blank" rel="noopener">Visit Website</a>
          <p>Membership: ${m.membershipLevel === 3 ? 'Gold' : m.membershipLevel === 2 ? 'Silver' : 'Member'}</p>
        </div>
      `).join("");
    }
  } catch (error) {
    const container = document.getElementById("spotlight-container");
    if (container) container.textContent = "Error loading member spotlights.";
    console.error("Error loading spotlights:", error);
  }
}

// Footer year + last modified helper
function setFooterMeta() {
  const yearEl = document.getElementById('year');
  const lmEl = document.getElementById('lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lmEl) lmEl.textContent = document.lastModified;
}

document.addEventListener('DOMContentLoaded', () => {
  loadSpotlights();
  setFooterMeta();
});
