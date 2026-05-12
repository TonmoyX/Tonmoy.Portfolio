// Star Canvas Animation
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
const STAR_COUNT = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function createStar() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const baseRadius = randomBetween(0.5, 1.7);
    const twinklePhase = Math.random() * Math.PI * 2;
    return {
        x,
        y,
        baseRadius,
        radius: baseRadius,
        twinklePhase,
        twinkleSpeed: randomBetween(0.8, 1.8),
        opacity: randomBetween(0.7, 1)
    };
}

function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(createStar());
    }
}

function drawStars(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.001 * star.twinkleSpeed + star.twinklePhase);
        star.radius = star.baseRadius * (0.6 + 0.4 * twinkle);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 10 * twinkle;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function animate(time) {
    drawStars(time);
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initStars();
});

resizeCanvas();
initStars();
animate(0);

// Scroll to Top Button logic
const scrollBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
        scrollBtn.style.display = 'flex';
    } else {
        scrollBtn.classList.remove('show');
        scrollBtn.style.display = 'none';
    }
});
