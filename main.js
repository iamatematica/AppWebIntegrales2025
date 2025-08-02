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
  
  // Modal de teoría
  const theoryBtn = document.getElementById('theory-btn');
  const theoryModal = document.getElementById('theory-modal');
  const theoryClose = document.getElementById('theory-close');
  const theoryBody = document.getElementById('theory-body');
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

  // ========== CONTENIDO DE TEORÍA ==========
  const theoryContent = {
  primera: `
    <div class="theory-section">
      <h2>🔄 Integrales Impropias de Primera Especie</h2>
      <p><strong>Límites de integración infinitos</strong></p>
    </div>
    
    <div class="theory-section">
      <h3>Definición</h3>
      <p>Una integral impropia de primera especie es aquella en la que uno o ambos límites de integración son infinitos.</p>
      
      <h4>Casos principales:</h4>
      
      <div class="case-block">
        <h5>📈 Caso 1: Límite superior infinito</h5>
        <p>$$\\int_a^\\infty f(x)\\,dx = \\lim_{t \\to \\infty} \\int_a^t f(x)\\,dx$$</p>
        <p><strong>Convergencia:</strong> Si el límite existe y es finito, la integral converge.</p>
      </div>
      
      <div class="case-block">
        <h5>📉 Caso 2: Límite inferior infinito</h5>
        <p>$$\\int_{-\\infty}^b f(x)\\,dx = \\lim_{t \\to -\\infty} \\int_t^b f(x)\\,dx$$</p>
        <p><strong>Convergencia:</strong> Si el límite existe y es finito, la integral converge.</p>
      </div>
      
      <div class="case-block">
        <h5>↔️ Caso 3: Ambos límites infinitos</h5>
        <p>$$\\int_{-\\infty}^\\infty f(x)\\,dx = \\int_{-\\infty}^c f(x)\\,dx + \\int_c^\\infty f(x)\\,dx$$</p>
        <p>donde $c$ es cualquier número real.</p>
        <p><strong>Convergencia:</strong> La integral converge si y solo si <strong>ambas</strong> integrales convergen.</p>
      </div>
    </div>

    <div class="theory-section">
      <h3>🎯 Criterios de Convergencia Importantes</h3>
      
      <div class="criterion-block">
        <h4>Integral p de Riemann (forma infinita)</h4>
        <p>$$\\int_1^\\infty \\frac{1}{x^p}\\,dx$$</p>
        <ul>
          <li><strong>Converge si $p > 1$</strong></li>
          <li><strong>Diverge si $p ≤ 1$</strong></li>
        </ul>
      </div>
      
      <div class="criterion-block">
        <h4>Comportamiento de funciones comunes</h4>
        <ul>
          <li>$\\int_1^\\infty \\frac{1}{x}\\,dx = \\infty$ (diverge)</li>
          <li>$\\int_1^\\infty \\frac{1}{x^2}\\,dx = 1$ (converge)</li>
          <li>$\\int_1^\\infty e^{-x}\\,dx = \\frac{1}{e}$ (converge)</li>
          <li>$\\int_0^\\infty e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}$ (converge)</li>
        </ul>
      </div>
    </div>

    <div class="theory-example">
      <h4>📋 Ejemplo Resuelto</h4>
      <p><strong>Evaluar:</strong> $\\int_2^\\infty \\frac{1}{x^3}\\,dx$</p>
      
      <p><strong>Solución:</strong></p>
      <p>$$\\int_2^\\infty \\frac{1}{x^3}\\,dx = \\lim_{t \\to \\infty} \\int_2^t \\frac{1}{x^3}\\,dx$$</p>
      
      <p>Calculamos la antiderivada:</p>
      <p>$$\\int \\frac{1}{x^3}\\,dx = \\int x^{-3}\\,dx = \\frac{x^{-2}}{-2} = -\\frac{1}{2x^2}$$</p>
      
      <p>Evaluamos:</p>
      <p>$$\\lim_{t \\to \\infty} \\left[-\\frac{1}{2x^2}\\right]_2^t = \\lim_{t \\to \\infty} \\left(-\\frac{1}{2t^2} + \\frac{1}{8}\\right)$$</p>
      
      <p>$$= 0 + \\frac{1}{8} = \\frac{1}{8}$$</p>
      
      <p><strong>Conclusión:</strong> La integral converge a $\\frac{1}{8}$.</p>
    </div>
  `,
  
  segunda: `
    <div class="theory-section">
      <h2>⚡ Integrales Impropias de Segunda Especie</h2>
      <p><strong>Discontinuidades en el integrando</strong></p>
    </div>
    
    <div class="theory-section">
      <h3>Definición</h3>
      <p>Una integral impropia de segunda especie es aquella en la que el integrando tiene una o más discontinuidades infinitas en el intervalo de integración $[a,b]$.</p>
      
      <h4>Casos principales:</h4>
      
      <div class="case-block">
        <h5>⬅️ Caso 1: Discontinuidad en el extremo izquierdo</h5>
        <p>Si $f$ tiene discontinuidad infinita en $x = a$:</p>
        <p>$$\\int_a^b f(x)\\,dx = \\lim_{t \\to a^+} \\int_t^b f(x)\\,dx$$</p>
      </div>
      
      <div class="case-block">
        <h5>➡️ Caso 2: Discontinuidad en el extremo derecho</h5>
        <p>Si $f$ tiene discontinuidad infinita en $x = b$:</p>
        <p>$$\\int_a^b f(x)\\,dx = \\lim_{t \\to b^-} \\int_a^t f(x)\\,dx$$</p>
      </div>
      
      <div class="case-block">
        <h5>🎯 Caso 3: Discontinuidad interior</h5>
        <p>Si $f$ tiene discontinuidad infinita en $x = c$ donde $a < c < b$:</p>
        <p>$$\\int_a^b f(x)\\,dx = \\int_a^c f(x)\\,dx + \\int_c^b f(x)\\,dx$$</p>
        <p>$$= \\lim_{t_1 \\to c^-} \\int_a^{t_1} f(x)\\,dx + \\lim_{t_2 \\to c^+} \\int_{t_2}^b f(x)\\,dx$$</p>
        <p><strong>Convergencia:</strong> La integral converge si y solo si <strong>ambas</strong> integrales convergen.</p>
      </div>
    </div>

    <div class="theory-section">
      <h3>🎯 Criterios de Convergencia Importantes</h3>
      
      <div class="criterion-block">
        <h4>Integral p de Riemann (forma con discontinuidad)</h4>
        <p>$$\\int_0^1 \\frac{1}{x^p}\\,dx$$</p>
        <ul>
          <li><strong>Converge si $p < 1$</strong></li>
          <li><strong>Diverge si $p ≥ 1$</strong></li>
        </ul>
        
        <p><strong>Generalización:</strong> Para $\\int_a^b \\frac{1}{(x-a)^p}\\,dx$ con discontinuidad en $x = a$:</p>
        <ul>
          <li><strong>Converge si $p < 1$</strong></li>
          <li><strong>Diverge si $p ≥ 1$</strong></li>
        </ul>
      </div>
      
      <div class="criterion-block">
        <h4>Casos especiales importantes</h4>
        <ul>
          <li>$\\int_0^1 \\frac{1}{\\sqrt{x}}\\,dx = 2$ (converge, $p = \\frac{1}{2} < 1$)</li>
          <li>$\\int_0^1 \\frac{1}{x}\\,dx = \\infty$ (diverge, $p = 1$)</li>
          <li>$\\int_0^1 \\frac{1}{x^2}\\,dx = \\infty$ (diverge, $p = 2 > 1$)</li>
        </ul>
      </div>
    </div>

    <div class="theory-example">
      <h4>📋 Ejemplo Resuelto</h4>
      <p><strong>Evaluar:</strong> $\\int_0^2 \\frac{1}{\\sqrt{4-x^2}}\\,dx$</p>
      
      <p><strong>Análisis:</strong> El integrando tiene discontinuidad infinita en $x = 2$ (extremo derecho).</p>
      
      <p><strong>Solución:</strong></p>
      <p>$$\\int_0^2 \\frac{1}{\\sqrt{4-x^2}}\\,dx = \\lim_{t \\to 2^-} \\int_0^t \\frac{1}{\\sqrt{4-x^2}}\\,dx$$</p>
      
      <p>La antiderivada es:</p>
      <p>$$\\int \\frac{1}{\\sqrt{4-x^2}}\\,dx = \\arcsin\\left(\\frac{x}{2}\\right) + C$$</p>
      
      <p>Evaluamos:</p>
      <p>$$\\lim_{t \\to 2^-} \\left[\\arcsin\\left(\\frac{x}{2}\\right)\\right]_0^t = \\lim_{t \\to 2^-} \\left(\\arcsin\\left(\\frac{t}{2}\\right) - \\arcsin(0)\\right)$$</p>
      
      <p>$$= \\arcsin(1) - 0 = \\frac{\\pi}{2}$$</p>
      
      <p><strong>Conclusión:</strong> La integral converge a $\\frac{\\pi}{2}$.</p>
    </div>
  `,
  
  tercera: `
    <div class="theory-section">
      <h2>🔀 Integrales Impropias de Tercera Especie</h2>
      <p><strong>Límites infinitos Y discontinuidades</strong></p>
    </div>
    
    <div class="theory-section">
      <h3>Definición</h3>
      <p>Una integral impropia de tercera especie es aquella que combina características de primera y segunda especie, es decir, tiene <strong>límites de integración infinitos</strong> Y <strong>discontinuidades en el integrando</strong>.</p>
      
      <h4>Características principales:</h4>
      <ul>
        <li>Uno o ambos límites de integración son infinitos</li>
        <li>El integrando tiene una o más discontinuidades infinitas</li>
        <li>Requiere tratamiento especial para cada impropiedad</li>
      </ul>
    </div>

    <div class="theory-section">
      <h3>🔧 Método de Resolución</h3>
      
      <div class="method-block">
        <h4>Paso 1: División de la integral</h4>
        <p>Se debe dividir la integral en un punto conveniente que separe las impropiedades:</p>
        <p>$$\\int_0^\\infty f(x)\\,dx = \\int_0^c f(x)\\,dx + \\int_c^\\infty f(x)\\,dx$$</p>
        <p>donde $c > 0$ es un punto conveniente (comúnmente $c = 1$).</p>
      </div>
      
      <div class="method-block">
        <h4>Paso 2: Análisis por separado</h4>
        <ul>
          <li><strong>Primera integral:</strong> Se trata como segunda especie (discontinuidad)</li>
          <li><strong>Segunda integral:</strong> Se trata como primera especie (límite infinito)</li>
        </ul>
      </div>
      
      <div class="method-block">
        <h4>Paso 3: Criterio de convergencia</h4>
        <p><strong>La integral de tercera especie converge si y solo si AMBAS integrales convergen independientemente.</strong></p>
        <p>$$\\int_0^\\infty f(x)\\,dx \\text{ converge} \\iff \\int_0^c f(x)\\,dx \\text{ converge } \\land \\int_c^\\infty f(x)\\,dx \\text{ converge}$$</p>
      </div>
    </div>

    <div class="theory-section">
      <h3>⚠️ Casos Típicos</h3>
      
      <div class="case-block">
        <h4>Caso común: $\\int_0^\\infty \\frac{1}{x^p}\\,dx$</h4>
        <p>División: $\\int_0^\\infty \\frac{1}{x^p}\\,dx = \\int_0^1 \\frac{1}{x^p}\\,dx + \\int_1^\\infty \\frac{1}{x^p}\\,dx$</p>
        
        <ul>
          <li>$\\int_0^1 \\frac{1}{x^p}\\,dx$ converge si $p < 1$</li>
          <li>$\\int_1^\\infty \\frac{1}{x^p}\\,dx$ converge si $p > 1$</li>
        </ul>
        
        <p><strong>Conclusión:</strong> $\\int_0^\\infty \\frac{1}{x^p}\\,dx$ <strong>nunca converge</strong> (no existe $p$ que satisfaga ambas condiciones simultáneamente).</p>
      </div>
      
      <div class="case-block">
        <h4>Funciones que pueden converger</h4>
        <ul>
          <li>$\\int_0^\\infty xe^{-x^2}\\,dx$ (converge)</li>
          <li>$\\int_0^\\infty \\frac{e^{-x}}{\\sqrt{x}}\\,dx$ (converge)</li>
          <li>$\\int_0^\\infty \\frac{\\sin x}{x^{3/2}}\\,dx$ (converge)</li>
        </ul>
      </div>
    </div>

    <div class="theory-example">
      <h4>📋 Ejemplo Resuelto</h4>
      <p><strong>Evaluar:</strong> $\\int_0^\\infty xe^{-x^2}\\,dx$</p>
      
      <p><strong>Análisis:</strong></p>
      <ul>
        <li>Límite superior infinito (primera especie)</li>
        <li>Integrando continuo en $[0,\\infty)$ (no hay segunda especie)</li>
        <li>Es realmente de primera especie, no tercera</li>
      </ul>
      
      <p><strong>Solución:</strong></p>
      <p>$$\\int_0^\\infty xe^{-x^2}\\,dx = \\lim_{t \\to \\infty} \\int_0^t xe^{-x^2}\\,dx$$</p>
      
      <p>Usando sustitución $u = -x^2$, $du = -2x\\,dx$:</p>
      <p>$$\\int xe^{-x^2}\\,dx = -\\frac{1}{2}\\int e^u\\,du = -\\frac{1}{2}e^u = -\\frac{1}{2}e^{-x^2}$$</p>
      
      <p>Evaluamos:</p>
      <p>$$\\lim_{t \\to \\infty} \\left[-\\frac{1}{2}e^{-x^2}\\right]_0^t = \\lim_{t \\to \\infty} \\left(-\\frac{1}{2}e^{-t^2} + \\frac{1}{2}\\right) = 0 + \\frac{1}{2} = \\frac{1}{2}$$</p>
      
      <p><strong>Conclusión:</strong> La integral converge a $\\frac{1}{2}$.</p>
    </div>

    <div class="theory-section">
      <h3>💡 Consejos Importantes</h3>
      <ul>
        <li><strong>Identificación:</strong> Siempre verificar TODOS los problemas (límites infinitos Y discontinuidades)</li>
        <li><strong>División:</strong> Elegir puntos de división que simplifiquen el análisis</li>
        <li><strong>Independencia:</strong> Cada parte debe analizarse por separado</li>
        <li><strong>Convergencia:</strong> Solo converge si TODAS las partes convergen</li>
      </ul>
    </div>
  `
};
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

    
    // Event listeners para modal de teoría
    theoryBtn.addEventListener('click', showTheoryModal);
    theoryClose.addEventListener('click', hideTheoryModal);
    theoryModal.addEventListener('click', function(e) {
      if (e.target === theoryModal) {
        hideTheoryModal();
      }
    });

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

  function showTheoryModal(event) {
    if (event) {
      event.preventDefault();
    }
    if (!currentType) {
      theoryBody.innerHTML = `
        <div class="theory-section">
          <h2>📖 Teoría de Integrales Impropias</h2>
          <p><strong>Conceptos fundamentales y clasificación completa</strong></p>
        </div>
        
        <div class="theory-section">
          <h3>Tipos de Integrales Impropias</h3>
          
          <div class="theory-section">
            <h4>🔄 Primera Especie</h4>
            <p>Límites de integración infinitos</p>
            <p>$$\\int_a^\\infty f(x)\\,dx$$</p>
          </div>
          
          <div class="theory-section">
            <h4>⚡ Segunda Especie</h4>
            <p>Discontinuidades en el integrando</p>
            <p>$$\\int_0^1 \\frac{1}{\\sqrt{x}}\\,dx$$</p>
          </div>
          
          <div class="theory-section">
            <h4>🔀 Tercera Especie</h4>
            <p>Combinación de ambas</p>
            <p>$$\\int_0^\\infty \\frac{1}{\\sqrt{x}}\\,dx$$</p>
          </div>
        </div>
        
        <p><strong>Selecciona un tipo específico para ver su teoría detallada.</strong></p>
      `;
    } else {
      theoryBody.innerHTML = theoryContent[currentType] || '<p>Contenido no disponible.</p>';
    }

    theoryModal.classList.add('show');

    // Renderizar MathJax en modal
    setTimeout(() => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise([theoryBody]).then(() => {
          console.log('✅ MathJax renderizado en modal');
        }).catch(err => console.error('❌ Error MathJax modal:', err));
      }
    }, 200);
  }

  function hideTheoryModal() {
    theoryModal.classList.remove('show');
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
