// Select DOM elements
const membersSection = document.getElementById('members');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');

// Load members from JSON
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

// Display members
function displayMembers(members) {
  membersSection.innerHTML = ''; // clear old content
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member');

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>Membership Level: ${formatLevel(member.membershipLevel)}</p>
    `;

    membersSection.appendChild(card);
  });
}

// Format membership level
function formatLevel(level) {
  switch(level) {
    case 1: return "Member";
    case 2: return "Silver";
    case 3: return "Gold";
    default: return "Unknown";
  }
}

// Toggle views
gridBtn.addEventListener('click', () => {
  document.body.classList.add('grid');
  document.body.classList.remove('list');
});

listBtn.addEventListener('click', () => {
  document.body.classList.add('list');
  document.body.classList.remove('grid');
});

// Initialize
loadMembers();
