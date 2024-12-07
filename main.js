import { Track } from './track.js';

class Game {
    constructor(canvasId, fileInputId, loadButtonId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.car = { x: 100, y: 100, width: 10, height: 6, speed: 0.05, angle: 0, velocity: { x: 0, y: 0 } };
        this.keys = {};
        this.track = new Track(fileInputId, loadButtonId, this.context, 30, 15);

        

        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
    }

    start() {
        console.log('Game started');
        this.update();
    }

    update() {
        this.clear();
        this.moveCar();
        this.track.makeTrack();
        this.draw();
        requestAnimationFrame(() => this.update());
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    moveCar() {
        if (this.keys['ArrowUp']) {
            this.car.velocity.x += this.car.speed * Math.cos(this.car.angle);
            this.car.velocity.y += this.car.speed * Math.sin(this.car.angle);
        }
        if (this.keys['ArrowDown']) {
            this.car.velocity.x -= this.car.speed * Math.cos(this.car.angle);
            this.car.velocity.y -= this.car.speed * Math.sin(this.car.angle);
        }
        if (this.keys['ArrowLeft']) {
            this.car.angle -= 0.05; // Adjust the rotation speed as needed
        }
        if (this.keys['ArrowRight']) {
            this.car.angle += 0.05; // Adjust the rotation speed as needed
        }
        
        if (this.checkCollision()) {
            this.car.velocity.x *= 0.9;
            this.car.velocity.y *= 0.9;
        }

        // Apply friction to slow down the car gradually
        this.car.velocity.x *= 0.98;
        this.car.velocity.y *= 0.98;

        // Update car position
        this.car.x += this.car.velocity.x;
        this.car.y += this.car.velocity.y;

        // Ensure the car stays within the canvas boundaries
        if (this.car.x < 0) this.car.x = 0;
        if (this.car.x > this.width) this.car.x = this.width;
        if (this.car.y < 0) this.car.y = 0;
        if (this.car.y > this.height) this.car.y = this.height;
    }
    checkCollision() {
        // Calculate the car's position on the track grid
        const carGridX = Math.floor(this.car.x / this.track.xScale);
        const carGridY = Math.floor(this.car.y / this.track.yScale);
    
        // Check if the car's position is within the bounds of the track
        if (carGridY >= 0 && carGridY < this.track.track.length && carGridX >= 0 && carGridX < this.track.track[carGridY].length) {
            // Check the track element at the car's position
            if (this.track.track[carGridY][carGridX] === '#') {
                return true;
            }
        }

        return false;
    }
    draw() {
        this.context.save();
        this.context.translate(this.car.x, this.car.y);
        this.context.rotate(this.car.angle);
        this.context.fillStyle = 'red';
        this.context.fillRect(-this.car.width / 2, -this.car.height / 2, this.car.width, this.car.height);
        this.context.restore();
    }

}
const game = new Game('game', "file", "load");
game.start();