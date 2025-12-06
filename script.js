document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {

    const answer = button.nextElementSibling;

    // Закриваємо інші відкриті
    document.querySelectorAll('.faq-question.active').forEach(activeBtn => {
      if (activeBtn !== button) {
        activeBtn.classList.remove('active');
        activeBtn.nextElementSibling.style.maxHeight = null;
      }
    });

    // Перемикаємо поточний
    button.classList.toggle('active');
    
    if (button.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});

// ---------- Слайдер тарифів ----------
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.tariff-card');
  const prevBtn = document.querySelector('.tariff-prev');
  const nextBtn = document.querySelector('.tariff-next');
  const dots = document.querySelectorAll('.tariff-dots .dot');

  if (!cards.length || !prevBtn || !nextBtn) return;

  let current = 0;

  function showTariff(index) {
    current = (index + cards.length) % cards.length;

    cards.forEach((card, i) => {
      card.classList.toggle('active', i === current);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => {
    showTariff(current - 1);
  });

  nextBtn.addEventListener('click', () => {
    showTariff(current + 1);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index);
      showTariff(index);
    });
  });
});