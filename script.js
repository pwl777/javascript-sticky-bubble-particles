/* ------ JavaScript - Sticky Bubble Particles ------ */
//------ canvas 1 ------
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//------ canvas 2 ------
const canvasbg = document.getElementById('canvasbg');
const ctxbg = canvasbg.getContext('2d');
canvasbg.width = window.innerWidth;
canvasbg.height = window.innerHeight;

let Bubbles = [];
let bgBubbles = [];

function addBubble() {
    Bubbles.push(new Bubble('rgb(255,194,194', 3.8)); // was 1.8
}
function addBgBubble() {
    bgBubbles.push(new Bubble('rgb(255,255,255', 5.5)); // was 2.5
}
class Bubble {
    constructor (color, ySpeed) {
        this.radius = (Math.random() * 150)+ 30;
        this.life = true;
        this.x = (Math.random() * window.innerWidth);
        this.y = (Math.random() * 20) + window.innerHeight + this.radius;
        this.vy = (Math.random() * 0.0002 + 0.001) +  ySpeed; // vy is for the upward velocity / speed of the particles.
        this.vr = 0; // vr is the velocity radius. refers to how fast the bubbles shrink.
        this.vx = (Math.random() * 4) - 2; // vx refers to the horizontal x axis particle movement.
        this.color = color;
    }
    update() {
        this.vy += 0.00001; // for every frame the bubbles gradually keep rising and speed increases.
        this.vr += 0.02; // the longer the bubble is alive the faster it will shrink.
        this.y -= this.vy;
        this.x += this.vx;
        if (this.radius > 1) {
            this.radius -= this.vr;
        }
        if (this.radius <= 1) {
            this.life = false;
        }
    }
    draw(currentCanvas) { // the draw method needs to know which canvas to draw on.
        currentCanvas.beginPath();
        currentCanvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        currentCanvas.fillStyle = this.color;
        currentCanvas.fill();
    }
}
function handleBubbles() {
    // canvas 1
    for (let i = Bubbles.length - 1; i >= 0; i--){
        Bubbles[i].update();
        if (!Bubbles[i].life){ // (!Bubbles[i].life === true)  |<--- could also write this.
            Bubbles.splice(i, 1); // i is the index of a particle in the array, 1 equals the amount of particles to delete if life is set to false.
        }
    }
    // canvas 2
    for (let i = bgBubbles.length - 1; i >= 0; i--){
        bgBubbles[i].update();
        if (!bgBubbles[i].life){ // (!Bubbles[i].life === true)  |<--- could also write this.
            bgBubbles.splice(i, 1); // i is the index of a particle in the array, 1 equals the amount of particles to delete if life is set to false.
        }
    }

    if (Bubbles.length < (window.innerWidth / 4)){
        addBubble();
    }
    if (bgBubbles.length < (window.innerWidth / 12)){
        addBgBubble();
    }
}
function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height); // for canvas 1.
    ctxbg.clearRect(0,0,canvas.width, canvas.height); // for canvas 2.

    handleBubbles();

    for (let i = bgBubbles.length - 1; i >= 0; i--){
        bgBubbles[i].draw(ctxbg);
    }
    for (let i = Bubbles.length - 1; i >= 0; i--){
        Bubbles[i].draw(ctx);
    }

    requestAnimationFrame(animate); // recursive loop call.
}
 window.addEventListener('load', animate);
// allows the particles to resize with the responisve window.
 window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasbg.width = window.innerWidth;
    canvasbg.height = window.innerHeight;
    let Bubbles = [];
    let bgBubbles = [];
 });