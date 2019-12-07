import { canvas, c } from "./helper/var";

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let toggle = true;

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
    this.fireWidth = 5;
    this.fireHeight = 15;
    this.fireY = this.y - this.height - 20;
    this.bulletX = this.x + this.width / 2.2;
    this.bulletY = this.y - this.height - 30;
  }

  draw() {
    c.fillRect(this.x, this.y - this.height - 20, this.width, this.height);
  }

  // drawBullet() {
  //   // draw a bullet
  //   c.fillRect(this.bulletX, this.bulletY, 10, 15);
  // }

  move() {
    this.draw();
  }

  // fire() {
  //   this.bulletY -= this.vy;
  // }

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
}

let fire = false;
const ship = new SpaceShip();

// array of bullets
const bullets = [];

function animation() {
  requestAnimationFrame(animation);
  c.clearRect(0, 0, canvas.width, canvas.height);
  ship.move();
  ship.borders();
  leftColumn.draw();
  rightColumn.draw();

  bullets.map(bullet => {
    if (fire) {
      bullet.fly();
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
