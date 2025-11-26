// modals.js — handles membership benefits modal and timestamp autofill if needed
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  const benefits = {
    np: ['Newsletter listing', 'Access to public events'],
    bronze: ['Events', 'Basic training', 'Directory listing'],
    silver: ['Advertising credits', 'Member discounts', 'Priority event seating'],
    gold: ['Spotlight positions', 'Premium placement', 'Dedicated advertising', 'VIP events']
  };

  function openModal(level) {
    const items = benefits[level] || [];
    modalTitle.textContent = (level || '').toUpperCase() + ' Membership Benefits';
    modalBody.innerHTML = '<ul>' + items.map(i => `<li>${i}</li>`).join('') + '</ul>';
    modal.setAttribute('aria-hidden','false');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('aria-hidden','true');
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.details-link').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const level = a.dataset.level;
      openModal(level);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // Ensure timestamp field exists and fill if present (redundant safe check)
  const tsEl = document.getElementById('timestamp');
  if (tsEl && !tsEl.value) {
    tsEl.value = new Date().toISOString();
  }
});
