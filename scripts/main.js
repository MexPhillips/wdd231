const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true, type: "WDD" },
  { code: "WDD 131", name: "JavaScript Basics", credits: 2, completed: true, type: "WDD" },
  { code: "WDD 231", name: "Frontend Development", credits: 3, completed: false, type: "WDD" },
  { code: "CSE 110", name: "Intro to Programming", credits: 2, completed: true, type: "CSE" },
  { code: "CSE 210", name: "Data Structures", credits: 3, completed: false, type: "CSE" }
];

const courseContainer = document.getElementById("courses");
const totalCredits = document.getElementById("totalCredits");
const filterAll = document.getElementById("filterAll");
const filterWDD = document.getElementById("filterWDD");
const filterCSE = document.getElementById("filterCSE");

function renderCourses(courseList) {
  courseContainer.innerHTML = "";
  let credits = 0;

  courseList.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card" + (course.completed ? " completed" : "");
    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
      <p>Status: ${course.completed ? "✅ Completed" : "❌ Not Completed"}</p>
    `;
    courseContainer.appendChild(card);
    credits += course.credits;
  });

  totalCredits.textContent = `Total credits: ${credits}`;
}

// Initial render
renderCourses(courses);

// Filter logic
function setActive(button) {
  [filterAll, filterWDD, filterCSE].forEach(b => b.classList.remove("active"));
  button.classList.add("active");
}

filterAll.addEventListener("click", () => {
  renderCourses(courses);
  setActive(filterAll);
});

filterWDD.addEventListener("click", () => {
  const filtered = courses.filter(course => course.type === "WDD");
  renderCourses(filtered);
  setActive(filterWDD);
});

filterCSE.addEventListener("click", () => {
  const filtered = courses.filter(course => course.type === "CSE");
  renderCourses(filtered);
  setActive(filterCSE);
});

// Footer dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
