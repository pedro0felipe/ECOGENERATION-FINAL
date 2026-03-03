document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const slides = track ? Array.from(track.children) : [];
    const nav = document.querySelector('.carousel-nav');
    if (!nav || !track || slides.length === 0) return;

    let indicators = [];
    let slideWidth = 0;
    let autoRotateId = null;

    const updateSizes = () => {
        slideWidth = slides[0].getBoundingClientRect().width || track.clientWidth;
        slides.forEach((slide, index) => {
            slide.style.left = `${slideWidth * index}px`;
        });
        const currentIndex = slides.findIndex(s => s.classList.contains('current'));
        const idx = currentIndex >= 0 ? currentIndex : 0;
        track.style.transform = `translateX(-${idx * slideWidth}px)`;
    };

    const updateIndicators = (newIndex) => {
        indicators.forEach((ind, i) => ind.classList.toggle('current', i === newIndex));
    };

    const moveToSlide = (currentSlide, targetSlide) => {
        const targetIndex = slides.indexOf(targetSlide);
        if (targetIndex === -1) return;
        track.style.transform = `translateX(-${targetIndex * slideWidth}px)`;
        if (currentSlide) currentSlide.classList.remove('current');
        targetSlide.classList.add('current');
        updateIndicators(targetIndex);
    };

    const startAutoRotate = () => {
        if (autoRotateId) clearInterval(autoRotateId);
        autoRotateId = setInterval(() => {
            const currentSlide = track.querySelector('.current') || slides[0];
            const next = currentSlide.nextElementSibling || slides[0];
            moveToSlide(currentSlide, next);
        }, 6000);
    };

    const buildIndicators = () => {
        nav.innerHTML = '';
        slides.forEach((_, index) => {
            const btn = document.createElement('button');
            btn.classList.add('carousel-indicator');
            btn.setAttribute('aria-label', `Slide ${index + 1}`);
            if (index === 0) btn.classList.add('current');
            btn.addEventListener('click', () => {
                const currentSlide = track.querySelector('.current') || slides[0];
                const target = slides[index];
                moveToSlide(currentSlide, target);
                startAutoRotate();
            });
            nav.appendChild(btn);
        });
        indicators = Array.from(nav.querySelectorAll('button'));
    };

    const init = () => {
        if (!track.querySelector('.current')) slides[0].classList.add('current');
        buildIndicators();
        updateSizes();
        startAutoRotate();
    };

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => updateSizes(), 120);
    });

    if (document.readyState === 'complete') init();
    else window.addEventListener('load', init);
});
