const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slider-slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const pagination = document.querySelector('.pagination');

// Variables para el estado del slider
let currentIndex = 1; // Start from the first actual slide
const slideWidth = slides[0].clientWidth;
let interval;

// Clonar el primer y último slide
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);

// Agregar los clones al DOM
sliderWrapper.appendChild(firstSlideClone); // Añadir al final
sliderWrapper.insertBefore(lastSlideClone, slides[0]); // Añadir al inicio

// Establecer la posición inicial del slider
sliderWrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

// Función para mover al siguiente slide
const moveToNextSlide = () => {
  sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
  currentIndex++;
  sliderWrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

  if (currentIndex === slides.length + 1) {
    setTimeout(() => {
      sliderWrapper.style.transition = 'none';
      currentIndex = 1;
      sliderWrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }, 500); // Ajuste de tiempo para hacer la transición más suave
  }

  updatePagination();
};

// Función para mover al slide anterior
const moveToPrevSlide = () => {
  sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
  currentIndex--;
  sliderWrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

  if (currentIndex === 0) {
    setTimeout(() => {
      sliderWrapper.style.transition = 'none';
      currentIndex = slides.length;
      sliderWrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }, 500); // Ajuste de tiempo para hacer la transición más suave
  }

  updatePagination();
};

// Agregar evento a los botones
nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPrevSlide);

// Actualizar la paginación
const createPaginationDots = () => {
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    pagination.appendChild(dot);
  }
};

const updatePagination = () => {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === (currentIndex - 1 + slides.length) % slides.length) {
      dot.classList.add('active');
    }
  });
};

createPaginationDots();
updatePagination();

// Autoplay del slider
const startAutoplay = () => {
  interval = setInterval(moveToNextSlide, 5000); // Tiempo de autoplay
};

startAutoplay();



// const stopAutoplay = () => {
//   clearInterval(interval);
// };


// Detener el autoplay cuando el mouse esté sobre el slider
// document.querySelector('.slider').addEventListener('mouseenter', stopAutoplay);

// Reanudar el autoplay cuando el mouse se vaya
// document.querySelector('.slider').addEventListener('mouseleave', startAutoplay);
