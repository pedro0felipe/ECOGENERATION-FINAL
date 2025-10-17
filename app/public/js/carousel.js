// código separado para o carrossel (defer no HTML)
(function () {
  const carousel = document.querySelector('.fases');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  let slides = Array.from(track.children);
  if (!slides.length) return;

  // seletor com fallback caso a classe não seja encontrada
  const prev = carousel.querySelector('.carousel-btn--left') || carousel.querySelector('[aria-label="Anterior"]');
  const next = carousel.querySelector('.carousel-btn--right') || carousel.querySelector('[aria-label="Próximo"]');
  const nav = carousel.querySelector('.carousel-nav');

  // handler reutilizável
  const goPrev = () => { moveToIndex(current - 1); resetAutoplay(); };
  const goNext = () => { moveToIndex(current + 1); resetAutoplay(); };

  // ligações robustas para o botão anterior (click + pointerdown + teclado) e fallback global
  if (prev) {
    prev.addEventListener('click', goPrev);
    prev.addEventListener('pointerdown', goPrev); // cobre pointer/touch em alguns navegadores
    prev.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goPrev(); }
    });
  } else {
    const fallbackPrev = document.querySelector('.carousel-btn--left, [aria-label="Anterior"]');
    if (fallbackPrev) {
      fallbackPrev.addEventListener('click', goPrev);
      fallbackPrev.addEventListener('pointerdown', goPrev);
    }
  }

  // botão próximo (já funcional) com mesma robustez
  if (next) {
    next.addEventListener('click', goNext);
    next.addEventListener('pointerdown', goNext);
    next.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goNext(); }
    });
  } else {
    const fallbackNext = document.querySelector('.carousel-btn--right, [aria-label="Próximo"]');
    if (fallbackNext) {
      fallbackNext.addEventListener('click', goNext);
      fallbackNext.addEventListener('pointerdown', goNext);
    }
  }

  // Clona primeiro e último para loop contínuo suave
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  // atualizar slides após clonagem
  slides = Array.from(track.children);
  const originalCount = slides.length - 2; // sem os clones

  // criar indicadores (somente para slides originais)
  for (let i = 0; i < originalCount; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.index = i;
    btn.setAttribute('aria-label', 'Ir para slide ' + (i + 1));
    if (i === 0) btn.classList.add('is-selected');
    nav.appendChild(btn);
  }
  const indicators = Array.from(nav.children);

  let current = 1; // começa no primeiro slide real (índice 1 por causa do lastClone)
  const AUTOPLAY_INTERVAL = 4000; // 4s
  let autoplayId = null;

  const getSlideWidth = () => slides[0].getBoundingClientRect().width;

  const setTransition = (on = true) => {
    track.style.transition = on ? 'transform 300ms ease' : 'none';
  };

  const updateIndicators = (realIndex) => {
    indicators.forEach((b, i) => b.classList.toggle('is-selected', i === realIndex));
  };

  const updateA11y = (realIndex) => {
    // marca aria-hidden para slides originais; clones ficam hidden
    slides.forEach((s, i) => {
      const isClone = (i === 0) || (i === slides.length - 1);
      if (isClone) s.setAttribute('aria-hidden', 'true');
      else s.setAttribute('aria-hidden', (i - 1 === realIndex) ? 'false' : 'true');
    });
    updateIndicators(realIndex);
  };

  const moveToIndex = (index, withTransition = true) => {
    const w = getSlideWidth();
    setTransition(withTransition);
    track.style.transform = `translateX(-${w * index}px)`;
    current = index;
  };

  // Ao terminar a transição, se estamos em um clone, saltamos sem transição
  track.addEventListener('transitionend', () => {
    if (current === 0) {
      // moved to lastClone -> jump to last real
      setTransition(false);
      current = slides.length - 2;
      moveToIndex(current, false);
    } else if (current === slides.length - 1) {
      // moved to firstClone -> jump to first real
      setTransition(false);
      current = 1;
      moveToIndex(current, false);
    }
    // atualiza indicadores / a11y com índice real (current - 1)
    updateA11y(current - 1);
  });

  // controles (com suporte a teclado)
  prev && prev.addEventListener('click', () => { moveToIndex(current - 1); resetAutoplay(); });
  next && next.addEventListener('click', () => { moveToIndex(current + 1); resetAutoplay(); });

  // permitir ativar com Enter / Space (acessibilidade)
  if (prev) {
    prev.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        moveToIndex(current - 1);
        resetAutoplay();
      }
    });
  }
  if (next) {
    next.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        moveToIndex(current + 1);
        resetAutoplay();
      }
    });
  }

  indicators.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetReal = Number(e.currentTarget.dataset.index); // 0..originalCount-1
      const targetIndex = targetReal + 1; // mapear para índice em slides (contando clone no início)
      moveToIndex(targetIndex);
      resetAutoplay();
    });
  });

  // swipe/touch
  let startX = 0, deltaX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; pauseAutoplay(); }, {passive: true});
  track.addEventListener('touchmove', e => { deltaX = e.touches[0].clientX - startX; }, {passive: true});
  track.addEventListener('touchend', () => {
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) moveToIndex(current + 1);
      else moveToIndex(current - 1);
    }
    startX = 0; deltaX = 0;
    resetAutoplay();
  });

  // autoplay contínuo infinito
  function startAutoplay() {
    if (autoplayId) return;
    autoplayId = setInterval(() => {
      moveToIndex(current + 1);
    }, AUTOPLAY_INTERVAL);
  }
  function pauseAutoplay() {
    if (autoplayId) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  }
  function resetAutoplay() {
    pauseAutoplay();
    startAutoplay();
  }

  // inicialização: posiciona no primeiro slide real e configura a11y
  // usado after next frame para garantir width calculado
  requestAnimationFrame(() => {
    setTransition(false);
    moveToIndex(1, false);
    updateA11y(0);
    // small timeout to re-enable transitions smoothly
    setTimeout(() => setTransition(true), 50);
    startAutoplay();
  });
})()