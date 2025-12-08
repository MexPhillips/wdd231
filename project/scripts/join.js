document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("joinForm");
  const thankYouDiv = document.getElementById("thankYou");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("input[name='name']").value.trim();
      const email = form.querySelector("input[name='email']").value.trim();
      const city = form.querySelector("select[name='city']").value;
      const level = form.querySelector("input[name='level']:checked").value;

      if (name && email && city) {
        thankYouDiv.innerHTML = `<p>Thank you, ${name}! You're now part of the Arsenal community. Check your email at ${email} for confirmation and city updates from ${city}.</p>`;
        thankYouDiv.style.display = "block";
        form.style.display = "none";
      }
    });
  }
});
