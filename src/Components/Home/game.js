/*
const GameSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      console.error('Canvas or container not found');
      return () => {};
    }

    const resizeCanvas = () => {
      const aspectRatio = 16 / 9;
      const maxWidth = container.clientWidth - 16;
      let width = maxWidth;
      let height = width / aspectRatio;
      const minHeight = 200;
      if (height < minHeight) {
        height = minHeight;
        width = height * aspectRatio;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleFullscreenChange = () => {
      try {
        const fullscreenBtn = document.getElementById('btn-fullscreen');
        const exitBtn = document.getElementById('btn-exit');
        const pauseFullscreenBtn = document.getElementById('btn-pause-fullscreen');
        const resumeFullscreenBtn = document.getElementById('btn-resume-fullscreen');

        if (document.fullscreenElement) {
          if (fullscreenBtn) fullscreenBtn.textContent = 'Exit Fullscreen';
          if (exitBtn) exitBtn.classList.remove('hidden');
          if (pauseFullscreenBtn) pauseFullscreenBtn.classList.remove('hidden');
          if (resumeFullscreenBtn) resumeFullscreenBtn.classList.add('hidden');
        } else {
          if (fullscreenBtn) fullscreenBtn.textContent = 'Fullscreen';
          if (exitBtn) exitBtn.classList.add('hidden');
          if (pauseFullscreenBtn) pauseFullscreenBtn.classList.add('hidden');
          if (resumeFullscreenBtn) resumeFullscreenBtn.classList.add('hidden');
        }
        resizeCanvas();
      } catch (err) {
        console.error('handleFullscreenChange error:', err);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    const cleanupGame = startGame(canvas, null);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      cleanupGame();
      resetGame();
    };
  }, []);

  return (
    <section id="game-section" aria-label="Interactive Game Section">
      <div className="container">
        <h2>Play Our Interactive Science Game</h2>
        <div id="game-section-wrapper">
          <div id="game-header" role="region" aria-live="polite">
            <div>
              Score: <span id="score">0</span>
            </div>
            <div>
              Level: <span id="level">1</span>
            </div>
            <div>
              Lives: <span id="lives">3</span>
            </div>
            <div>
              Timer: <span id="timer">60</span>s
            </div>
          </div>
          <div id="game-main">
            <div id="game-sidebar">
              <section>
                <h3>Power-ups</h3>
                <div id="powerups" role="list"></div>
              </section>
              <section>
                <h3>Achievements</h3>
                <div id="achievements" role="list"></div>
              </section>
            </div>
            <div id="game-canvas-container" ref={containerRef}>
              <canvas ref={canvasRef} id="game-canvas"></canvas>
              <div id="particle-container"></div>
              <div id="fullscreen-controls" className="hidden">
                <button id="btn-pause-fullscreen" className="game-btn">Pause</button>
                <button id="btn-resume-fullscreen" className="game-btn hidden">Resume</button>
                <button id="btn-exit" className="exit-btn hidden">Exit</button>
              </div>
            </div>
          </div>
          <div id="game-bottom-controls">
            <button id="btn-pause" className="game-btn">Pause</button>
            <button id="btn-resume" className="game-btn hidden">Resume</button>
            <button id="btn-fullscreen" className="game-btn">Fullscreen</button>
          </div>
        </div>
      </div>
    </section>
  );
};
*/



let animationFrameId = null;

