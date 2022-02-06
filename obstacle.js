 /* globals width, random, height, fill, rect, loadImage, ellipse image obstacleImage*/ 

function Obstacle() {
  obstacleImage = loadImage("https://cdn.glitch.com/3a854730-1289-41bc-a292-f4c308f49a29%2Frockpng.png?v=1628011394311");
  
   
  //this.top = random(25, height / 2 - 30);
  this.bottom = (height / 2 -130);
  this.x = width;
  this.w = 30;
  this.speed = 2;

  this.hits = function(squid) {
    if (squid.y > height - this.bottom +20) {
      if (squid.x > this.x-45 && squid.x-20 < this.x + this.w) {
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
    //ellipse(this.x, height-25, this.w+18, this.w+18);
    image(obstacleImage, this.x-30, height-50, this.w+30, this.w+35);
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