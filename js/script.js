/**
 * STUDIO DIGITAL EXPERIENCE — IBU DEWI ARNI, S.Pd.
 * Hari Guru Nasional 2026 • 11 RPL B SMKN 1 Cimahi
 * Interactive Logic: Constellation Canvas, 3D Parallax Tilt, Web Audio Synth, Terminal, Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. STATE & CORE ELEMENTS
  // =========================================================================
  const monolithScreen = document.getElementById('monolith-screen');
  const monolithTrigger = document.getElementById('monolith-trigger');
  const btnEnterStudio = document.getElementById('btn-enter-studio');
  const studioApp = document.getElementById('studio-app');

  const btnToggleAudio = document.getElementById('btn-toggle-audio');
  const audioStateIcon = document.getElementById('audio-state-icon');
  const audioSubtitle = document.getElementById('audio-subtitle');
  const heroTiltCard = document.getElementById('hero-tilt-card');

  const formTerminal = document.getElementById('form-terminal');
  const termLogsContainer = document.getElementById('term-logs-container');
  const terminalOutput = document.getElementById('terminal-output');

  const btnBloomRose = document.getElementById('btn-bloom-rose');
  const roseCounterStat = document.getElementById('rose-counter-stat');
  const bloomingCenter = document.getElementById('blooming-center');

  const studioLightbox = document.getElementById('studio-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  let isAudioPlaying = false;
  let audioCtx = null;
  let bgmInterval = null;

  // =========================================================================
  // 2. PROCEDURAL NEOCLASSICAL PIANO SYNTHESIZER (WEB AUDIO API)
  // =========================================================================
  // Melodi piano lembut arpeggio beresonansi hangat (C major / A minor / F major / G major)
  const pianoHarmonies = [
    // Frequencies (Hz)
    [261.63, 329.63, 392.00, 523.25], // C - E - G - C
    [220.00, 261.63, 329.63, 440.00], // A - C - E - A
    [174.61, 261.63, 349.23, 523.25], // F - C - F - C
    [196.00, 293.66, 392.00, 587.33], // G - D - G - D
    [261.63, 392.00, 523.25, 659.25], // C - G - C - E
    [349.23, 440.00, 523.25, 698.46]  // F - A - C - F
  ];

  let chordIndex = 0;
  let noteInChord = 0;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playAcousticNote(freq, duration = 2.2, gainPeak = 0.14) {
    if (!audioCtx) return;
    try {
      const now = audioCtx.currentTime;

      // Primary oscillator (Warm Triangle)
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Soft Sine Overtone for crystalline luster
      const sub = audioCtx.createOscillator();
      const subGain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      sub.type = 'sine';
      sub.frequency.setValueAtTime(freq * 2, now);

      // Natural Envelope
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(gainPeak, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.linearRampToValueAtTime(gainPeak * 0.3, now + 0.02);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.7));

      osc.connect(gain);
      sub.connect(subGain);
      gain.connect(audioCtx.destination);
      subGain.connect(audioCtx.destination);

      osc.start(now);
      sub.start(now);
      osc.stop(now + duration);
      sub.stop(now + duration);
    } catch (e) {}
  }

  function playChimeBell() {
    initAudioContext();
    if (!audioCtx) return;
    const chimeFreqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chimeFreqs.forEach((freq, idx) => {
      setTimeout(() => {
        playAcousticNote(freq, 2.4, 0.16);
      }, idx * 75);
    });
  }

  function startBGM() {
    initAudioContext();
    isAudioPlaying = true;
    btnToggleAudio.classList.add('playing');
    audioStateIcon.textContent = '⏸';
    audioSubtitle.textContent = 'Memutar melodi piano';

    if (bgmInterval) clearInterval(bgmInterval);

    // Initial chord tone
    playAcousticNote(pianoHarmonies[0][0], 3.0, 0.18);

    bgmInterval = setInterval(() => {
      const currentChord = pianoHarmonies[chordIndex];
      const freq = currentChord[noteInChord];

      playAcousticNote(freq, 2.5, 0.13);

      noteInChord++;
      if (noteInChord >= currentChord.length) {
        noteInChord = 0;
        chordIndex = (chordIndex + 1) % pianoHarmonies.length;
        // Deep bass anchor note
        playAcousticNote(pianoHarmonies[chordIndex][0] / 2, 3.5, 0.1);
      }
    }, 620);
  }

  function pauseBGM() {
    isAudioPlaying = false;
    btnToggleAudio.classList.remove('playing');
    audioStateIcon.textContent = '▶';
    audioSubtitle.textContent = 'Musik dijeda';
    if (bgmInterval) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
  }

  btnToggleAudio.addEventListener('click', () => {
    if (isAudioPlaying) {
      pauseBGM();
    } else {
      startBGM();
    }
  });

  // =========================================================================
  // 3. HOLOGRAPHIC MONOLITH OPENING CEREMONY
  // =========================================================================
  function unlockStudioExperience() {
    playChimeBell();
    createShockwaveParticles(window.innerWidth / 2, window.innerHeight / 2, 40);

    setTimeout(() => {
      startBGM();
    }, 350);

    setTimeout(() => {
      monolithScreen.classList.add('revealed');
      studioApp.classList.remove('hidden-experience');
      studioApp.classList.add('active-experience');
    }, 800);
  }

  monolithTrigger.addEventListener('click', unlockStudioExperience);
  btnEnterStudio.addEventListener('click', unlockStudioExperience);

  // =========================================================================
  // 4. INTERACTIVE CONSTELLATION & FLUID CANVAS SIMULATION
  // =========================================================================
  const canvas = document.getElementById('space-canvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 65;

  class CosmicParticle {
    constructor(x, y, isBurst = false) {
      this.reset(x, y, isBurst);
    }

    reset(x, y, isBurst = false) {
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : Math.random() * height;
      this.size = Math.random() * 2.5 + 1.2;

      if (isBurst) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 8 + 3;
        this.vx = Math.cos(angle) * velocity;
        this.vy = Math.sin(angle) * velocity;
      } else {
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
      }

      const colors = ['#FF4D80', '#E040FB', '#00E676', '#FFD54F', '#FFFFFF'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new CosmicParticle());
  }

  function createShockwaveParticles(originX, originY, count = 30) {
    for (let i = 0; i < count; i++) {
      const p = new CosmicParticle(originX, originY, true);
      particles.push(p);
      if (particles.length > particleCount + 40) {
        particles.shift();
      }
    }
  }

  function renderCosmicScene() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting laser threads
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 110) * 0.25;
          ctx.strokeStyle = '#FF4D80';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(renderCosmicScene);
  }
  requestAnimationFrame(renderCosmicScene);

  // =========================================================================
  // 5. 3D PARALLAX TILT WITH CURSOR TRACKING ON HERO CARD
  // =========================================================================
  if (heroTiltCard) {
    const glare = heroTiltCard.querySelector('.tilt-card-glare');

    heroTiltCard.addEventListener('mousemove', (e) => {
      const rect = heroTiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      heroTiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      if (glare) {
        glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255, 255, 255, 0.22) 0%, transparent 65%)`;
      }
    });

    heroTiltCard.addEventListener('mouseleave', () => {
      heroTiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (glare) {
        glare.style.background = 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.15) 0%, transparent 70%)';
      }
    });
  }

  // =========================================================================
  // 6. INTERACTIVE DEVELOPER TERMINAL CONSOLE
  // =========================================================================
  // Load saved custom logs from localStorage
  const savedTerminalLogs = JSON.parse(localStorage.getItem('hgn_rplb_terminal_logs') || '[]');
  savedTerminalLogs.forEach(item => {
    appendLogToTerminal(item.author, item.msg, false);
  });

  formTerminal.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputAuthor = document.getElementById('terminal-input-author');
    const inputMsg = document.getElementById('terminal-input-msg');

    const author = inputAuthor.value.trim();
    const msg = inputMsg.value.trim();

    if (!author || !msg) return;

    appendLogToTerminal(author, msg, true);

    savedTerminalLogs.push({ author, msg });
    localStorage.setItem('hgn_rplb_terminal_logs', JSON.stringify(savedTerminalLogs));

    // Reset inputs
    inputAuthor.value = '';
    inputMsg.value = '';

    playChimeBell();
    createShockwaveParticles(window.innerWidth / 2, window.innerHeight * 0.7, 18);
  });

  function appendLogToTerminal(author, msg, isNew = false) {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
      <span class="log-author">[${escapeHtml(author)}]</span>:
      <span class="log-msg">"${escapeHtml(msg)}"</span>
    `;

    if (isNew) {
      entry.style.opacity = '0';
      entry.style.transform = 'translateX(-10px)';
      entry.style.transition = 'all 0.4s var(--ease-spring)';
      termLogsContainer.appendChild(entry);

      requestAnimationFrame(() => {
        entry.style.opacity = '1';
        entry.style.transform = 'translateX(0)';
      });
    } else {
      termLogsContainer.appendChild(entry);
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // 7. CINEMATIC 3D ARTWORK LIGHTBOX
  // =========================================================================
  const artCards = document.querySelectorAll('.art-card');

  artCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.getAttribute('data-title') || 'Karya Seni 3D';
      const desc = card.getAttribute('data-desc') || '';

      lightboxImg.src = img.src;
      lightboxImg.alt = title;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;

      studioLightbox.classList.add('active');
      studioLightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeStudioLightbox() {
    studioLightbox.classList.remove('active');
    studioLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeStudioLightbox);
  lightboxBackdrop.addEventListener('click', closeStudioLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && studioLightbox.classList.contains('active')) {
      closeStudioLightbox();
    }
  });

  // =========================================================================
  // 8. INTERACTIVE ROSE BLOOM COUNTER & SHOCKWAVE
  // =========================================================================
  let roseCount = parseInt(localStorage.getItem('hgn_studio_rose_count') || '11', 10);
  roseCounterStat.textContent = roseCount;

  btnBloomRose.addEventListener('click', () => {
    roseCount++;
    roseCounterStat.textContent = roseCount;
    localStorage.setItem('hgn_studio_rose_count', roseCount.toString());

    // Counter Pop Animation
    roseCounterStat.classList.add('pop');
    setTimeout(() => roseCounterStat.classList.remove('pop'), 250);

    // Blooming Center Scale
    bloomingCenter.style.transform = 'scale(1.45) rotate(20deg)';
    setTimeout(() => {
      bloomingCenter.style.transform = '';
    }, 400);

    playChimeBell();

    const rect = btnBloomRose.getBoundingClientRect();
    const burstX = rect.left + rect.width / 2;
    const burstY = rect.top;

    createShockwaveParticles(burstX, burstY, 20);
    spawnFloatingHeart(burstX, burstY);
  });

  function spawnFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = Math.random() > 0.5 ? '🌹' : '✨';
    heart.style.position = 'fixed';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = '2.2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '99999';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.transition = 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1)';
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      const destY = y - 110 - Math.random() * 50;
      const destX = x + (Math.random() - 0.5) * 90;
      heart.style.top = `${destY}px`;
      heart.style.left = `${destX}px`;
      heart.style.opacity = '0';
      heart.style.transform = 'translate(-50%, -50%) scale(1.8) rotate(25deg)';
    });

    setTimeout(() => heart.remove(), 1150);
  }

});
