import { canvas, c } from "./helper/var";
import Aliens from "./Aliens.js";

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let toggle = true;

const alien = new Aliens(canvas.width / 2, 100, 60, 30);

class GameField {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}

const leftColumn = new GameField(200, 0, 1, canvas.height);
const rightColumn = new GameField(canvas.width - 200, 0, 1, canvas.height);

class SpaceShip {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height;
    this.img = "./src/images/ship.svg";
    this.height = 30;
    this.width = 60;
    this.vx = 10;
    this.vy = 10;
  }

  draw() {
    // spaceship
    c.fillRect(this.x, this.y - this.height - 20, this.width, this.height);

    // gun
    c.fillRect(this.x + this.width / 2.2, this.y - this.height - 30, 10, 10);
  }

  move() {
    this.draw();
  }

  borders() {
    if (this.x <= 200) {
      this.x = 200;
    }
    if (this.x + this.width >= canvas.width - 200) {
      this.x = canvas.width - 200 - this.width;
    }
  }
}

class Bullet {
  constructor(x) {
    this.x = x;
    this.y = ship.y - ship.height - 30;
    this.width = 10;
    this.height = 15;
  }

  draw() {
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  fly() {
    this.draw();
    this.y -= 5;
  }

  aimDetection() {
    this.fly();

    if (
      this.x + this.width >= alien.x &&
      this.x <= alien.x + alien.width &&
      this.y + this.height >= alien.y &&
      this.y <= alien.y + alien.height
    ) {
      console.log("killed");
    }
  }
}

let fire = false;
const ship = new SpaceShip();
alien.move();

// array of bullets
const bullets = [];
function animation() {
  requestAnimationFrame(animation);
  c.clearRect(0, 0, canvas.width, canvas.height);
  ship.move();
  ship.borders();
  leftColumn.draw();
  rightColumn.draw();
  alien.draw();

  bullets.map(bullet => {
    if (fire) {
      bullet.aimDetection();
    }
  });
}

if (toggle) {
  document.addEventListener("keydown", e => {
    if (e.keyCode === 37) {
      // bullets.push(new Bullet(ship.x + ship.width / 2.2));
      ship.x -= ship.vx;
      if (!fire) {
        // bullet.x -= ship.vx;
      }
    }
    if (e.keyCode === 39) {
      // bullets.push(new Bullet(ship.x + ship.width / 2.2));

      ship.x += ship.vx;
      if (!fire) {
        // bullet.x += ship.vx;
      }
    }
    if (e.keyCode === 32) {
      bullets.push(new Bullet(ship.x + ship.width / 2.2));

      fire = true;
    }
  });
}

animation();
