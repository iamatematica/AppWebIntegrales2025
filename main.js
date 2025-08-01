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
  
  // Modal de teoría
  const theoryBtn = document.getElementById('theory-btn');
  const theoryModal = document.getElementById('theory-modal');
  const theoryClose = document.getElementById('theory-close');
  const theoryBody = document.getElementById('theory-body');

  // ========== VARIABLES DE ESTADO ==========
  let currentType = null;
  let currentExercise = 0;
  let currentStep = 0;
  let score = 0;
  let selectedOption = null;

  // ========== DATOS DE EJERCICIOS ==========
  const exercisesByType = {
    primera: [
      {
        name: "$$\\int_3^\\infty \\frac{1}{x^4} dx$$",
        description: "Integral impropia de primera especie con límite superior infinito",
        steps: [
          {
            title: "Paso 1: Identificación del tipo de integral",
            question: "¿Qué tipo de integral impropia es $\\int_3^\\infty \\frac{1}{x^4} dx$?",
            options: [
              { text: "Integral propia porque el integrando está definido", correct: false },
              { text: "Integral impropia de primera especie por el límite superior infinito", correct: true },
              { text: "Integral impropia de segunda especie por discontinuidad", correct: false }
            ],
            explanation: "Correcto: Es de primera especie porque tiene límite superior infinito ($\\infty$).",
            hint: "Observa los límites de integración. ¿Alguno es infinito?"
          },
          {
            title: "Paso 2: Definición como límite",
            question: "¿Cómo se reescribe esta integral impropia como límite?",
            options: [
              { text: "$\\int_3^\\infty \\frac{1}{x^4} dx = \\lim_{b \\to 0^-} \\int_3^b \\frac{1}{x^4} dx$", correct: false },
              { text: "$\\int_3^\\infty \\frac{1}{x^4} dx = \\lim_{b \\to \\infty} \\int_3^b \\frac{1}{x^4} dx$", correct: true },
              { text: "$\\int_3^\\infty \\frac{1}{x^4} dx = \\lim_{a \\to -\\infty} \\int_a^3 \\frac{1}{x^4} dx$", correct: false }
            ],
            explanation: "Correcto: En integrales impropias con límite superior infinito, reemplazamos $\\infty$ por $b$ y tomamos $\\lim_{b \\to \\infty}$.",
            hint: "El límite infinito se convierte en una variable que tiende a infinito."
          },
          {
            title: "Paso 3: Cálculo de la antiderivada",
            question: "¿Cuál es la antiderivada de $\\frac{1}{x^4}$?",
            options: [
              { text: "$\\int \\frac{1}{x^4} dx = -\\frac{1}{3x^3} + C$", correct: true },
              { text: "$\\int \\frac{1}{x^4} dx = \\frac{1}{4x^4} + C$", correct: false },
              { text: "$\\int \\frac{1}{x^4} dx = -\\frac{1}{4x^5} + C$", correct: false }
            ],
            explanation: "Correcto: $\\frac{1}{x^4} = x^{-4}$, entonces $\\int x^{-4} dx = \\frac{x^{-3}}{-3} = -\\frac{1}{3x^3} + C$",
            hint: "Usa la regla de potencias: $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$ con $n = -4$."
          },
          {
            title: "Paso 4: Evaluación de la integral definida",
            question: "Al evaluar $\\int_3^b \\frac{1}{x^4} dx$ usando la antiderivada, obtenemos:",
            options: [
              { text: "$\\left[-\\frac{1}{3x^3}\\right]_3^b = -\\frac{1}{3b^3} + \\frac{1}{81}$", correct: true },
              { text: "$\\left[-\\frac{1}{3x^3}\\right]_3^b = -\\frac{1}{3b^3} - \\frac{1}{81}$", correct: false },
              { text: "$\\left[-\\frac{1}{3x^3}\\right]_3^b = \\frac{1}{3b^3} - \\frac{1}{81}$", correct: false }
            ],
            explanation: "Correcto: $\\left[-\\frac{1}{3x^3}\\right]_3^b = -\\frac{1}{3b^3} - \\left(-\\frac{1}{3(3)^3}\\right) = -\\frac{1}{3b^3} + \\frac{1}{81}$",
            hint: "Aplica el teorema fundamental: $F(b) - F(3)$ donde $F(x) = -\\frac{1}{3x^3}$."
          },
          {
            title: "Paso 5: Cálculo del límite",
            question: "¿Cuál es el resultado de $\\lim_{b \\to \\infty} \\left(-\\frac{1}{3b^3} + \\frac{1}{81}\\right)$?",
            options: [
              { text: "$\\infty$ (la integral diverge)", correct: false },
              { text: "$\\frac{1}{81}$", correct: true },
              { text: "$0$", correct: false }
            ],
            explanation: "Correcto: $\\lim_{b \\to \\infty} \\left(-\\frac{1}{3b^3} + \\frac{1}{81}\\right) = 0 + \\frac{1}{81} = \\frac{1}{81}$",
            hint: "¿Qué pasa con $\\frac{1}{3b^3}$ cuando $b \\to \\infty$?"
          },
          {
            title: "Paso 6: Conclusión sobre convergencia",
            question: "¿Qué podemos concluir sobre la integral $\\int_3^\\infty \\frac{1}{x^4} dx$?",
            options: [
              { text: "Converge a $\\frac{1}{81}$", correct: true },
              { text: "Diverge a infinito", correct: false },
              { text: "El límite no existe", correct: false }
            ],
            explanation: "Correcto: La integral converge porque el límite existe y es finito: $\\int_3^\\infty \\frac{1}{x^4} dx = \\frac{1}{81}$",
            hint: "Una integral impropia converge si su límite existe y es finito."
          }
        ]
      }
    ],
    segunda: [
      {
        name: "$$\\int_0^1 \\frac{1}{\\sqrt{x}} dx$$",
        description: "Integral impropia de segunda especie - discontinuidad en x=0",
        steps: [
          {
            title: "Paso 1: Identificación del problema",
            question: "¿Por qué $\\int_0^1 \\frac{1}{\\sqrt{x}} dx$ es una integral impropia?",
            options: [
              { text: "Porque el límite superior es infinito", correct: false },
              { text: "Porque $\\frac{1}{\\sqrt{x}}$ no está definida en $x=0$", correct: true },
              { text: "Porque el integrando es negativo", correct: false }
            ],
            explanation: "Correcto: $\\frac{1}{\\sqrt{x}} = \\frac{1}{\\sqrt{0}}$ no está definida en $x=0$, creando una discontinuidad infinita.",
            hint: "Evalúa $f(0) = \\frac{1}{\\sqrt{0}}$. ¿Está definida?"
          },
          {
            title: "Paso 2: Clasificación del tipo",
            question: "¿Qué tipo de integral impropia es esta?",
            options: [
              { text: "Primera especie (límites infinitos)", correct: false },
              { text: "Segunda especie (discontinuidad en el integrando)", correct: true },
              { text: "Tercera especie (ambas características)", correct: false }
            ],
            explanation: "Correcto: Es de segunda especie porque hay discontinuidad en $x=0$ (extremo del intervalo).",
            hint: "Los límites son finitos, pero hay discontinuidad en el integrando."
          },
          {
            title: "Paso 3: Reescritura como límite",
            question: "¿Cómo se reescribe $\\int_0^1 \\frac{1}{\\sqrt{x}} dx$ como límite?",
            options: [
              { text: "$\\lim_{a \\to 0^+} \\int_a^1 \\frac{1}{\\sqrt{x}} dx$", correct: true },
              { text: "$\\lim_{a \\to 0^-} \\int_a^1 \\frac{1}{\\sqrt{x}} dx$", correct: false },
              { text: "$\\lim_{b \\to \\infty} \\int_0^b \\frac{1}{\\sqrt{x}} dx$", correct: false }
            ],
            explanation: "Correcto: Nos aproximamos a 0 desde la derecha ($0^+$) porque $\\sqrt{x}$ solo está definida para $x \\geq 0$.",
            hint: "La discontinuidad está en $x=0$. ¿Desde qué lado nos aproximamos?"
          },
          {
            title: "Paso 4: Cálculo de la antiderivada",
            question: "¿Cuál es la antiderivada de $\\frac{1}{\\sqrt{x}}$?",
            options: [
              { text: "$\\int \\frac{1}{\\sqrt{x}} dx = 2\\sqrt{x} + C$", correct: true },
              { text: "$\\int \\frac{1}{\\sqrt{x}} dx = \\sqrt{x} + C$", correct: false },
              { text: "$\\int \\frac{1}{\\sqrt{x}} dx = -\\frac{2}{\\sqrt{x}} + C$", correct: false }
            ],
            explanation: "Correcto: $\\frac{1}{\\sqrt{x}} = x^{-1/2}$, entonces $\\int x^{-1/2} dx = \\frac{x^{1/2}}{1/2} = 2\\sqrt{x} + C$",
            hint: "Reescribe $\\frac{1}{\\sqrt{x}}$ como $x^{-1/2}$ y usa la regla de potencias."
          },
          {
            title: "Paso 5: Evaluación de la integral",
            question: "Al evaluar $\\int_a^1 \\frac{1}{\\sqrt{x}} dx$, obtenemos:",
            options: [
              { text: "$[2\\sqrt{x}]_a^1 = 2\\sqrt{1} - 2\\sqrt{a} = 2 - 2\\sqrt{a}$", correct: true },
              { text: "$[2\\sqrt{x}]_a^1 = 2\\sqrt{a} - 2\\sqrt{1} = 2\\sqrt{a} - 2$", correct: false },
              { text: "$[2\\sqrt{x}]_a^1 = 2\\sqrt{1} + 2\\sqrt{a} = 2 + 2\\sqrt{a}$", correct: false }
            ],
            explanation: "Correcto: $[2\\sqrt{x}]_a^1 = 2\\sqrt{1} - 2\\sqrt{a} = 2 - 2\\sqrt{a}$",
            hint: "Aplica el teorema fundamental: $F(1) - F(a)$ donde $F(x) = 2\\sqrt{x}$."
          },
          {
            title: "Paso 6: Cálculo del límite y convergencia",
            question: "¿Cuál es el resultado de $\\lim_{a \\to 0^+} (2 - 2\\sqrt{a})$?",
            options: [
              { text: "$2$ (la integral converge)", correct: true },
              { text: "$\\infty$ (la integral diverge)", correct: false },
              { text: "$0$", correct: false }
            ],
            explanation: "Correcto: $\\lim_{a \\to 0^+} (2 - 2\\sqrt{a}) = 2 - 2\\sqrt{0} = 2 - 0 = 2$. La integral converge a 2.",
            hint: "¿Qué valor toma $\\sqrt{a}$ cuando $a$ se acerca a 0 por la derecha?"
          }
        ]
      }
    ],
    tercera: [
      {
        name: "$$\\int_0^\\infty \\frac{1}{\\sqrt{x(x+1)}} dx$$",
        description: "Integral impropia de tercera especie - discontinuidad en x=0 y límite infinito",
        steps: [
          {
            title: "Paso 1: Análisis del integrando",
            question: "¿Qué problemas presenta la integral $\\int_0^\\infty \\frac{1}{\\sqrt{x(x+1)}} dx$?",
            options: [
              { text: "Solo tiene límite superior infinito", correct: false },
              { text: "Solo tiene discontinuidad en $x=0$", correct: false },
              { text: "Tiene límite infinito Y discontinuidad en $x=0$", correct: true }
            ],
            explanation: "Correcto: Hay dos problemas: límite superior $\\infty$ y discontinuidad en $x=0$ donde $\\frac{1}{\\sqrt{0 \\cdot 1}} = \\frac{1}{0}$.",
            hint: "Examina tanto los límites de integración como el comportamiento del integrando en $x=0$."
          },
          {
            title: "Paso 2: Clasificación del tipo",
            question: "¿Qué tipo de integral impropia es esta?",
            options: [
              { text: "Primera especie solamente", correct: false },
              { text: "Segunda especie solamente", correct: false },
              { text: "Tercera especie (primera + segunda)", correct: true }
            ],
            explanation: "Correcto: Es de tercera especie porque combina características de primera (límite $\\infty$) y segunda especie (discontinuidad en $x=0$).",
            hint: "La tercera especie combina problemas de primera y segunda especie."
          },
          {
            title: "Paso 3: División de la integral",
            question: "¿Cómo se debe dividir esta integral para resolverla?",
            options: [
              { text: "$\\int_0^\\infty f(x)dx = \\int_0^1 f(x)dx + \\int_1^\\infty f(x)dx$", correct: true },
              { text: "$\\int_0^\\infty f(x)dx = \\int_0^{1/2} f(x)dx + \\int_{1/2}^\\infty f(x)dx$", correct: false },
              { text: "No es necesario dividirla", correct: false }
            ],
            explanation: "Correcto: Se divide en $x=1$ para separar la discontinuidad ($\\int_0^1$) del límite infinito ($\\int_1^\\infty$).",
            hint: "Divide en un punto conveniente para tratar cada impropiedad por separado."
          },
          {
            title: "Paso 4: Análisis de $\\int_0^1 \\frac{1}{\\sqrt{x(x+1)}} dx$",
            question: "¿Qué tipo de impropiedad tiene $\\int_0^1 \\frac{1}{\\sqrt{x(x+1)}} dx$?",
            options: [
              { text: "Primera especie (límite infinito)", correct: false },
              { text: "Segunda especie (discontinuidad en $x=0$)", correct: true },
              { text: "Es una integral propia", correct: false }
            ],
            explanation: "Correcto: Es de segunda especie porque $\\frac{1}{\\sqrt{x(x+1)}}$ tiene discontinuidad en $x=0$.",
            hint: "Los límites son finitos, pero el integrando no está definido en $x=0$."
          },
          {
            title: "Paso 5: Análisis de $\\int_1^\\infty \\frac{1}{\\sqrt{x(x+1)}} dx$",
            question: "¿Qué tipo de impropiedad tiene $\\int_1^\\infty \\frac{1}{\\sqrt{x(x+1)}} dx$?",
            options: [
              { text: "Primera especie (límite superior infinito)", correct: true },
              { text: "Segunda especie (discontinuidad)", correct: false },
              { text: "Es una integral propia", correct: false }
            ],
            explanation: "Correcto: Es de primera especie porque tiene límite superior infinito y el integrando es continuo en $[1,\\infty)$.",
            hint: "No hay discontinuidades en $[1,\\infty)$, pero el límite superior es infinito."
          },
          {
            title: "Paso 6: Criterio de convergencia",
            question: "Para que $\\int_0^\\infty \\frac{1}{\\sqrt{x(x+1)}} dx$ converja, ¿qué debe ocurrir?",
            options: [
              { text: "Solo $\\int_0^1 f(x)dx$ debe converger", correct: false },
              { text: "Solo $\\int_1^\\infty f(x)dx$ debe converger", correct: false },
              { text: "Ambas integrales $\\int_0^1 f(x)dx$ e $\\int_1^\\infty f(x)dx$ deben converger", correct: true }
            ],
            explanation: "Correcto: Para que la integral de tercera especie converja, AMBAS partes deben converger independientemente.",
            hint: "Si cualquiera de las dos partes diverge, toda la integral diverge."
          }
        ]
      }
    ]
  };

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
    const exercises = exercisesByType[currentType];
    const exercise = exercises[currentExercise];
    
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

  function showTheoryModal() {
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
  initializeApp();

}); // ← FIN DEL DOMContentLoaded