export const startGame = (canvas, onGameStateChange) => {
  if (!canvas) {
    console.error('Canvas not found');
    return () => {};
  }

  const ctx = canvas.getContext('2d');
  let gameState = 'playing';
  let score = 0;
  let level = 1;
  let lives = 3;
  let timeLeft = 60;
  let powerups = { doublePoints: 0, doublePointsActive: false };
  let achievements = [];

  // Game objects
  const paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    width: 100,
    height: 20,
    speed: 5,
  };
  const objects = [];
  let lastObjectSpawn = 0;
  const spawnInterval = 1000;

  const updateDOM = () => {
    try {
      const scoreEl = document.getElementById('score');
      const levelEl = document.getElementById('level');
      const livesEl = document.getElementById('lives');
      const timerEl = document.getElementById('timer');
      const powerupsEl = document.getElementById('powerups');
      const achievementsEl = document.getElementById('achievements');
      const pauseBtn = document.getElementById('btn-pause');
      const resumeBtn = document.getElementById('btn-resume');
      const pauseFullscreenBtn = document.getElementById('btn-pause-fullscreen');
      const resumeFullscreenBtn = document.getElementById('btn-resume-fullscreen');

      if (scoreEl) scoreEl.textContent = score;
      if (levelEl) levelEl.textContent = level;
      if (livesEl) livesEl.textContent = lives;
      if (timerEl) timerEl.textContent = Math.max(0, Math.floor(timeLeft));
      if (powerupsEl) {
        powerupsEl.innerHTML = `
          <div>Double Points: ${powerups.doublePoints}</div>
          <button id="btn-double-points" class="powerup-btn" ${powerups.doublePoints === 0 ? 'disabled' : ''}>Use Double Points</button>
          <button id="btn-reset" class="powerup-btn">Reset Game</button>
        `;
      }
      if (achievementsEl) {
        achievementsEl.innerHTML = achievements.map(ach => `<div>${ach}</div>`).join('');
      }
      if (pauseBtn && resumeBtn && pauseFullscreenBtn && resumeFullscreenBtn) {
        if (gameState === 'paused') {
          pauseBtn.classList.add('hidden');
          resumeBtn.classList.remove('hidden');
          pauseFullscreenBtn.classList.add('hidden');
          resumeFullscreenBtn.classList.remove('hidden');
        } else if (gameState === 'playing') {
          pauseBtn.classList.remove('hidden');
          resumeBtn.classList.add('hidden');
          pauseFullscreenBtn.classList.remove('hidden');
          resumeFullscreenBtn.classList.add('hidden');
        } else {
          pauseBtn.classList.add('hidden');
          resumeBtn.classList.add('hidden');
          pauseFullscreenBtn.classList.add('hidden');
          resumeFullscreenBtn.classList.add('hidden');
        }
      }

      // Re-attach powerup listeners
      const doublePointsBtn = document.getElementById('btn-double-points');
      const resetBtn = document.getElementById('btn-reset');
      if (doublePointsBtn) {
        doublePointsBtn.removeEventListener('click', usePowerup);
        doublePointsBtn.addEventListener('click', () => usePowerup('doublePoints'));
      }
      if (resetBtn) {
        resetBtn.removeEventListener('click', resetGameState);
        resetBtn.addEventListener('click', () => {
          resetGameState();
          updateDOM();
        });
      }

      // Notify gameState change only if callback exists
      if (onGameStateChange) {
        onGameStateChange(gameState);
      }
    } catch (err) {
      console.error('updateDOM error:', err);
    }
  };

  const checkAchievements = () => {
    if (score >= 100 && !achievements.includes('Score 100')) {
      achievements.push('Score 100');
    }
    if (level >= 2 && !achievements.includes('Reach Level 2')) {
      achievements.push('Reach Level 2');
    }
    if (level >= 3 && !achievements.includes('Reach Level 3')) {
      achievements.push('Reach Level 3');
    }
    if (score >= 200 && !achievements.includes('Win Game')) {
      achievements.push('Win Game');
    }
    if (lives <= 0 && !achievements.includes('Game Over')) {
      achievements.push('Game Over');
    }
  };

  const updateLevel = () => {
    if (score > 160) {
      level = 3;
    } else if (score > 100) {
      level = 2;
    } else {
      level = 1;
    }
    if (score >= 200 && gameState !== 'won') {
      gameState = 'won';
      powerups.doublePoints = 0;
      updateDOM();
    }
  };

  const spawnObject = () => {
    const object = {
      x: Math.random() * (canvas.width - 30),
      y: -30,
      width: 30,
      height: 30,
      speed: 2 + level * 0.5,
    };
    objects.push(object);
  };

  const usePowerup = (type) => {
    if (type === 'doublePoints' && powerups.doublePoints > 0 && !powerups.doublePointsActive) {
      powerups.doublePoints--;
      powerups.doublePointsActive = true;
    }
    updateDOM();
  };

  const resetGameState = () => {
    score = 0;
    level = 1;
    lives = 3;
    timeLeft = 60;
    powerups = { doublePoints: 0, doublePointsActive: false };
    achievements = [];
    paddle.x = canvas.width / 2 - 50;
    objects.length = 0;
    lastObjectSpawn = 0;
    gameState = 'playing';
    updateDOM();
  };

  const toggleFullscreen = () => {
    const container = document.getElementById('game-canvas-container');
    const exitBtn = document.getElementById('btn-exit');
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error(`Fullscreen error: ${err.message}`);
      });
      if (exitBtn) exitBtn.classList.remove('hidden');
    } else {
      document.exitFullscreen();
      if (exitBtn) exitBtn.classList.add('hidden');
    }
  };

  const updateGame = (timestamp) => {
    if (gameState !== 'playing') {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1e3a8a';
      ctx.font = '24px Poppins';
      ctx.textAlign = 'center';
      if (gameState === 'ended') {
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
      } else if (gameState === 'won') {
        ctx.fillText('You Win!', canvas.width / 2, canvas.height / 2);
      }
      updateDOM();
      animationFrameId = requestAnimationFrame(updateGame);
      return;
    }

    // Update time
    timeLeft -= 1 / 60;
    if (timeLeft <= 0) {
      lives = Math.max(0, lives - 1);
      timeLeft = 60;
      if (lives === 0) {
        gameState = 'ended';
        updateDOM();
      }
    }

    // Spawn objects
    if (timestamp - lastObjectSpawn > spawnInterval) {
      spawnObject();
      lastObjectSpawn = timestamp;
    }

    // Update paddle
    if (keys.left && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }
    if (keys.right && paddle.x < canvas.width - paddle.width) {
      paddle.x += paddle.speed;
    }

    // Update objects
    objects.forEach((obj, index) => {
      obj.y += obj.speed;
      if (obj.y > canvas.height) {
        objects.splice(index, 1);
        lives = Math.max(0, lives - 1);
        if (lives === 0) {
          gameState = 'ended';
          updateDOM();
        }
      }
      // Collision with paddle
      if (
        obj.x + obj.width > paddle.x &&
        obj.x < paddle.x + paddle.width &&
        obj.y + obj.height > paddle.y &&
        obj.y < paddle.y + paddle.height
      ) {
        objects.splice(index, 1);
        const points = powerups.doublePointsActive ? 20 : 10;
        score += points;
        if (powerups.doublePointsActive) {
          powerups.doublePointsActive = false;
        }
        if (score % 60 === 0) {
          powerups.doublePoints += 1;
        }
        updateLevel();
      }
    });

    // Render
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#344f9b';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = '#2563eb';
    objects.forEach(obj => {
      ctx.beginPath();
      ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    checkAchievements();
    updateDOM();

    animationFrameId = requestAnimationFrame(updateGame);
  };

  // Keyboard controls
  const keys = { left: false, right: false };
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
  };
  const handleKeyUp = (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  // Button controls
  const attachButtonListeners = () => {
    try {
      const pauseBtn = document.getElementById('btn-pause');
      const resumeBtn = document.getElementById('btn-resume');
      const fullscreenBtn = document.getElementById('btn-fullscreen');
      const doublePointsBtn = document.getElementById('btn-double-points');
      const resetBtn = document.getElementById('btn-reset');
      const exitBtn = document.getElementById('btn-exit');
      const pauseFullscreenBtn = document.getElementById('btn-pause-fullscreen');
      const resumeFullscreenBtn = document.getElementById('btn-resume-fullscreen');

      if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
          if (gameState === 'playing') {
            gameState = 'paused';
            updateDOM();
          }
        });
      }
      if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
          if (gameState === 'paused') {
            gameState = 'playing';
            updateDOM();
          }
        });
      }
      if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
      }
      if (doublePointsBtn) {
        doublePointsBtn.addEventListener('click', () => usePowerup('doublePoints'));
      }
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          resetGameState();
          updateDOM();
        });
      }
      if (exitBtn) {
        exitBtn.addEventListener('click', () => {
          if (document.fullscreenElement) {
            document.exitFullscreen();
            exitBtn.classList.add('hidden');
          }
        });
      }
      if (pauseFullscreenBtn) {
        pauseFullscreenBtn.addEventListener('click', () => {
          if (gameState === 'playing') {
            gameState = 'paused';
            updateDOM();
          }
        });
      }
      if (resumeFullscreenBtn) {
        resumeFullscreenBtn.addEventListener('click', () => {
          if (gameState === 'paused') {
            gameState = 'playing';
            updateDOM();
          }
        });
      }
    } catch (err) {
      console.error('attachButtonListeners error:', err);
    }
  };

  // Initial DOM update and attach listeners
  updateDOM();
  attachButtonListeners();

  // Start game
  updateGame(0);

  // Cleanup
  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    const pauseBtn = document.getElementById('btn-pause');
    const resumeBtn = document.getElementById('btn-resume');
    const fullscreenBtn = document.getElementById('btn-fullscreen');
    const doublePointsBtn = document.getElementById('btn-double-points');
    const resetBtn = document.getElementById('btn-reset');
    const exitBtn = document.getElementById('btn-exit');
    const pauseFullscreenBtn = document.getElementById('btn-pause-fullscreen');
    const resumeFullscreenBtn = document.getElementById('btn-resume-fullscreen');
    if (pauseBtn) pauseBtn.removeEventListener('click', () => {});
    if (resumeBtn) resumeBtn.removeEventListener('click', () => {});
    if (fullscreenBtn) fullscreenBtn.removeEventListener('click', toggleFullscreen);
    if (doublePointsBtn) doublePointsBtn.removeEventListener('click', () => {});
    if (resetBtn) resetBtn.removeEventListener('click', () => {});
    if (exitBtn) exitBtn.removeEventListener('click', () => {});
    if (pauseFullscreenBtn) pauseFullscreenBtn.removeEventListener('click', () => {});
    if (resumeFullscreenBtn) resumeFullscreenBtn.removeEventListener('click', () => {});
  };
};

