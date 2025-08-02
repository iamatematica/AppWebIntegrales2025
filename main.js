document.addEventListener('DOMContentLoaded', function() {
  
  // ========== ELEMENTOS DOM ==========
  const typeSelection = document.getElementById('type-selection');
  const exerciseSection = document.getElementById('exercise-section');
  const resultsSection = document.getElementById('results-section');
  
  // Header de ejercicio
  const exerciseTitle = document.getElementById('exercise-title');
  const exerciseDescription = document.getElementById('exercise-description');
  
  // Progreso
  const progressBar = document.getElementById('progress-bar');
  
  // Paso actual
  const stepTitle = document.getElementById('step-title');
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const explanationEl = document.getElementById('explanation');
  const explanationText = document.getElementById('explanation-text');
  const hintEl = document.getElementById('hint');
  const hintText = document.getElementById('hint-text');
  
  // Botones
  const checkBtn = document.getElementById('check-btn');
  const hintBtn = document.getElementById('hint-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');
  const backToMenuBtn = document.getElementById('back-to-menu-btn');
  
  // Navegación
  const stepInfo = document.getElementById('step-info');
  
  // Resultados
  const scoreEl = document.getElementById('score');
  const performanceMessage = document.getElementById('performance-message');
  const rankingEl = document.getElementById('ranking');
  const badgeModal = document.getElementById('badge-modal');
  const badgeNameEl = document.getElementById('badge-name');
  const badgeClose = document.getElementById('badge-close');
  
  const themeToggle = document.getElementById("theme-toggle");
  const onboardModal = document.getElementById("onboard-modal");
  const onboardClose = document.getElementById("onboard-close");

  // ========== VARIABLES DE ESTADO ==========
  let currentType = null;
  let currentExercise = 0;
  let currentStep = 0;
  let score = 0;
  let selectedOption = null;
  let wrongAnswers = [];
  let username = '';

  // ========== DATOS DE EJERCICIOS ==========
  let exercisesByType = {};

  // ========== FUNCIONES PRINCIPALES ==========
  
  function initializeApp() {
    username = getUsername();

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      themeToggle.textContent = "☀️";
    } else {
      themeToggle.textContent = "🌙";
    }
    themeToggle.addEventListener("click", toggleTheme);

    if (!localStorage.getItem("hasSeenTutorial")) {
      onboardModal.classList.add("show");
    }
    onboardClose.addEventListener("click", () => {
      onboardModal.classList.remove("show");
      localStorage.setItem("hasSeenTutorial", "true");
    });

    // Event listeners para selección de tipos
    document.querySelectorAll('.type-card').forEach(card => {
      card.addEventListener('click', function() {
        const type = this.dataset.type;
        selectType(type);
      });
    });

    // Event listeners para botones
    checkBtn.addEventListener('click', checkAnswer);
    hintBtn.addEventListener('click', showHint);
    prevBtn.addEventListener('click', prevStep);
    nextBtn.addEventListener('click', nextStep);
    restartBtn.addEventListener('click', restartExercise);
    backToMenuBtn.addEventListener('click', backToMenu);
    const saved = loadProgress();
    if (saved && confirm("¿Reanudar tu último ejercicio?")) {
      currentType = saved.currentType;
      currentExercise = saved.currentExercise;
      currentStep = saved.currentStep;
      score = saved.score;
      startExercise();
      return;
    }

    

    // Renderizar MathJax en las tarjetas iniciales
    setTimeout(() => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise([typeSelection]).catch(err => console.error(err));
      }
    }, 100);
  }

  function selectType(type) {
    currentType = type;
    currentExercise = 0;
    currentStep = 0;
    score = 0;
    
    // Marcar tarjeta seleccionada
    document.querySelectorAll('.type-card').forEach(card => {
      card.classList.remove('selected');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('selected');
    
    // Mostrar ejercicio
    setTimeout(() => {
      startExercise();
    }, 300);
  }

  function startExercise() {
    wrongAnswers = [];
    const exercises = exercisesByType[currentType];

    // Validar que existan ejercicios para el tipo actual
    if (!exercises || exercises.length === 0) {
      alert('No hay ejercicios disponibles para este tipo.');
      return;
    }

    const exercise = exercises[currentExercise];

    // Verificar que el ejercicio seleccionado exista
    if (!exercise) {
      alert('No se encontró el ejercicio seleccionado.');
      return;
    }

    // Ocultar selección, mostrar ejercicio
    typeSelection.style.display = 'none';
    exerciseSection.style.display = 'block';
    resultsSection.style.display = 'none';

    // Configurar header del ejercicio
    exerciseTitle.innerHTML = exercise.name;
    exerciseDescription.textContent = exercise.description;

    // Mostrar primer paso
    showStep();

    // Renderizar MathJax en el título
    setTimeout(() => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise([exerciseTitle]).catch(err => console.error(err));
      }
    }, 100);
  }

  function showStep() {
    const exercises = exercisesByType[currentType];
    const exercise = exercises[currentExercise];
    const step = exercise.steps[currentStep];

    if (!step) return;

    // Actualizar contenido del paso
    stepTitle.textContent = step.title;
    questionEl.innerHTML = step.question;

    // Crear opciones
    optionsEl.innerHTML = '';
    step.options.forEach((option, index) => {
      const optionEl = document.createElement('div');
      optionEl.className = 'option';
      optionEl.dataset.index = index;
      optionEl.innerHTML = `
        <div class="option-radio"></div>
        <span>${option.text}</span>
      `;
      
      optionEl.addEventListener('click', function() {
        // Remover selección previa
        document.querySelectorAll('.option').forEach(opt => {
          opt.classList.remove('selected');
        });
        // Seleccionar actual
        this.classList.add('selected');
        selectedOption = index;
        checkBtn.disabled = false;
      });

      optionsEl.appendChild(optionEl);
    });

    // Limpiar estado
    explanationEl.classList.remove('show');
    hintEl.classList.remove('show');
    selectedOption = null;

    // Actualizar progreso
    const progress = ((currentStep + 1) / exercise.steps.length) * 100;
    progressBar.style.width = progress + '%';

    // Actualizar info del paso
    stepInfo.textContent = `Paso ${currentStep + 1} de ${exercise.steps.length}`;

    // Actualizar botones
    prevBtn.disabled = currentStep === 0;
    nextBtn.disabled = true;
    checkBtn.disabled = true;

    // Renderizar MathJax
    setTimeout(() => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise([questionEl, optionsEl]).then(() => {
          console.log('✅ MathJax renderizado en paso');
        }).catch(err => console.error('❌ Error MathJax:', err));
      }
    }, 100);
  }

  function checkAnswer() {
    if (selectedOption === null) return;

    const exercises = exercisesByType[currentType];
    const exercise = exercises[currentExercise];
    const step = exercise.steps[currentStep];
    const selectedOptionData = step.options[selectedOption];

    // Feedback visual mejorado
    showFeedback(selectedOptionData.correct);

    // Marcar respuestas con animación
    document.querySelectorAll('.option').forEach((opt, index) => {
      opt.classList.remove('selected');
      
      setTimeout(() => {
        if (step.options[index].correct) {
          opt.classList.add('correct');
        } else if (index === selectedOption) {
          opt.classList.add('incorrect');
        }
      }, 200);
    });

    // Mostrar explicación con animación
    explanationText.innerHTML = step.explanation;
    setTimeout(() => explanationEl.classList.add('show'), 300);

    // Actualizar puntaje
    if (selectedOptionData.correct) {
      score++;
      // Confetti para respuestas correctas
      createConfetti();
      // Sonido de éxito
      playSound('correct');
    } else {
      wrongAnswers.push({
        title: step.title,
        correct: step.options.find(o => o.correct).text,
        explanation: step.explanation
      });
      // Sonido de error
      playSound('incorrect');
    }
    // Habilitar siguiente paso
    nextBtn.disabled = false;
    checkBtn.disabled = true;

    // Guardar progreso
    saveProgress();

    // Renderizar MathJax
    setTimeout(() => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise([explanationEl]).catch(err => console.error(err));
      }
    }, 100);
  }

  // ========== MEJORAS ADICIONALES ==========

  // Mejorar feedback visual
  function showFeedback(isCorrect) {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = isCorrect ? 
      '<span style="font-size: 1.2em;">✅</span> ¡Correcto!' : 
      '<span style="font-size: 1.2em;">❌</span> Incorrecto';
    
    Object.assign(feedback.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 2rem',
      borderRadius: '12px',
      color: 'white',
      fontWeight: 'bold',
      zIndex: '10000',
      background: isCorrect ? 
        'linear-gradient(135deg, #10b981, #059669)' : 
        'linear-gradient(135deg, #ef4444, #dc2626)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
      transform: 'translateX(400px)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    });
    
    document.body.appendChild(feedback);
    
    // Animar entrada
    setTimeout(() => feedback.style.transform = 'translateX(0)', 100);
    
    // Animar salida
    setTimeout(() => {
      feedback.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (document.body.contains(feedback)) {
          document.body.removeChild(feedback);
        }
      }, 400);
    }, 3000);
  }

  // Efecto confetti
  function createConfetti() {
    const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
    
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        Object.assign(confetti.style, {
          position: 'fixed',
          left: Math.random() * window.innerWidth + 'px',
          top: '-10px',
          width: '8px',
          height: '8px',
          background: colors[Math.floor(Math.random() * colors.length)],
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: '9999',
          transition: 'all 2s ease-out'
        });
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          confetti.style.top = window.innerHeight + 10 + 'px';
          confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
          confetti.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
          if (document.body.contains(confetti)) {
            document.body.removeChild(confetti);
          }
        }, 2100);
      }, i * 50);
    }
  }

  // Sonidos
  function playSound(type) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      function createTone(frequency, duration, volume = 0.1) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      }
      
      if (type === 'correct') {
        createTone(523.25, 0.2); // C5
        setTimeout(() => createTone(659.25, 0.2), 150); // E5
      } else if (type === 'incorrect') {
        createTone(220, 0.3); // A3
      }
    } catch (error) {
      // Silenciar errores de audio en navegadores que no lo soporten
      console.log('Audio no disponible');
    }
  }

  // Guardar progreso
  function saveProgress() {
    try {
      const progress = {
        currentType,
        currentExercise,
        currentStep,
        score,
        timestamp: Date.now()
      };
      localStorage.setItem('integralProgress', JSON.stringify(progress));
    } catch (error) {
      console.log('LocalStorage no disponible');
    }
  }

  // Cargar progreso
  function loadProgress() {
    try {
      const saved = localStorage.getItem('integralProgress');
      if (saved) {
        const progress = JSON.parse(saved);
        // Solo cargar si es reciente (menos de 1 hora)
        if (Date.now() - progress.timestamp < 3600000) {
          return progress;
        }
      }
    } catch (error) {
      console.log('Error cargando progreso');
    }
    return null;
  }

  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }


  // Estadísticas
  function trackPerformance() {
    try {
      const stats = JSON.parse(localStorage.getItem('integralStats') || '{}');
      
      if (!stats[currentType]) {
        stats[currentType] = {
          attempts: 0,
          totalScore: 0,
          bestScore: 0
        };
      }
      
      const exercises = exercisesByType[currentType];
      const exercise = exercises[currentExercise];
      const percentage = Math.round((score / exercise.steps.length) * 100);
      
      stats[currentType].attempts++;
      stats[currentType].totalScore += percentage;
      stats[currentType].bestScore = Math.max(stats[currentType].bestScore, percentage);
      
      localStorage.setItem('integralStats', JSON.stringify(stats));
      
      return stats[currentType];
    } catch (error) {
      console.log('Error en estadísticas');
      return { attempts: 1, totalScore: 0, bestScore: 0 };
    }
  }

  function getUsername() {
    let name = localStorage.getItem('username');
    if (!name) {
      name = prompt('Ingresa tu nombre:') || 'Anónimo';
      localStorage.setItem('username', name);
    }
    return name;
  }

  const badgeRules = [
    { id: 'first', name: 'Primer intento', condition: (stats) => stats.attempts === 1 },
    { id: 'score80', name: '80% o más', condition: (_stats, s) => s >= 80 },
    { id: 'expert', name: '5 intentos', condition: (stats) => stats.attempts >= 5 }
  ];

  function checkBadges(stats, percentage) {
    try {
      const unlocked = JSON.parse(localStorage.getItem('integralBadges') || '[]');
      for (const b of badgeRules) {
        if (!unlocked.includes(b.id) && b.condition(stats, percentage)) {
          unlocked.push(b.id);
          localStorage.setItem('integralBadges', JSON.stringify(unlocked));
          showBadgeModal(b.name);
        }
      }
    } catch (error) {
      console.log('Error guardando badges');
    }
  }

  function showBadgeModal(name) {
    if (!badgeModal) return;
    badgeNameEl.textContent = name;
    badgeModal.classList.add('show');
  }

  badgeClose.addEventListener('click', () => badgeModal.classList.remove('show'));

  function updateRanking(percent) {
    try {
      const ranking = JSON.parse(localStorage.getItem('integralRanking') || '[]');
      ranking.push({ name: username, score: percent });
      ranking.sort((a, b) => b.score - a.score);
      localStorage.setItem('integralRanking', JSON.stringify(ranking.slice(0, 5)));
    } catch (error) {
      console.log('Error en ranking');
    }
  }

  function displayRanking() {
    if (!rankingEl) return;
    const ranking = JSON.parse(localStorage.getItem('integralRanking') || '[]');
    if (ranking.length === 0) {
      rankingEl.innerHTML = '';
      return;
    }
    rankingEl.innerHTML = '';
    const title = document.createElement('h3');
    title.textContent = '🏆 Ranking';
    const list = document.createElement('ol');
    ranking.forEach(r => {
      const item = document.createElement('li');
      const nameSpan = document.createElement('span');
      nameSpan.textContent = r.name;
      const scoreSpan = document.createElement('span');
      scoreSpan.textContent = ` - ${r.score}%`;
      item.appendChild(nameSpan);
      item.appendChild(scoreSpan);
      list.appendChild(item);
    });
    rankingEl.appendChild(title);
    rankingEl.appendChild(list);
  }

  // Navegación con teclado
  document.addEventListener('keydown', function(e) {
    if (exerciseSection.style.display === 'block') {
      switch(e.key) {
        case 'ArrowLeft':
          if (!prevBtn.disabled) {
            e.preventDefault();
            prevStep();
          }
          break;
        case 'ArrowRight':
          if (!nextBtn.disabled) {
            e.preventDefault();
            nextStep();
          }
          break;
        case 'Enter':
          if (!checkBtn.disabled) {
            e.preventDefault();
            checkAnswer();
          }
          break;
        case '1':
        case '2':
        case '3':
          e.preventDefault();
          const optionIndex = parseInt(e.key) - 1;
          const options = document.querySelectorAll('.option');
          if (options[optionIndex]) {
            options[optionIndex].click();
          }
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          showHint();
          break;
      }
    }
  });

  // FUNCIONES FALTANTES AGREGADAS:

  function showHint() {
    const exercises = exercisesByType[currentType];
    const exercise = exercises[currentExercise];
    const step = exercise.steps[currentStep];
    
    hintText.innerHTML = step.hint;
    hintEl.classList.add('show');

    // Renderizar MathJax en pista
    setTimeout(() => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise([hintEl]).catch(err => console.error(err));
      }
    }, 100);
  }

  function nextStep() {
    const exercises = exercisesByType[currentType];
    const exercise = exercises[currentExercise];

    if (currentStep < exercise.steps.length - 1) {
      currentStep++;
      showStep();
    } else {
      showResults();
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      showStep();
    }
  }

  function showResults() {
    exerciseSection.style.display = 'none';
    resultsSection.style.display = 'block';

    const exercises = exercisesByType[currentType];
    const exercise = exercises[currentExercise];
    const percentage = Math.round((score / exercise.steps.length) * 100);

    scoreEl.textContent = percentage + '%';
    scoreEl.className = 'score';

    if (percentage >= 80) {
      scoreEl.classList.add('high');
      performanceMessage.textContent = '¡Excelente trabajo! Dominas bien este tema.';
    } else if (percentage >= 60) {
      scoreEl.classList.add('medium');
      performanceMessage.textContent = 'Buen trabajo. Puedes mejorar con más práctica.';
    } else {
      scoreEl.classList.add('low');
      performanceMessage.textContent = 'Necesitas repasar más este tema. ¡No te rindas!';
    }

    // Agregar estadísticas
    const stats = trackPerformance();
    const average = Math.round(stats.totalScore / stats.attempts);
    
    // Eliminar estadísticas previas si existen
    const existingStats = resultsSection.querySelector('.stats-display');
    if (existingStats) {
      existingStats.remove();
    }
    
    const statsDiv = document.createElement('div');
    statsDiv.className = 'stats-display';
    statsDiv.innerHTML = `
      <div style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #f3f4f6, #e5e7eb); border-radius: 12px; text-align: center;">
        <h3 style="color: var(--primary-color); margin-bottom: 1rem;">📊 Tus Estadísticas</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
          <div><strong>Intentos:</strong><br>${stats.attempts}</div>
          <div><strong>Mejor puntaje:</strong><br>${stats.bestScore}%</div>
          <div><strong>Promedio:</strong><br>${average}%</div>
        </div>
      </div>
    `;
    
    resultsSection.appendChild(statsDiv);
    if (wrongAnswers.length) {
      const reviewDiv = document.createElement('div');
      reviewDiv.className = 'review';
      reviewDiv.innerHTML = '<h3>❌ Revisión de errores</h3>' +
        wrongAnswers.map(w => `<div class="review-item"><strong>${w.title}</strong><br>Respuesta correcta: ${w.correct}<br>${w.explanation}</div>`).join('');
      resultsSection.appendChild(reviewDiv);
      setTimeout(() => {
        if (window.MathJax && window.MathJax.typesetPromise) {
          MathJax.typesetPromise([reviewDiv]);
        }
      }, 100);
    }


    updateRanking(percentage);
    displayRanking();
    checkBadges(stats, percentage);
    wrongAnswers = [];
  }

  function restartExercise() {
    currentStep = 0;
    score = 0;
    startExercise();
  }

  function backToMenu() {
    exerciseSection.style.display = 'none';
    resultsSection.style.display = 'none';
    typeSelection.style.display = 'grid';
    
    // Limpiar selección
    document.querySelectorAll('.type-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    currentType = null;
  }


  // ========== FIN DE MEJORAS ==========

  // ========== INICIALIZAR APLICACIÓN ==========
  fetch("exercises.json")
    .then(r => r.json())
    .then(data => {
      exercisesByType = data;
      initializeApp();
    })
    .catch(error => {
      console.error("Error al cargar exercises.json:", error);
      // Inicializar la aplicación aunque falle la carga
      initializeApp();
      const banner = document.createElement("div");
      banner.className = "load-error";
      banner.textContent = "No se pudieron cargar los ejercicios";
      document.body.prepend(banner);
    });

}); // ← FIN DEL DOMContentLoaded
