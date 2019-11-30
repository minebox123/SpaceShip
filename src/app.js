import {
    canvas,
    c
} from "./helper/var";


canvas.height = window.innerHeight;
canvas.width = window.innerWidth;




class SpaceShip {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height;
        this.img = "./src/images/ship.svg";
        this.height = 30;
        this.width = 60;
        this.vx = 10;
        this.vy = 10;
        this.fireWidth = 5;
        this.fireHeight = 15;
        this.fireY = this.y - this.height - 20;
    }

    draw() {
        // const img = new Image();
        // img.onload = () => {
        //     c.drawImage(img, this.x, this.y, this.width, this.height);
        //     // this.x += this.vx
        // }
        // img.src = this.img;

        c.fillRect(this.x, this.y - this.height - 20, this.width, this.height);

        c.fillRect(this.x + this.width / 2, this.fireY, this.fireWidth, this.fireHeight);
    }

    move() {
        this.draw()
    }

    fire() {
        bullet.fire()
    }
}

class Bullet {
    constructor() {
        this.x = ship.x;
        this.y = ship.y - ship.height - 25;
        this.fireWidth = 5;
        this.fireHeight = 15;
    }

    draw() {
        c.fillRect(this.x + ship.width / 2, this.y, this.fireWidth, this.fireHeight);
    }
    fire() {
        this.draw();
        document.addEventListener("keypress", e => {
            if (e.keyCode === 32) {
                this.y -= 8;
            }
        })
    }
}

const ship = new SpaceShip();
const bullet = new Bullet();



function animation() {
    requestAnimationFrame(animation);
    c.clearRect(0, 0, canvas.width, canvas.height);
    ship.move()
    bullet.fire()
};

document.addEventListener("keydown", e => {
    if (e.keyCode === 37) {
        ship.x -= ship.vx;
    }
    if (e.keyCode === 39) {
        ship.x += ship.vx
    }

})




animation();