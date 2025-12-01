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
