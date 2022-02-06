  /* globals Squid, Obstacle, Burger, createCanvas, background, key, displayScore, fill, text, mouseX, mouseY, collidePointRect, squidwardImage, loadImage, x, y, masterVelocity, xVelocity, yVelocity,imageWidth, imageHeight, rect, height, textSize, keyCode, LEFT_ARROW, image, isLoop, frameCount, noLoop, random, loop, getItem, storeItem, textStyle, NORMAL, BOLD, textAlign, CENTER, LEFT, loadSound */

let score,
  gameIsOver,
  squidwardImage,
  backgroundImage,
  burgerImage,
  rockPosition,
  frameRateRock,
  highScore,
  jump,
  gameOverSong,
  startGame,
  burgerSound;

var squid;
var obstacles = [];
var burgers = [];
jump = false;
rockPosition = 100;
frameRateRock = [100, 150, 200];
score = 0;
startGame = false;

function preload() {
  gameOverSong = loadSound(
    "https://cdn.glitch.com/3a854730-1289-41bc-a292-f4c308f49a29%2FSuper%20Mario%20Bros.%20-%20Game%20Over%20Sound%20Effect.mp3?v=1628177386585"
  );
  burgerSound = loadSound(
    "https://cdn.glitch.com/3a854730-1289-41bc-a292-f4c308f49a29%2FChomp%20Sound%20Effect.mp3?v=1628182883537"
  );
}

function setup() {
  createCanvas(400, 400);
  backgroundImage = loadImage(
    "https://cdn.glitch.com/3a854730-1289-41bc-a292-f4c308f49a29%2Fbb0d4572eae04ea2b806c6a05b0e2afa.jpg?v=1627922221338");
  squid = new Squid();
  obstacles.push(new Obstacle());
  burgers.push(new Burger());
  highScore = getItem("hs");
}

function draw() {
  background(backgroundImage);
  squid.update();
  squid.show();
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].show();
    obstacles[i].update();
    if (obstacles[i].offscreen()) {
      // deletes element from array
      obstacles.splice(i, 1);
      isLoop = true;
    }
    //checking if squid hits rock
    if (obstacles[i].hits(squid)) {
      console.log("HIT ROCK");
      obstacles.splice(i);
      gameIsOver = true;
    }
  }
  // every # frames, new rock
  if (frameCount % rockPosition == 0) {
    obstacles.push(new Obstacle());
    rockPosition = random(frameRateRock);
  }

  for (let i = burgers.length-1; i >= 0; i--) {
    burgers[i].show();
    burgers[i].update();
    if (burgers[i].offscreen()) {
      // splice is a function that deletes element from array
      burgers.splice(i, 1);
      isLoop = true;
    } else if (burgers[i].hits(squid)) {
      console.log("HIT BURGER");
      burgerSound.play();
      score++;
      burgers.splice(i);
    } else if (gameIsOver == true) {
      burgers.splice(i);
    }
  }
  // every 250 frames, new burger
  if (frameCount % 250 == 0) {
    burgers.push(new Burger());
  }

  //every # frames, you are able to jump
  if (jump == true) {
    if (frameCount % 20 == 0) {
      jump = false;
    }
  }

  displayScore();

  if (gameIsOver) {
    burgerSound.stop();
    rect(130, height/2-25, 145, 50);
    fill(80, 100, 180);
    //textAlign(CENTER,CENTER);
    textStyle(BOLD);
    textSize(20);
    text("Game Over", 150, 210);
    textStyle(NORMAL);
    textSize(15);
    text("Press any key to continue", 117, 245);
    gameOverSong.play();
    noLoop();
  }
  
  if(!startGame) {
    background(136, 202, 252)
    rect(130, height/2-25, 145, 50);
    fill(80, 100, 180);
    textStyle(BOLD);
    textSize(20);
    text("Start Game", 150, 210);
    textStyle(NORMAL);
    textSize(15);
    text("Press any key to continue", 117, 245);
    noLoop();
  }
}

function displayScore() {
  if (score > highScore) {
    highScore = score;
    storeItem("hs", highScore);
  }
  fill(0);
  //textAlign(LEFT,CENTER);
  textSize(12);
  textStyle(NORMAL);
  if(startGame) {
    text(`Score: ${score}`, 10, 20);
    text(`High score: ${highScore}`, 10, 40);
  }
}

function restartGame() {
  gameIsOver = false;
  startGame = true;
  gameOverSong.stop();
  score = 0;
  jump = false;
  var obstacles = [];
  var burgers = [];
  rockPosition = 100;
  frameRateRock = [100, 150, 200];
  squid = new Squid();
  obstacles.push(new Obstacle());
  burgers.push(new Burger());
  loop();
}

function keyPressed() {
  if (gameIsOver == true || startGame == false) {
    restartGame();
  } else if (key == " " && jump == false) {
    squid.up();
    jump = true;
  }
}