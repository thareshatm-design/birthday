import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Multi-tier fireworks explosion in romantic tones
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#e11d48', '#fb7185', '#fda4af', '#f43f5e'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#f59e0b', '#fbbf24', '#fef08a'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#ffffff', '#ffe4e6', '#ec4899', '#f472b6'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#fbbf24', '#e11d48'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#fda4af', '#f43f5e', '#fb7185'],
  });
}

export function fireHeartShower() {
  const end = Date.now() + 2.5 * 1000;
  const colors = ['#e11d48', '#f43f5e', '#fb7185', '#fbcfe8', '#fbbf24'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
