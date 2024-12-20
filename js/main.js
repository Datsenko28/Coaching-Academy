//
document.addEventListener("DOMContentLoaded", () => {
  const anchors = document.querySelectorAll('a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute("href").substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  // slider

  const cards = document.querySelectorAll(".testimonials__card");
  const dots = document.querySelectorAll(".slider__dot");
  const nextButton = document.querySelector(".slider__button--next");
  const prevButton = document.querySelector(".slider__button--prev");

  let currentIndex = 0;

  // Функція оновлення активних карток і індикаторів
  function updateSlider() {
    // Приховуємо всі картки
    cards.forEach((card, index) => {
      card.classList.toggle(
        "testimonials__card--active",
        index === currentIndex || index === (currentIndex + 1) % cards.length
      );
    });

    // Оновлюємо індикатори
    dots.forEach((dot, index) => {
      dot.classList.toggle("slider__dot--active", index === currentIndex);
      removeClass(prevButton, "active");
      removeClass(nextButton, "active");
    });
  }

  // Логіка кнопки "Далі"
  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length; // Зациклення вперед
    updateSlider();
    addClass(nextButton, "active");
  });

  // Логіка кнопки "Назад"
  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length; // Зациклення назад
    updateSlider();
    addClass(prevButton, "active");
  });

  function addClass(element, className) {
    element.classList.add(className);
  }
  function removeClass(element, className) {
    element.classList.remove(className);
  }

  // Ініціалізація слайдера при завантаженні
  updateSlider();
  // accordion-1

  const accordionButtons = document.querySelectorAll(".faq__acording-btn"); // Вибираємо всі кнопки
  const cardsAccordion = document.querySelectorAll(".faq__according-card"); // Вибираємо всі картки

  accordionButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      // Вибираємо картку, до якої належить кнопка
      const card = button.closest(".faq__according-card");
      const content = card.querySelector(".faq__according-content"); // Контент картки

      // Перевіряємо стан картки
      const isOpen = card.classList.contains("is-open");

      // Закриваємо всі картки
      cardsAccordion.forEach((otherCard) => {
        const otherButton = otherCard.querySelector(".faq__acording-btn");
        const otherContent = otherCard.querySelector(".faq__according-content");

        otherCard.classList.remove("is-open");
        otherButton.classList.remove("is-open");
        otherContent.style.maxHeight = null;
        otherCard.style.height = "100px"; // Скидаємо висоту до 100px
      });

      // Якщо поточна картка була закрита, відкриваємо її
      if (!isOpen) {
        card.classList.add("is-open");
        button.classList.add("is-open");
        content.style.maxHeight = content.scrollHeight + "px"; // Динамічний розрахунок висоти контенту
        card.style.height = "251px"; // Фіксована висота для відкритої картки
      }
    });
  });

  // Відкриваємо одну картку за замовчуванням
  const defaultCard = document.querySelector(".faq__according-card.is-open");
  if (defaultCard) {
    const defaultButton = defaultCard.querySelector(".faq__acording-btn");
    const defaultContent = defaultCard.querySelector(".faq__according-content");

    defaultContent.style.maxHeight = defaultContent.scrollHeight + "px"; // Динамічна висота
    defaultCard.style.height = "251px"; // Висота для відкритої картки
    defaultButton.classList.add("is-open");
  }
});
