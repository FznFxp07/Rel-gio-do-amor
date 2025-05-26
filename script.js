const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function Heart(x, y, size, speed) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;
  this.opacity = 1;

  this.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 0, 100, ${this.opacity})`;
    ctx.moveTo(this.x, this.y);

    // Ajuste das curvas para um coração mais arredondado
    ctx.bezierCurveTo(
      this.x - this.size / 2, this.y - this.size,  // Curva esquerda superior
      this.x - this.size, this.y - this.size / 2,  // Curva esquerda inferior
      this.x, this.y // Ponto inferior central
    );
    ctx.bezierCurveTo(
      this.x + this.size, this.y - this.size / 2,  // Curva direita inferior
      this.x + this.size / 2, this.y - this.size,  // Curva direita superior
      this.x, this.y // Fecha o coração
    );
    ctx.fill();
  };

  this.update = function () {
    this.y += this.speed;
    this.opacity -= 0.005;
  };
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, index) => {
    heart.update();
    heart.draw();
    if (heart.opacity <= 0) hearts.splice(index, 1);
  });
  requestAnimationFrame(animateHearts);
}

canvas.addEventListener('click', (e) => {
  for (let i = 0; i < 10; i++) {
    hearts.push(new Heart(
      e.clientX,
      e.clientY,
      Math.random() * 10 + 10,
      Math.random() * 2 + 1
    ));
  }
});

animateHearts();

// ========== RELÓGIO PROGRESSIVO ==========
function updateClock() {
  const startDate = new Date("2025-01-21T00:00:00"); // Data de início
  const now = new Date();
  const diffMs = now - startDate;

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const diffSeconds = Math.floor((diffMs / 1000) % 60);

  document.getElementById('clock').textContent =
    `${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
}

setInterval(updateClock, 1000);
updateClock();

// === MENSAGENS EM LOOP ===
const MENSAGENS = [
  "Você vai ser minha alma para sempre!",
  "Cada segundo ao seu lado é um presente.",
  "Nosso amor cresce a cada batida.",
  "Desde o começo de 2025, minha vida mudou.",
  "Amar você é minha melhor escolha.",
  "Eu te amo mais do que ontem e vou amar muito mais amanhã.",
  "Eu amo te amar, e essa é a melhor sensação do mundo."
];

let currentMessage = 0;
function showNextMessage() {
  const messageEl = document.getElementById('message');
  messageEl.style.opacity = 0;

  setTimeout(() => {
    messageEl.textContent = MENSAGENS[currentMessage];
    messageEl.style.animation = 'none';
    void messageEl.offsetWidth;
    messageEl.style.animation = null;

    messageEl.style.opacity = 1;
    currentMessage = (currentMessage + 1) % MENSAGENS.length;
  }, 500);
}

showNextMessage();
setInterval(showNextMessage, 6000);
