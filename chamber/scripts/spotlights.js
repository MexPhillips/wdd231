// spotlights.js - Fetch members data and display random spotlights

// Fetch and display member spotlights
async function displaySpotlights() {
    const spotlightsContainer = document.getElementById('spotlights-container');
    
    try {
        // Fetch members data
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error('Members data not available');
        }

        const members = await response.json();

        // Filter for gold and silver members only
        const premiumMembers = members.filter(member => 
            member.membership.toLowerCase() === 'gold' || 
            member.membership.toLowerCase() === 'silver'
        );

        if (premiumMembers.length === 0) {
            spotlightsContainer.innerHTML = '<p class="loading">No premium members available for display.</p>';
            return;
        }

        // Randomly select 2-3 members
        const numberOfSpotlights = Math.min(
            Math.floor(Math.random() * 2) + 2, // Random between 2-3
            premiumMembers.length // Don't exceed available members
        );

        // Shuffle members and select random ones
        const selectedMembers = [];
        const availableIndices = [...Array(premiumMembers.length).keys()];
        
        for (let i = 0; i < numberOfSpotlights; i++) {
            const randomIndex = Math.floor(Math.random() * availableIndices.length);
            selectedMembers.push(premiumMembers[availableIndices[randomIndex]]);
            availableIndices.splice(randomIndex, 1);
        }

        // Build HTML for spotlights
        let spotlightsHTML = '';
        
        selectedMembers.forEach(member => {
            const membershipClass = member.membership.toLowerCase();
            spotlightsHTML += `
                <div class="spotlight-card">
                    <img src="${member.image}" alt="${member.name} logo" loading="lazy">
                    <h3>${member.name}</h3>
                    <div class="membership-badge ${membershipClass}">
                        ${member.membership.toUpperCase()} Member
                    </div>
                    <div class="spotlight-info">
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Address:</strong> ${member.address}</p>
                        <a href="${member.website}" target="_blank" class="spotlight-link">Visit Website →</a>
                    </div>
                </div>
            `;
        });

        spotlightsContainer.innerHTML = spotlightsHTML;

    } catch (error) {
        console.error('Error fetching spotlights:', error);
        spotlightsContainer.innerHTML = `
            <p class="loading">Unable to load member spotlights. Please ensure the members.json file exists in the data folder.</p>
        `;
    }
}

// Initialize spotlights display when DOM is loaded
document.addEventListener('DOMContentLoaded', displaySpotlights);
