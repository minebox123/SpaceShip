import { canvas, c } from "./helper/var";
import Aliens from "./Aliens.js";

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

class Star {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 1;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fill();
  }

  move() {
    this.y += this.speed;

    if (this.y + this.radius >= canvas.height) {
      this.x = randomNum(0, canvas.width);
      this.y = 0;
    }
  }
}

const leftColumn = new GameField(200, 0, 1, canvas.height);
const rightColumn = new GameField(canvas.width - 200, 0, 1, canvas.height);

class SpaceShip {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height;
    this.img = "./src/images/ship.svg";
    this.height = 20;
    this.width = 40;
    this.vx = 10;
    this.vy = 10;
  }

  draw() {
    // spaceship
    c.fillRect(this.x, this.y - this.height - 20, this.width, this.height);

    // gun
    c.fillRect(this.x + this.width / 2.6, this.y - this.height - 30, 10, 10);
  }

  move() {
    this.draw();
  }

  borders() {
    if (this.x <= leftColumn.x) {
      this.x = leftColumn.x;
    }
    if (this.x + this.width >= canvas.width - 200) {
      this.x = canvas.width - 200 - this.width;
    }
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 15;
    this.exist = true;
  }

  draw() {
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  fly() {
    this.draw();
    this.y -= 5;
  }

  alienShot() {
    this.y += 5;
  }
}

// let fire = false;
const ship = new SpaceShip();

const aliens = [];
for (let col = 0; col < 5; col++) {
  for (let row = 0; row < 4; row++) {
    aliens.push(new Aliens(col * 60 + 400, row * 40 + 50, 35, 25));
  }
}

const randomNum = (min, max) => Math.random() * (max - min) + min;
const stars = [];
for (let i = 0; i < 30; i++) {
  stars.push(
    new Star(
      randomNum(0, canvas.width),
      randomNum(0, canvas.height),
      randomNum(1, 3)
    )
  );
}

// array of bullets
const bullets = [];
const aliensBullets = [];

for (let i = 0; i < aliens.length; i++) {
  let alien = aliens[i];
  for (let j = 0; j < 10; j++) {
    aliensBullets.push(new Bullet(alien.x + alien.width / 2, alien.y));
  }
}

console.log(aliensBullets);

let points = 0;
let game = true;
function animation() {
  if (game) requestAnimationFrame(animation);

  c.clearRect(0, 0, canvas.width, canvas.height);
  ship.move();
  ship.borders();
  // leftColumn.draw();
  // rightColumn.draw();

  let borders = false;
  aliens.map(al => al.draw());
  for (let i = 0; i < aliens.length; i++) {
    let invader = aliens[i];
    invader.x += invader.vx;
    if (invader.x + invader.width >= canvas.width - 200 || invader.x <= 200) {
      borders = true;
    }
  }

  if (borders) {
    for (let i = 0; i < aliens.length; i++) {
      let invader = aliens[i];
      // invader.y += 10;
      invader.vx = -invader.vx;
    }
  }

  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    bullet.fly();

    if (bullet.y <= 0) {
      bullets.splice(0, 1);
    }
  }

  for (let i = 0; i < aliens.length; i++) {
    let invader = aliens[i];

    for (let j = 0; j < bullets.length; j++) {
      let bullet = bullets[j];
      if (
        invader.x + invader.width >= bullet.x &&
        invader.x <= bullet.x + bullet.width &&
        invader.y + invader.height >= bullet.y &&
        invader.y <= bullet.y + bullet.height
      ) {
        let killedInvaderIndex = aliens.indexOf(invader);
        let reachedBullet = bullets.indexOf(bullet);
        aliens.splice(killedInvaderIndex, 1);
        bullets.splice(reachedBullet, 1);
        points += 10;
      }
    }
  }
  c.textAlign = "left";
  c.font = "30px Arial";
  c.fillText(`Points: ${points}`, 10, 50);

  // STARS
  stars.map(star => {
    star.draw();
    star.move();
  });

  // ALIEN BULLETS
  if (aliens.length === 0) {
    ship.y -= 5;
  }

  if (ship.y + ship.height <= 0) {
    c.textAlign = "center";
    c.fillText("You won!", canvas.width / 2, canvas.height / 2);
    c.fillText(
      "Press space to start a new game",
      canvas.width / 2,
      canvas.height / 2 + 50
    );
    game = false;
  }
}

if (toggle) {
  document.addEventListener("keydown", e => {
    if (e.keyCode === 37) {
      ship.x -= ship.vx;
    }
    if (e.keyCode === 39) {
      ship.x += ship.vx;
    }
    if (e.keyCode === 32) {
      bullets.push(
        new Bullet(ship.x + ship.width / 2.2, ship.y - ship.height - 30)
      );
    }
    if (game === false && e.keyCode === 32) {
      document.location.reload(true);
    }
  });
}

animation();
