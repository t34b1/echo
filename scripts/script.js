let isTabVisible = true;
const canvas = document.querySelector(".starfield");
const ctx = canvas.getContext("2d");

const width = window.innerWidth;
const height = window.visualViewport?.height || window.innerHeight;
const scale = window.devicePixelRatio || 1;

canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
canvas.width = width * scale;
canvas.height = height * scale;

ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform just in case
ctx.scale(scale, scale);

canvas.style.backgroundColor = "#FAF9F8";
const defaultColor = "rgba(230, 228, 228, 0.5)";
const radius = 4;
const spacing = 26;

let columns = Math.floor(width / spacing);
let rows = Math.floor(height / spacing);

let colors = {
  cornflower: { r: 102, g: 145, b: 229 },
  dustyRose: { r: 216, g: 146, b: 193 },
  plum: { r: 70, g: 13, b: 99 },
  cherry: { r: 228, g: 60, b: 60 },
  emerald: { r: 72, g: 156, b: 99 },
};

function rgba(color, opacity = 1) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
}

let dots = [];
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < columns; col++) {
    dots.push({
      x: spacing / 2 + col * spacing,
      y: spacing / 2 + row * spacing,
      radius,
      active: false,
      colorData: null,
      startTime: null,
      pulseScale: Math.random() * 1.5 + 1, 

    });
  }
}

// Activate a new dot at intervals
setInterval(() => {
  const dot = dots[Math.floor(Math.random() * dots.length)];
  dot.active = true;
  dot.startTime = performance.now();
  dot.colorData = Object.values(colors)[Math.floor(Math.random() * 5)];
}, 750);

let frameCount = 0;

// Central animation loop
function animate() {
  frameCount++;
  if (frameCount % 2 === 0) return requestAnimationFrame(animate); // Skip every other frame

  if (!isTabVisible) {
    requestAnimationFrame(() => animate());
    return;
  }  

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const now = performance.now();
  const duration = 1800;

  for (let dot of dots) {
    const isActive = dot.active && dot.startTime != null;
  
    if (isActive) {
      let elapsed = now - dot.startTime;
  
      if (elapsed > duration) {
        dot.active = false;
        dot.colorData = null;
        dot.startTime = null;
      } else {
        const progress = (elapsed % duration) / duration;
        const pulse = Math.sin(progress * Math.PI) * dot.pulseScale;
        const color = dot.colorData;
  
        // Glow layer
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius * (2.5 + pulse), 0, Math.PI * 2);
        ctx.fillStyle = rgba(color, 0.3);
        ctx.fill();
        ctx.closePath();
  
        // Middle layer
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius * (1.5 + pulse), 0, Math.PI * 2);
        ctx.fillStyle = rgba(color, 0.6);
        ctx.fill();
        ctx.closePath();
      }
    }
  
    // Base dot
    const color = isActive && dot.colorData ? rgba(dot.colorData, 1) : defaultColor;
    const size = isActive && dot.colorData ? radius * 2 : radius;
  
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  requestAnimationFrame(animate);
}

document.addEventListener("visibilitychange", () =>{
    isTabVisible = !document.hidden;
});
animate();