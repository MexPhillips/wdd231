document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("resources-container");

  fetch("data/resources.json")
    .then(response => response.json())
    .then(resources => {
      resources.forEach(resource => {
        const article = document.createElement("article");
        article.className = "card";
        article.style.cursor = "pointer";
        article.tabIndex = 0;
        
        const isExternal = resource.url.startsWith("http") || resource.url.startsWith("https");
        const link = isExternal 
          ? `<a href="${resource.url}" target="_blank" aria-label="Open ${resource.title}">${resource.title}</a>` 
          : resource.title;
        
        article.innerHTML = `
          <h2>${resource.icon} ${link}</h2>
          <p>${resource.description}</p>
        `;
        
        article.addEventListener("click", () => {
          const externalLink = article.querySelector("a");
          if (externalLink) {
            externalLink.click();
          }
        });
        
        article.addEventListener("keypress", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            article.click();
          }
        });
        
        container.appendChild(article);
      });
    })
    .catch(error => console.error("Error loading resources:", error));
});
