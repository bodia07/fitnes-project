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

// ---------- Слайдер відгуків (авто + кнопки) ----------
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.reviews-slider');
  const track = document.querySelector('.reviews-track');

  if (!slider || !track) return;

  const slides = Array.from(track.children);
  if (slides.length < 2) return;

  const gap = 20; // має збігатися з CSS gap: 20px
  let perView = 2;
  let index = 0;
  let intervalId = null;

  const prevBtn = slider.querySelector('.reviews-btn.prev');
  const nextBtn = slider.querySelector('.reviews-btn.next');

  function calcPerView() {
    perView = window.innerWidth <= 992 ? 1 : 2;
  }

  function slideStep() {
    const first = track.querySelector('.review-slide');
    if (!first) return 0;
    return first.getBoundingClientRect().width + gap;
  }

  function maxIndex() {
    return Math.max(0, slides.length - perView);
  }

  function goTo(newIndex) {
    index = newIndex;

    const max = maxIndex();
    if (index > max) index = 0;
    if (index < 0) index = max;

    const x = -(index * slideStep());
    track.style.transform = `translateX(${x}px)`;
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function startAuto() {
    stopAuto();
    intervalId = setInterval(next, 20000); // 20 секунд
  }

  function stopAuto() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  }

  // Пауза при hover (комп)
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  // Кнопки
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAuto();
      prev();
      startAuto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAuto();
      next();
      startAuto();
    });
  }

  // Resize перерахунок
  window.addEventListener('resize', () => {
    calcPerView();
    goTo(index);
  });

  // init
  calcPerView();
  goTo(0);
  startAuto();
});

// ---------- Слайдер додаткових послуг (як тарифи) ----------
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.extra-card');
  const prevBtn = document.querySelector('.extra-prev');
  const nextBtn = document.querySelector('.extra-next');
  const dots = document.querySelectorAll('.extra-dots .dot');

  if (!cards.length || !prevBtn || !nextBtn) return;

  let current = 0;

  function showExtra(index) {
    current = (index + cards.length) % cards.length;

    cards.forEach((card, i) => {
      card.classList.toggle('active', i === current);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => {
    showExtra(current - 1);
  });

  nextBtn.addEventListener('click', () => {
    showExtra(current + 1);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index);
      showExtra(index);
    });
  });
});
