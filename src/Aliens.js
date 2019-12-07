import { c, canvas } from "./helper/var.js";

export default class Aliens {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vx = 10;
  }

  draw() {
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    setInterval(() => {
      this.x -= this.vx;
      if (this.x <= 300) {
        this.vx = -this.vx;
      } else if (this.x + this.width >= canvas.width - 300) {
        this.vx = -this.vx;
      }
    }, 300);

    // console.log(this.x);
  }
}
