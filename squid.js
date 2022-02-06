/* global createCanvas, preload, width, height, random, background, fill, ellipse, loadImage, squidwardImage, image, require */

// Velocity code implementation from flappy bird game, https://www.youtube.com/watch?v=cXgA1d_E-jY

function Squid() {
  let squidwardImage = loadImage(
    "https://cdn.glitch.com/3a854730-1289-41bc-a292-f4c308f49a29%2Fsquidwardrunningpng.png?v=1627922413729"
  );

  this.y = height / 2;
  this.x = 64;

  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;
  let upVel = 12;

  // could replace this code later with the game character instead of circle
  this.show = function() {
    image(squidwardImage, this.x - 30, this.y - 80, 64, 89);
    fill(255);
    //ellipse(this.x, this.y, 64, 32);
  };

  this.up = function() {
    this.velocity += this.lift;
  };

  this.update = function() {
    this.velocity += this.gravity;
    if (this.velocity < -upVel) this.velocity = -upVel ; //limit upward vel
    if (this.velocity > 20) this.velocity = 20; //limit downward vel
    this.y += this.velocity;

    if (this.y > height - upVel) {
      this.y = height - upVel;
      this.velocity = 0;
    }
    if (this.y < 15) {        
      this.y = 15;
      this.velocity = 15;
    }
  };
}