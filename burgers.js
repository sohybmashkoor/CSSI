/*globals burgerImage, loadImage, height, width, fill, image, random, ellipse*/


function Burger() {
  burgerImage = loadImage("https://cdn.glitch.com/3a854730-1289-41bc-a292-f4c308f49a29%2Ftumblr_muxysn6fhE1spsp70o1_400.png?v=1628003976326");
  
  this.bottom = random(70, 340);
  this.x = random(width, width + 100);
  this.w = 60;
  this.h = random(height, height-100);
  this.speed = 2;
  
  this.hits = function(squid) {
    if (squid.y > this.h - this.bottom +20 && squid.y < this.h) {
      if (squid.x > this.x-50 && squid.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };

  this.show = function() {
    fill(87, 167, 247);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    //ellipse(this.x, this.h-110, this.w, 50);
    image(burgerImage, this.x-30, this.h-135, this.w, 50 );
  };

  this.update = function() {
    this.x -= this.speed;
  };

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  };
}