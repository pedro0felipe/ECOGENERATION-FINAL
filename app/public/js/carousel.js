document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Organize slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current');
        targetSlide.classList.add('current');
    };

    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current');
        const nextSlide = currentSlide.nextElementSibling || slides[0];
        moveToSlide(currentSlide, nextSlide);
    });

    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current');
        const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
        moveToSlide(currentSlide, prevSlide);
    });

    // Rotação automática a cada 3 segundos
    setInterval(() => {
        const currentSlide = track.querySelector('.current');
        const nextSlide = currentSlide.nextElementSibling || slides[0];
        moveToSlide(currentSlide, nextSlide);
    }, 3000);
});