export const resetGame = () => {
  try {
    const scoreEl = document.getElementById('score');
    const levelEl = document.getElementById('level');
    const livesEl = document.getElementById('lives');
    const timerEl = document.getElementById('timer');
    const powerupsEl = document.getElementById('powerups');
    const achievementsEl = document.getElementById('achievements');

    if (scoreEl) scoreEl.textContent = '0';
    if (levelEl) levelEl.textContent = '1';
    if (livesEl) livesEl.textContent = '3';
    if (timerEl) timerEl.textContent = '60';
    if (powerupsEl) powerupsEl.innerHTML = '';
    if (achievementsEl) achievementsEl.innerHTML = '';

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  } catch (err) {
    console.error('resetGame error:', err);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*let animationFrameId = null;

export const startGame = (canvas) => {
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  let gameState = 'playing';
  let score = 0;
  let level = 1;
  let lives = 3;
  let timeLeft = 60;
  let powerups = { doublePoints: 0, doublePointsActive: false };
  let achievements = [];

  // Game objects
  const paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    width: 100,
    height: 20,
    speed: 5,
  };
  const objects = [];
  let lastObjectSpawn = 0;
  const spawnInterval = 1000;

  const updateDOM = () => {
    const scoreEl = document.getElementById('score');
    const levelEl = document.getElementById('level');
    const livesEl = document.getElementById('lives');
    const timerEl = document.getElementById('timer');
    const powerupsEl = document.getElementById('powerups');
    const achievementsEl = document.getElementById('achievements');
    const pauseBtn = document.getElementById('btn-pause');
    const resumeBtn = document.getElementById('btn-resume');

    if (scoreEl) scoreEl.textContent = score;
    if (levelEl) levelEl.textContent = level;
    if (livesEl) livesEl.textContent = lives;
    if (timerEl) timerEl.textContent = Math.max(0, Math.floor(timeLeft));
    if (powerupsEl) {
      powerupsEl.innerHTML = `
        <div>Double Points: ${powerups.doublePoints}</div>
        <button id="btn-double-points" class="powerup-btn" ${powerups.doublePoints === 0 ? 'disabled' : ''}>Use Double Points</button>
        <button id="btn-reset" class="powerup-btn">Reset Game</button>
      `;
    }
    if (achievementsEl) {
      achievementsEl.innerHTML = achievements.map(ach => `<div>${ach}</div>`).join('');
    }
    if (pauseBtn && resumeBtn) {
      if (gameState === 'paused') {
        pauseBtn.classList.add('hidden');
        resumeBtn.classList.remove('hidden');
      } else {
        pauseBtn.classList.remove('hidden');
        resumeBtn.classList.add('hidden');
      }
      if (gameState === 'ended' || gameState === 'won') {
        pauseBtn.classList.add('hidden');
        resumeBtn.classList.add('hidden');
      }
    }
  };

  const checkAchievements = () => {
    if (score >= 100 && !achievements.includes('Score 100')) {
      achievements.push('Score 100');
    }
    if (level >= 2 && !achievements.includes('Reach Level 2')) {
      achievements.push('Reach Level 2');
    }
    if (level >= 3 && !achievements.includes('Reach Level 3')) {
      achievements.push('Reach Level 3');
    }
    if (score >= 200 && !achievements.includes('Win Game')) {
      achievements.push('Win Game');
    }
    if (lives <= 0 && !achievements.includes('Game Over')) {
      achievements.push('Game Over');
    }
  };

  const updateLevel = () => {
    if (score > 160) {
      level = 3;
    } else if (score > 100) {
      level = 2;
    } else {
      level = 1;
    }
    if (score >= 200 && gameState !== 'won') {
      gameState = 'won';
      powerups.doublePoints = 0;
    }
  };

  const spawnObject = () => {
    const object = {
      x: Math.random() * (canvas.width - 30),
      y: -30,
      width: 30,
      height: 30,
      speed: 2 + level * 0.5,
    };
    objects.push(object);
  };

  const usePowerup = (type) => {
    if (type === 'doublePoints' && powerups.doublePoints > 0 && !powerups.doublePointsActive) {
      powerups.doublePoints--;
      powerups.doublePointsActive = true;
    }
    updateDOM();
  };

  const resetGameState = () => {
    score = 0;
    level = 1;
    lives = 3;
    timeLeft = 60;
    powerups = { doublePoints: 0, doublePointsActive: false };
    achievements = [];
    paddle.x = canvas.width / 2 - 50;
    objects.length = 0;
    lastObjectSpawn = 0;
    gameState = 'playing';
    updateDOM();
  };

  const toggleFullscreen = () => {
    const container = document.getElementById('game-canvas-container');
    const exitBtn = document.getElementById('btn-exit');
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error(`Fullscreen error: ${err.message}`);
      });
      if (exitBtn) exitBtn.classList.remove('hidden');
    } else {
      document.exitFullscreen();
      if (exitBtn) exitBtn.classList.add('hidden');
    }
  };

  const updateGame = (timestamp) => {
    if (gameState !== 'playing') {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1e3a8a';
      ctx.font = '24px Poppins';
      ctx.textAlign = 'center';
      if (gameState === 'ended') {
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
      } else if (gameState === 'won') {
        ctx.fillText('You Win!', canvas.width / 2, canvas.height / 2);
      }
      updateDOM();
      animationFrameId = requestAnimationFrame(updateGame);
      return;
    }

    // Update time
    timeLeft -= 1 / 60;
    if (timeLeft <= 0) {
      lives = Math.max(0, lives - 1);
      timeLeft = 60;
      if (lives === 0) {
        gameState = 'ended';
      }
    }

    // Spawn objects
    if (timestamp - lastObjectSpawn > spawnInterval) {
      spawnObject();
      lastObjectSpawn = timestamp;
    }

    // Update paddle
    if (keys.left && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }
    if (keys.right && paddle.x < canvas.width - paddle.width) {
      paddle.x += paddle.speed;
    }

    // Update objects
    objects.forEach((obj, index) => {
      obj.y += obj.speed;
      if (obj.y > canvas.height) {
        objects.splice(index, 1);
        lives = Math.max(0, lives - 1);
        if (lives === 0) {
          gameState = 'ended';
        }
      }
      // Collision with paddle
      if (
        obj.x + obj.width > paddle.x &&
        obj.x < paddle.x + paddle.width &&
        obj.y + obj.height > paddle.y &&
        obj.y < paddle.y + paddle.height
      ) {
        objects.splice(index, 1);
        const points = powerups.doublePointsActive ? 20 : 10;
        score += points;
        if (powerups.doublePointsActive) {
          powerups.doublePointsActive = false;
        }
        if (score % 60 === 0) {
          powerups.doublePoints += 1;
        }
        updateLevel();
      }
    });

    // Render
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#344f9b';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = '#2563eb';
    objects.forEach(obj => {
      ctx.beginPath();
      ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    checkAchievements();
    updateDOM();

    animationFrameId = requestAnimationFrame(updateGame);
  };

  // Keyboard controls
  const keys = { left: false, right: false };
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
  };
  const handleKeyUp = (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  // Button controls
  const attachButtonListeners = () => {
    const pauseBtn = document.getElementById('btn-pause');
    const resumeBtn = document.getElementById('btn-resume');
    const fullscreenBtn = document.getElementById('btn-fullscreen');
    const doublePointsBtn = document.getElementById('btn-double-points');
    const resetBtn = document.getElementById('btn-reset');
    const exitBtn = document.getElementById('btn-exit');

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        if (gameState === 'playing') {
          gameState = 'paused';
          updateDOM();
        }
      });
    }
    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        if (gameState === 'paused') {
          gameState = 'playing';
          updateDOM();
        }
      });
    }
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    if (doublePointsBtn) {
      doublePointsBtn.addEventListener('click', () => usePowerup('doublePoints'));
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetGameState();
        updateDOM();
      });
    }
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
          exitBtn.classList.add('hidden');
        }
      });
    }
  };

  // Initial DOM update and attach listeners
  updateDOM();
  attachButtonListeners();

  // Start game
  updateGame(0);

  // Cleanup
  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    const pauseBtn = document.getElementById('btn-pause');
    const resumeBtn = document.getElementById('btn-resume');
    const fullscreenBtn = document.getElementById('btn-fullscreen');
    const doublePointsBtn = document.getElementById('btn-double-points');
    const resetBtn = document.getElementById('btn-reset');
    const exitBtn = document.getElementById('btn-exit');
    if (pauseBtn) pauseBtn.removeEventListener('click', () => {});
    if (resumeBtn) resumeBtn.removeEventListener('click', () => {});
    if (fullscreenBtn) fullscreenBtn.removeEventListener('click', () => {});
    if (doublePointsBtn) doublePointsBtn.removeEventListener('click', () => {});
    if (resetBtn) resetBtn.removeEventListener('click', () => {});
    if (exitBtn) exitBtn.removeEventListener('click', () => {});
  };
};

