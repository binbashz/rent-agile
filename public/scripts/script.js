// Obtén una referencia al elemento de superposición de texto y la caja de fondo
const textContainer = document.querySelector('.text-container');
const overlayText = document.querySelector('#overlay-text');

// Función para mostrar la superposición de texto y la caja de fondo
function showTextOverlay() {
    textContainer.style.display = 'block';
    overlayText.style.opacity = '1';
}

// Ocultar la caja de fondo y el texto al principio
textContainer.style.display = 'none';
overlayText.style.opacity = '0';

// Mostrar la superposición después de un retraso (por ejemplo, 2 segundos)
setTimeout(showTextOverlay, 2000);

// script para el slider del index, galería de autos
let slideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slider-item');
    
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach((slide, i) => {
        if (i === slideIndex) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

// Iniciar slider automáticamente
setInterval(nextSlide, 2000); // Cambiar cada 2 segundos

// Mostrar el primer slide al cargar la página
showSlide(slideIndex);
