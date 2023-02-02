'use strict';

const canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 600;

const ctx = canvas.getContext('2d');
ctx.lineWidth = 2;
ctx.strokeStyle = 'black';

let isPainting = false;

// Color changing
function updateColor(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
}

const btns = document.querySelectorAll('.color');
btns.forEach((btn) => {
    btn.addEventListener('click', updateColor);
})

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

    canvas.addEventListener('mousedown', () => isPainting = true);

    canvas.addEventListener('mouseup', () => isPainting = false);

    canvas.addEventListener('mouseleave', () => isPainting = false);
}