export const resetGame = () => {
  const scoreEl = document.getElementById('score');
  const levelEl = document.getElementById('level');
  const livesEl = document.getElementById('lives');
  const timerEl = document.getElementById('timer');
  const powerupsEl = document.getElementById('powerups');
  const achievementsEl = document.getElementById('achievements');

  if (scoreEl) scoreEl.textContent = '0';
  if (levelEl) levelEl.textContent = '1';
  if (livesEl) livesEl.textContent = '3';
  if (timerEl) timerEl.textContent = '60';
  if (powerupsEl) powerupsEl.innerHTML = '';
  if (achievementsEl) achievementsEl.innerHTML = '';

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*let animationFrameId = null;

export const startGame = (canvas) => {
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  let gameState = 'playing';
  let score = 0;
  let level = 1;
  let lives = 3;
  let timeLeft = 60;
  let powerups = { doublePoints: 0 };
  let achievements = [];

  // Game objects
  const paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    width: 100,
    height: 20,
    speed: 5,
  };
  const objects = [];
  let lastObjectSpawn = 0;
  const spawnInterval = 1000; // ms

  const updateDOM = () => {
    const scoreEl = document.getElementById('score');
    const levelEl = document.getElementById('level');
    const livesEl = document.getElementById('lives');
    const timerEl = document.getElementById('timer');
    const powerupsEl = document.getElementById('powerups');
    const achievementsEl = document.getElementById('achievements');

    if (scoreEl) scoreEl.textContent = score;
    if (levelEl) levelEl.textContent = level;
    if (livesEl) livesEl.textContent = lives;
    if (timerEl) timerEl.textContent = Math.max(0, Math.floor(timeLeft));
    if (powerupsEl) {
      powerupsEl.innerHTML = `
        <div>Double Points: ${powerups.doublePoints}</div>
        <button id="btn-double-points" className="powerup-btn">Use Double Points</button>
        <button id="btn-reset" className="powerup-btn">Reset Game</button>
      `;
    }
    if (achievementsEl) {
      achievementsEl.innerHTML = achievements
        .map(ach => `<div>${ach}</div>`)
        .join('');
    }
  };

  const checkAchievements = () => {
    if (score >= 100 && !achievements.includes('Score 100')) {
      achievements.push('Score 100');
    }
    if (level >= 2 && !achievements.includes('Reach Level 2')) {
      achievements.push('Reach Level 2');
    }
    if (level >= 3 && !achievements.includes('Reach Level 3')) {
      achievements.push('Reach Level 3');
    }
    if (score >= 200 && !achievements.includes('Win Game')) {
      achievements.push('Win Game');
    }
    if (lives === 0 && !achievements.includes('Game Over')) {
      achievements.push('Game Over');
    }
  };

  const updateLevel = () => {
    if (score > 160) {
      level = 3;
    } else if (score > 100) {
      level = 2;
    } else {
      level = 1;
    }
    if (score >= 200 && gameState !== 'won') {
      gameState = 'won';
      powerups.doublePoints = 0;
    }
  };

  const spawnObject = () => {
    const object = {
      x: Math.random() * (canvas.width - 30),
      y: -30,
      width: 30,
      height: 30,
      speed: 2 + level * 0.5,
    };
    objects.push(object);
  };

  const usePowerup = (type) => {
    if (type === 'doublePoints' && powerups.doublePoints > 0) {
      powerups.doublePoints--;
    }
    updateDOM();
  };

  const resetGameState = () => {
    score = 0;
    level = 1;
    lives = 3;
    timeLeft = 60;
    powerups.doublePoints = 0;
    achievements = [];
    paddle.x = canvas.width / 2 - 50;
    objects.length = 0;
    lastObjectSpawn = 0;
    gameState = 'playing';
    updateDOM();
  };

  const toggleFullscreen = () => {
    const container = document.getElementById('game-canvas-container');
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const updateGame = (timestamp) => {
    if (gameState !== 'playing') {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1e3a8a';
      ctx.font = '24px Poppins';
      ctx.textAlign = 'center';
      if (gameState === 'ended') {
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
      } else if (gameState === 'won') {
        ctx.fillText('You Win!', canvas.width / 2, canvas.height / 2);
      }
      animationFrameId = requestAnimationFrame(updateGame);
      return;
    }

    // Update time
    timeLeft -= 1 / 60; // 60fps
    if (timeLeft <= 0) {
      lives--;
      timeLeft = 60;
      if (lives <= 0) {
        gameState = 'ended';
      }
    }

    // Spawn objects
    if (timestamp - lastObjectSpawn > spawnInterval) {
      spawnObject();
      lastObjectSpawn = timestamp;
    }

    // Update paddle
    if (keys.left && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }
    if (keys.right && paddle.x < canvas.width - paddle.width) {
      paddle.x += paddle.speed;
    }

    // Update objects
    objects.forEach((obj, index) => {
      obj.y += obj.speed;
      if (obj.y > canvas.height) {
        objects.splice(index, 1);
        lives--;
        if (lives <= 0) {
          gameState = 'ended';
        }
      }
      // Collision with paddle
      if (
        obj.x + obj.width > paddle.x &&
        obj.x < paddle.x + paddle.width &&
        obj.y + obj.height > paddle.y &&
        obj.y < paddle.y + paddle.height
      ) {
        objects.splice(index, 1);
        const points = powerups.doublePoints > 0 ? 20 : 10;
        if (powerups.doublePoints > 0) powerups.doublePoints--;
        score += points;
        if (score % 50 === 0) {
          powerups.doublePoints += 1; // Earn Double Points every 50 points
        }
        updateLevel();
      }
    });

    // Render
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Paddle
    ctx.fillStyle = '#344f9b';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    // Objects
    ctx.fillStyle = '#2563eb';
    objects.forEach(obj => {
      ctx.beginPath();
      ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    checkAchievements();
    updateDOM();

    animationFrameId = requestAnimationFrame(updateGame);
  };

  // Keyboard controls
  const keys = { left: false, right: false };
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
  };
  const handleKeyUp = (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  // Button controls
  const pauseBtn = document.getElementById('btn-pause');
  const resumeBtn = document.getElementById('btn-resume');
  const fullscreenBtn = document.getElementById('btn-fullscreen');
  const doublePointsBtn = document.getElementById('btn-double-points');
  const resetBtn = document.getElementById('btn-reset');

  const attachButtonListeners = () => {
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        gameState = 'paused';
        updateDOM();
      });
    }
    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        gameState = 'playing';
        updateDOM();
      });
    }
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    if (doublePointsBtn) {
      doublePointsBtn.addEventListener('click', () => usePowerup('doublePoints'));
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', resetGameState);
    }
  };

  attachButtonListeners();

  // Start game
  updateGame(0);

  // Cleanup
  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    if (pauseBtn) pauseBtn.removeEventListener('click', () => {});
    if (resumeBtn) resumeBtn.removeEventListener('click', () => {});
    if (fullscreenBtn) fullscreenBtn.removeEventListener('click', () => {});
    if (doublePointsBtn) doublePointsBtn.removeEventListener('click', () => {});
    if (resetBtn) resetBtn.removeEventListener('click', () => {});
  };
};

