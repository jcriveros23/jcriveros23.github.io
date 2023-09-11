import "./matrixEffect.css"
import React, { Component } from 'react';

class MatrixEffect extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas2Ref = React.createRef();
    this.fallingCharArr = [];
    this.fontSize = 15;
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const canvas2 = this.canvas2Ref.current;
    const ctx2 = canvas2.getContext('2d');

    // full screen dimensions
    const cw = window.innerWidth;
    const ch = window.innerHeight/3;
    const charArr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const maxCharCount = 100;
    const maxColums = cw / this.fontSize;

    canvas.width = canvas2.width = cw;
    canvas.height = canvas2.height = ch;

    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function randomFloat(min, max) {
      return Math.random() * (max - min) + min;
    }

    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    Point.prototype.draw = function (ctx) {
      this.value = charArr[randomInt(0, charArr.length - 1)].toUpperCase();
      this.speed = randomFloat(1, 5);

      ctx2.fillStyle = 'rgba(255,255,255,0.2)';
      ctx2.font = this.fontSize + 'px san-serif';
      ctx2.fillText(this.value, this.x, this.y);

      ctx.fillStyle = '#0F0';
      ctx.font = this.fontSize + 'px san-serif';
      ctx.fillText(this.value, this.x, this.y);

      this.y += this.speed;
      if (this.y > ch) {
        this.y = randomFloat(-100, 0);
        this.speed = randomFloat(2, 5);
      }
    };

    for (let i = 0; i < maxColums; i++) {
      this.fallingCharArr.push(new Point(i * this.fontSize, randomFloat(-500, 0)));
    }

    const update = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.02)';
      ctx.fillRect(0, 0, cw, ch);
      ctx2.clearRect(0, 0, cw, ch);

      let i = this.fallingCharArr.length;

      while (i--) {
        this.fallingCharArr[i].draw(ctx);
        const v = this.fallingCharArr[i];
      }

      requestAnimationFrame(update);
    };

    update();
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef}>Canvas is not supported in your browser.</canvas>
        <canvas ref={this.canvas2Ref}>Canvas is not supported in your browser.</canvas>
      </div>
    );
  }
}

export default MatrixEffect;