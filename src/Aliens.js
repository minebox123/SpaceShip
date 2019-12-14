import { c, canvas } from "./helper/var.js";

export default class Aliens {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vx = 3;
  }

  draw() {
    c.fillStyle = "#fff";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}