export const resetGame = () => {
  const scoreEl = document.getElementById('score');
  const levelEl = document.getElementById('level');
  const livesEl = document.getElementById('lives');
  const timerEl = document.getElementById('timer');
  const powerupsEl = document.getElementById('powerups');
  const achievementsEl = document.getElementById('achievements');

  if (scoreEl) scoreEl.textContent = '0';
  if (levelEl) levelEl.textContent = '1';
  if (livesEl) livesEl.textContent = '3';
  if (timerEl) timerEl.textContent = '60';
  if (powerupsEl) powerupsEl.innerHTML = '';
  if (achievementsEl) achievementsEl.innerHTML = '';

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/*let animationFrameId = null;

export const startGame = (canvas) => {
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  let gameState = 'playing';
  let score = 0;
  let level = 1;
  let lives = 3;
  let timeLeft = 60;
  let powerups = { doublePoints: 0 };
  let achievements = [];

  // Game objects
  const paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    width: 100,
    height: 20,
    speed: 5,
  };
  const objects = [];
  let lastObjectSpawn = 0;
  const spawnInterval = 1000; // ms

  const updateDOM = () => {
    const scoreEl = document.getElementById('score');
    const levelEl = document.getElementById('level');
    const livesEl = document.getElementById('lives');
    const timerEl = document.getElementById('timer');
    const powerupsEl = document.getElementById('powerups');
    const achievementsEl = document.getElementById('achievements');

    if (scoreEl) scoreEl.textContent = score;
    if (levelEl) levelEl.textContent = level;
    if (livesEl) livesEl.textContent = lives;
    if (timerEl) timerEl.textContent = Math.max(0, Math.floor(timeLeft));
    if (powerupsEl) {
      powerupsEl.innerHTML = `
        <div>Double Points: ${powerups.doublePoints}</div>
      `;
    }
    if (achievementsEl) {
      achievementsEl.innerHTML = achievements
        .map(ach => `<div>${ach}</div>`)
        .join('');
    }
  };

  const checkAchievements = () => {
    if (score >= 100 && !achievements.includes('Score 100')) {
      achievements.push('Score 100');
    }
    if (level >= 3 && !achievements.includes('Reach Level 3')) {
      achievements.push('Reach Level 3');
    }
    if (lives === 0 && !achievements.includes('Game Over')) {
      achievements.push('Game Over');
    }
  };

  const spawnObject = () => {
    const object = {
      x: Math.random() * (canvas.width - 30),
      y: -30,
      width: 30,
      height: 30,
      speed: 2 + level * 0.5,
    };
    objects.push(object);
  };

  const usePowerup = (type) => {
    if (type === 'doublePoints' && powerups.doublePoints > 0) {
      powerups.doublePoints--;
    }
    updateDOM();
  };

  const resetGameState = () => {
    score = 0;
    level = 1;
    lives = 3;
    timeLeft = 60;
    powerups.doublePoints = 0;
    achievements = [];
    paddle.x = canvas.width / 2 - 50;
    objects.length = 0;
    lastObjectSpawn = 0;
    gameState = 'playing';
    updateDOM();
  };

  const toggleFullscreen = () => {
    const container = document.getElementById('game-canvas-container');
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const updateGame = (timestamp) => {
    if (gameState !== 'playing') {
      if (gameState === 'ended') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1e3a8a';
        ctx.font = '24px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
      }
      animationFrameId = requestAnimationFrame(updateGame);
      return;
    }

    // Update time
    timeLeft -= 1 / 60; // 60fps
    if (timeLeft <= 0) {
      lives--;
      timeLeft = 60;
      if (lives <= 0) {
        gameState = 'ended';
      }
    }

    // Spawn objects
    if (timestamp - lastObjectSpawn > spawnInterval) {
      spawnObject();
      lastObjectSpawn = timestamp;
    }

    // Update paddle
    if (keys.left && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }
    if (keys.right && paddle.x < canvas.width - paddle.width) {
      paddle.x += paddle.speed;
    }

    // Update objects
    objects.forEach((obj, index) => {
      obj.y += obj.speed;
      if (obj.y > canvas.height) {
        objects.splice(index, 1);
        lives--;
        if (lives <= 0) {
          gameState = 'ended';
        }
      }
      // Collision with paddle
      if (
        obj.x + obj.width > paddle.x &&
        obj.x < paddle.x + paddle.width &&
        obj.y + obj.height > paddle.y &&
        obj.y < paddle.y + paddle.height
      ) {
        objects.splice(index, 1);
        const points = powerups.doublePoints > 0 ? 20 : 10;
        if (powerups.doublePoints > 0) powerups.doublePoints--;
        score += points;
        if (score >= level * 50) {
          level++;
          powerups.doublePoints += 1;
        }
      }
    });

    // Render
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Paddle
    ctx.fillStyle = '#344f9b';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    // Objects
    ctx.fillStyle = '#2563eb';
    objects.forEach(obj => {
      ctx.beginPath();
      ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    checkAchievements();
    updateDOM();

    animationFrameId = requestAnimationFrame(updateGame);
  };

  // Keyboard controls
  const keys = { left: false, right: false };
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
  };
  const handleKeyUp = (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  // Button controls
  const pauseBtn = document.getElementById('btn-pause');
  const resumeBtn = document.getElementById('btn-resume');
  const fullscreenBtn = document.getElementById('btn-fullscreen');
  const doublePointsBtn = document.getElementById('btn-double-points');
  const resetBtn = document.getElementById('btn-reset');

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      gameState = 'paused';
      updateDOM();
    });
  }
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      gameState = 'playing';
      updateDOM();
    });
  }
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }
  if (doublePointsBtn) {
    doublePointsBtn.addEventListener('click', () => usePowerup('doublePoints'));
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', resetGameState);
  }

  // Start game
  updateGame(0);

  // Cleanup
  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    if (pauseBtn) pauseBtn.removeEventListener('click', () => {});
    if (resumeBtn) resumeBtn.removeEventListener('click', () => {});
    if (fullscreenBtn) fullscreenBtn.removeEventListener('click', () => {});
    if (doublePointsBtn) doublePointsBtn.removeEventListener('click', () => {});
    if (resetBtn) resetBtn.removeEventListener('click', () => {});
  };
};

export const resetGame = () => {
  const scoreEl = document.getElementById('score');
  const levelEl = document.getElementById('level');
  const livesEl = document.getElementById('lives');
  const timerEl = document.getElementById('timer');
  const powerupsEl = document.getElementById('powerups');
  const achievementsEl = document.getElementById('achievements');

  if (scoreEl) scoreEl.textContent = '0';
  if (levelEl) levelEl.textContent = '1';
  if (livesEl) livesEl.textContent = '3';
  if (timerEl) timerEl.textContent = '60';
  if (powerupsEl) powerupsEl.innerHTML = '';
  if (achievementsEl) achievementsEl.innerHTML = '';

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};*/

/*let animationFrameId = null;

export const startGame = (canvas) => {
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  let gameState = 'playing';
  let score = 0;
  let level = 1;
  let lives = 3;
  let timeLeft = 60;
  let powerups = { doublePoints: 0 };
  let achievements = [];

  // Game objects
  const paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    width: 100,
    height: 20,
    speed: 5,
  };
  const objects = [];
  let lastObjectSpawn = 0;
  const spawnInterval = 1000; // ms

  const updateDOM = () => {
    const scoreEl = document.getElementById('score');
    const levelEl = document.getElementById('level');
    const livesEl = document.getElementById('lives');
    const timerEl = document.getElementById('timer');
    const powerupsEl = document.getElementById('powerups');
    const achievementsEl = document.getElementById('achievements');

    if (scoreEl) scoreEl.textContent = score;
    if (levelEl) levelEl.textContent = level;
    if (livesEl) livesEl.textContent = lives;
    if (timerEl) timerEl.textContent = Math.max(0, Math.floor(timeLeft));
    if (powerupsEl) {
      powerupsEl.innerHTML = `
        <div>Double Points: ${powerups.doublePoints}</div>
      `;
    }
    if (achievementsEl) {
      achievementsEl.innerHTML = achievements
        .map(ach => `<div>${ach}</div>`)
        .join('');
    }
  };

  const checkAchievements = () => {
    if (score >= 100 && !achievements.includes('Score 100')) {
      achievements.push('Score 100');
    }
    if (level >= 3 && !achievements.includes('Reach Level 3')) {
      achievements.push('Reach Level 3');
    }
    if (lives === 0 && !achievements.includes('Game Over')) {
      achievements.push('Game Over');
    }
  };

  const spawnObject = () => {
    const object = {
      x: Math.random() * (canvas.width - 30),
      y: -30,
      width: 30,
      height: 30,
      speed: 2 + level * 0.5,
    };
    objects.push(object);
  };

  const usePowerup = (type) => {
    if (type === 'doublePoints' && powerups.doublePoints > 0) {
      powerups.doublePoints--;
    }
    updateDOM();
  };

  const resetGameState = () => {
    score = 0;
    level = 1;
    lives = 3;
    timeLeft = 60;
    powerups.doublePoints = 0;
    achievements = [];
    paddle.x = canvas.width / 2 - 50;
    objects.length = 0;
    lastObjectSpawn = 0;
    gameState = 'playing';
    updateDOM();
  };

  const updateGame = (timestamp) => {
    if (gameState !== 'playing') {
      if (gameState === 'ended') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1e3a8a';
        ctx.font = '24px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
      }
      animationFrameId = requestAnimationFrame(updateGame);
      return;
    }

    // Update time
    timeLeft -= 1 / 60; // 60fps
    if (timeLeft <= 0) {
      lives--;
      timeLeft = 60;
      if (lives <= 0) {
        gameState = 'ended';
      }
    }

    // Spawn objects
    if (timestamp - lastObjectSpawn > spawnInterval) {
      spawnObject();
      lastObjectSpawn = timestamp;
    }

    // Update paddle
    if (keys.left && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }
    if (keys.right && paddle.x < canvas.width - paddle.width) {
      paddle.x += paddle.speed;
    }

    // Update objects
    objects.forEach((obj, index) => {
      obj.y += obj.speed;
      if (obj.y > canvas.height) {
        objects.splice(index, 1);
        lives--;
        if (lives <= 0) {
          gameState = 'ended';
        }
      }
      // Collision with paddle
      if (
        obj.x + obj.width > paddle.x &&
        obj.x < paddle.x + paddle.width &&
        obj.y + obj.height > paddle.y &&
        obj.y < paddle.y + paddle.height
      ) {
        objects.splice(index, 1);
        const points = powerups.doublePoints > 0 ? 20 : 10;
        if (powerups.doublePoints > 0) powerups.doublePoints--;
        score += points;
        if (score >= level * 50) {
          level++;
          powerups.doublePoints += 1; // Earn Double Points per level-up
        }
      }
    });

    // Render
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Paddle
    ctx.fillStyle = '#344f9b';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    // Objects
    ctx.fillStyle = '#2563eb';
    objects.forEach(obj => {
      ctx.beginPath();
      ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    checkAchievements();
    updateDOM();

    animationFrameId = requestAnimationFrame(updateGame);
  };

  // Keyboard controls
  const keys = { left: false, right: false };
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
  };
  const handleKeyUp = (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  // Button controls
  const pauseBtn = document.getElementById('btn-pause');
  const resumeBtn = document.getElementById('btn-resume');
  const doublePointsBtn = document.getElementById('btn-double-points');
  const resetBtn = document.getElementById('btn-reset');

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      gameState = 'paused';
      updateDOM();
    });
  }
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      gameState = 'playing';
      updateDOM();
    });
  }
  if (doublePointsBtn) {
    doublePointsBtn.addEventListener('click', () => usePowerup('doublePoints'));
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', resetGameState);
  }

  // Start game
  updateGame(0);

  // Cleanup
  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    if (pauseBtn) pauseBtn.removeEventListener('click', () => {});
    if (resumeBtn) resumeBtn.removeEventListener('click', () => {});
    if (doublePointsBtn) doublePointsBtn.removeEventListener('click', () => {});
    if (resetBtn) resetBtn.removeEventListener('click', () => {});
  };
};

export const resetGame = () => {
  const scoreEl = document.getElementById('score');
  const levelEl = document.getElementById('level');
  const livesEl = document.getElementById('lives');
  const timerEl = document.getElementById('timer');
  const powerupsEl = document.getElementById('powerups');
  const achievementsEl = document.getElementById('achievements');

  if (scoreEl) scoreEl.textContent = '0';
  if (levelEl) levelEl.textContent = '1';
  if (livesEl) livesEl.textContent = '3';
  if (timerEl) timerEl.textContent = '60';
  if (powerupsEl) powerupsEl.innerHTML = '';
  if (achievementsEl) achievementsEl.innerHTML = '';

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};*/


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
let animationFrameId = null;

export const startGame = (canvas) => {
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  let gameState = 'playing';
  let score = 0;
  let level = 1;
  let lives = 3;
  let timeLeft = 60;
  let powerups = { doublePoints: 0, extraTime: 0 };
  let achievements = [];

  // Game objects
  const paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    width: 100,
    height: 20,
    speed: 5,
  };
  const objects = [];
  let lastObjectSpawn = 0;
  const spawnInterval = 1000; // ms

  const updateDOM = () => {
    const scoreEl = document.getElementById('score');
    const levelEl = document.getElementById('level');
    const livesEl = document.getElementById('lives');
    const timerEl = document.getElementById('timer');
    const powerupsEl = document.getElementById('powerups');
    const achievementsEl = document.getElementById('achievements');

    if (scoreEl) scoreEl.textContent = score;
    if (levelEl) levelEl.textContent = level;
    if (livesEl) livesEl.textContent = lives;
    if (timerEl) timerEl.textContent = Math.max(0, Math.floor(timeLeft));
    if (powerupsEl) {
      powerupsEl.innerHTML = `
        <div>Double Points: ${powerups.doublePoints}</div>
        <div>Extra Time: ${powerups.extraTime}</div>
      `;
    }
    if (achievementsEl) {
      achievementsEl.innerHTML = achievements
        .map(ach => `<div>${ach}</div>`)
        .join('');
    }
  };

  const checkAchievements = () => {
    if (score >= 100 && !achievements.includes('Score 100')) {
      achievements.push('Score 100');
    }
    if (level >= 3 && !achievements.includes('Reach Level 3')) {
      achievements.push('Reach Level 3');
    }
    if (lives === 0 && !achievements.includes('Game Over')) {
      achievements.push('Game Over');
    }
  };

  const spawnObject = () => {
    const object = {
      x: Math.random() * (canvas.width - 30),
      y: -30,
      width: 30,
      height: 30,
      speed: 2 + level * 0.5,
    };
    objects.push(object);
  };

  const usePowerup = (type) => {
    if (type === 'doublePoints' && powerups.doublePoints > 0) {
      powerups.doublePoints--;
    } else if (type === 'extraTime' && powerups.extraTime > 0) {
      timeLeft += 15;
      powerups.extraTime--;
    }
    updateDOM();
  };

  const updateGame = (timestamp) => {
    if (gameState !== 'playing') {
      if (gameState === 'ended') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1e3a8a';
        ctx.font = '24px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
      }
      animationFrameId = requestAnimationFrame(updateGame);
      return;
    }

    // Update time
    timeLeft -= 1 / 60; // 60fps
    if (timeLeft <= 0) {
      lives--;
      timeLeft = 60;
      if (lives <= 0) {
        gameState = 'ended';
      }
    }

    // Spawn objects
    if (timestamp - lastObjectSpawn > spawnInterval) {
      spawnObject();
      lastObjectSpawn = timestamp;
    }

    // Update paddle
    if (keys.left && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }
    if (keys.right && paddle.x < canvas.width - paddle.width) {
      paddle.x += paddle.speed;
    }

    // Update objects
    objects.forEach((obj, index) => {
      obj.y += obj.speed;
      if (obj.y > canvas.height) {
        objects.splice(index, 1);
        lives--;
        if (lives <= 0) {
          gameState = 'ended';
        }
      }
      // Collision with paddle
      if (
        obj.x + obj.width > paddle.x &&
        obj.x < paddle.x + paddle.width &&
        obj.y + obj.height > paddle.y &&
        obj.y < paddle.y + paddle.height
      ) {
        objects.splice(index, 1);
        const points = powerups.doublePoints > 0 ? 20 : 10;
        if (powerups.doublePoints > 0) powerups.doublePoints--;
        score += points;
        if (score >= level * 50) {
          level++;
          powerups.extraTime += 1;
        }
      }
    });

    // Render
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Paddle
    ctx.fillStyle = '#344f9b';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    // Objects
    ctx.fillStyle = '#2563eb';
    objects.forEach(obj => {
      ctx.beginPath();
      ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    checkAchievements();
    updateDOM();

    animationFrameId = requestAnimationFrame(updateGame);
  };

  // Keyboard controls
  const keys = { left: false, right: false };
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
  };
  const handleKeyUp = (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  // Button controls
  const pauseBtn = document.getElementById('btn-pause');
  const resumeBtn = document.getElementById('btn-resume');
  const doublePointsBtn = document.getElementById('btn-double-points');
  const extraTimeBtn = document.getElementById('btn-extra-time');

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      gameState = 'paused';
      updateDOM();
    });
  }
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      gameState = 'playing';
      updateDOM();
    });
  }
  if (doublePointsBtn) {
    doublePointsBtn.addEventListener('click', () => usePowerup('doublePoints'));
  }
  if (extraTimeBtn) {
    extraTimeBtn.addEventListener('click', () => usePowerup('extraTime'));
  }

  // Start game
  updateGame(0);

  // Cleanup
  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    if (pauseBtn) pauseBtn.removeEventListener('click', () => {});
    if (resumeBtn) resumeBtn.removeEventListener('click', () => {});
    if (doublePointsBtn) doublePointsBtn.removeEventListener('click', () => {});
    if (extraTimeBtn) doublePointsBtn.removeEventListener('click', () => {});
  };
};

export const resetGame = () => {
  const scoreEl = document.getElementById('score');
  const levelEl = document.getElementById('level');
  const livesEl = document.getElementById('lives');
  const timerEl = document.getElementById('timer');
  const powerupsEl = document.getElementById('powerups');
  const achievementsEl = document.getElementById('achievements');

  if (scoreEl) scoreEl.textContent = '0';
  if (levelEl) levelEl.textContent = '1';
  if (livesEl) livesEl.textContent = '3';
  if (timerEl) timerEl.textContent = '60';
  if (powerupsEl) powerupsEl.innerHTML = '';
  if (achievementsEl) achievementsEl.innerHTML = '';

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};*/