'use strict';

const WIDTH = 800;
const HEIGHT = 600;

const canvas = document.querySelector('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, WIDTH, HEIGHT);

ctx.lineWidth = 2;
ctx.strokeStyle = 'black';
ctx.fillStyle = 'black';

let isPainting = false;
let isFilling = false;

// Color changing
function updateColor(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}

const btns = document.querySelectorAll('.color');
btns.forEach((btn) => {
    btn.addEventListener('click', updateColor);
})

// Changing line width (thickness)
function updateLineWidth(event) {
    ctx.lineWidth = event.target.value;
}

const inpRange = document.querySelector('.thickness');
inpRange.addEventListener('input', updateLineWidth);

// Changing between Drawing and Fill modes
function updateMode(event) {
    if(isFilling) {
        isFilling = false;
        isPainting = true;
        btnMode.textContent = 'Fill';
    } else {
        isFilling = true;
        isPainting = false;
        btnMode.textContent = 'Draw';
    }
}

const btnMode = document.querySelector('.mode');
btnMode.addEventListener('click', updateMode);


// Filling canvas
function fillCanvas() {
    if(isFilling) {
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }
}

// Saving the canvas
function saveCanvas() {
    const img = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = img;
    link.download = 'image';
    link.click();
}

const btnSave = document.querySelector('.save');
btnSave.addEventListener('click', saveCanvas);

if(!canvas) {
    console.log('Error: Canvas not loaded');
} else {
    canvas.addEventListener('mousemove', function(event) {
        let x = event.offsetX;
        let y = event.offsetY;
        
        if(!isPainting) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mousedown', () => isPainting = !isFilling);

    canvas.addEventListener('mouseup', () => isPainting = false);

    canvas.addEventListener('mouseleave', () => isPainting = false);

    canvas.addEventListener('click', fillCanvas);

    canvas.addEventListener('contextmenu', event => event.preventDefault());
}