// main.js

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------
     Responsive Navigation
  ------------------------------ */
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  // Add ARIA attributes for accessibility
  menuToggle.setAttribute("aria-expanded", "false");
  nav.setAttribute("aria-hidden", "true");

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    // Update ARIA attributes dynamically
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    nav.setAttribute("aria-hidden", isOpen ? "false" : "true");
  });

  /* ------------------------------
     Footer Dates
  ------------------------------ */
  const yearSpan = document.getElementById("year");
  const currentYear = new Date().getFullYear();
  if (yearSpan) {
    yearSpan.textContent = currentYear;
  }

  const lastModified = document.getElementById("lastModified");
  if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
  }

  /* ------------------------------
     Course List & Filtering
  ------------------------------ */
  const courses = [
    { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true, type: "WDD" },
    { code: "WDD131", name: "Web Design & Development I", credits: 3, completed: true, type: "WDD" },
    { code: "WDD231", name: "Web Frontend Development I", credits: 3, completed: false, type: "WDD" },
    { code: "CSE110", name: "Introduction to Programming", credits: 2, completed: true, type: "CSE" },
    { code: "CSE210", name: "Programming with Classes", credits: 3, completed: false, type: "CSE" }
  ];

  const courseContainer = document.getElementById("courses");
  const creditsDisplay = document.getElementById("credits");

  function renderCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach(course => {
      const card = document.createElement("div");
      card.classList.add("course-card");
      if (course.completed) card.classList.add("completed");

      card.setAttribute("role", "article"); // accessibility role

      card.innerHTML = `
        <h3>${course.code}: ${course.name}</h3>
        <p>Credits: ${course.credits}</p>
        <p>Status: ${course.completed ? "✅ Completed" : "❌ Not Completed"}</p>
      `;

      courseContainer.appendChild(card);
    });

    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    creditsDisplay.textContent = `Total Credits: ${totalCredits}`;
  }

  // Filter buttons
  const filterAll = document.getElementById("filter-all");
  const filterWDD = document.getElementById("filter-wdd");
  const filterCSE = document.getElementById("filter-cse");

  // Add keyboard accessibility (Enter/Space triggers click)
  [filterAll, filterWDD, filterCSE].forEach(button => {
    button.setAttribute("role", "button");
    button.setAttribute("tabindex", "0");

    button.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        button.click();
      }
    });
  });

  filterAll.addEventListener("click", () => renderCourses(courses));
  filterWDD.addEventListener("click", () => renderCourses(courses.filter(c => c.type === "WDD")));
  filterCSE.addEventListener("click", () => renderCourses(courses.filter(c => c.type === "CSE")));

  // Initial render
  renderCourses(courses);
});
