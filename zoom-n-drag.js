// Seleciona o contêiner do SVG
const svgWrapper = document.getElementById('svg-wrapper');
// Seleciona o botão de centralizar
const centralizeButton = document.getElementById('btn-centralize');

// Variáveis para controlar o movimento do SVG
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;
let scale = 1;
let maxDraggingX = (svgWrapper.clientWidth / ((scale + 10) / 10)) - 200;
let maxDraggingY = (svgWrapper.clientHeight / ((scale + 10) / 10)) - 200;

// Adiciona um ouvinte de evento para o clique do botão
centralizeButton.addEventListener('click', function () {
  translateX = 0, translateY = 0;
  scale = 1;
  svgWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});

// Adiciona um ouvinte de evento para pressionar o mouse
svgWrapper.addEventListener('mousedown', function (event) {
  if (event.button === 1 || event.button === 2) {
    event.preventDefault();

    maxDraggingX = (svgWrapper.clientWidth / ((scale + 10) / 10)) - 200;
    maxDraggingY = (svgWrapper.clientHeight / ((scale + 10) / 10)) - 200;

    // Atualiza o estado do movimento para true
    isDragging = true;
  
    startX = event.clientX;
    startY = event.clientY;
  
    svgWrapper.classList.add('grabbing');
  }
});

// Adiciona um ouvinte de evento para soltar o mouse
window.addEventListener('mouseup', function () {
  isDragging = false;
  svgWrapper.classList.remove('grabbing');
});

// Adiciona um ouvinte de evento para mover o mouse
window.addEventListener('mousemove', function (event) {
  if (!isDragging) return;

  // Calcula a distância percorrida pelo mouse, dividindo pelo fator de escala
  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;

  // Atualiza as posições de translação do SVG
  translateX += deltaX;
  translateY += deltaY;

  if(translateX >= maxDraggingX) {
    translateX = maxDraggingX
  } else if(translateX <= -maxDraggingX) {
    translateX = -maxDraggingX
  }else if(translateY >= maxDraggingY) {
    translateY = maxDraggingY
  } else if(translateY <= -maxDraggingY) {
    translateY = -maxDraggingY
  }

  // Aplica a transformação de translação e escala ao SVG
  svgWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

  // Atualiza as coordenadas iniciais do mouse
  startX = event.clientX;
  startY = event.clientY;
});

window.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

// Adiciona um ouvinte de evento para a roda do mouse (zoom)
svgWrapper.addEventListener('wheel', function (event) {
  event.preventDefault();

  const direction = event.deltaY < 0 ? 1 : -1;

  scale += direction === 1 ? 1 : -1;

  // Limita o zoom mínimo e máximo
  if (scale < 1) scale = 1;
  if (scale > 2) scale = 2;

  // Aplica a transformação de translação e escala ao SVG
  svgWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});