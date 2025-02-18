let GameStates = Object.freeze({
  START: "start",
  PLAY: "play",
  END: "end"
});
let gameState = GameStates.START;
let score = 0;
let highScore = 0;
let time = 30;
let bugCount = 25;
let bugSpeed = 2;
let textPadding = 12;
let gameFont;
let bugImage;
let bugs = [];

function preload() {
  gameFont = loadFont("media/Galindo-Regular.ttf");
  bugImage = loadImage("media/bug.png");
}

function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);
  angleMode(DEGREES);
  textFont(gameFont);

  for (let i = 0; i < bugCount; i++) {
    let bug = new Bug(random(80, width-80), random(80, height-80));
    bug.addAnimation("walk", new SpriteAnimation(bugImage, 0, 0, 4));
    bug.addAnimation("squished", new SpriteAnimation(bugImage, 4, 0, 1));
    bug.currentAnimation = "walk";
    bugs.push(bug);
  }
}

function draw() {
  background(220);

  switch(gameState) {
    case GameStates.START:
      textAlign(CENTER, CENTER);
      textSize(18);
      text("Press ENTER to Start", width/2, height/2);
      break;
    case GameStates.PLAY:
      textSize(18);
      textAlign(LEFT, TOP);
      text("Score: " + score, textPadding, textPadding);
      textAlign(RIGHT, TOP);
      text("Time: " + Math.ceil(time), width - textPadding, textPadding);

      for (let bug of bugs) {
        bug.draw();
      }
      
      time -= deltaTime/1000;
      if (time <= 0) {
        gameState = GameStates.END;
      }
      break;
    case GameStates.END:
      textAlign(CENTER, CENTER);
      text("Game Over!", width/2, height/2-20);
      text("Score: " + score, width/2, height/2);
      if (score > highScore) {
        highScore = score;
      }
      text("High Score: " + highScore, width/2, height/2+20);
      break;
  }
}

function keyPressed() {
  switch(gameState) {
    case GameStates.START:
      if (keyCode === ENTER) {
        gameState = GameStates.PLAY;
      }
      break;
    case GameStates.PLAY:
      break;
    case GameStates.END:
      break;
  }
}

class Bug {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
    this.squished = false;
    this.direction = random([0, 90, 180, 270]);
    this.speed = bugSpeed;
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      if (!this.squished) {
        switch (this.direction) {
          case 0:
            this.y -= this.speed;
            break;
          case 90:
            this.x += this.speed;
            break;
          case 180:
            this.y += this.speed;
            break;
          case 270:
            this.x -= this.speed;
            break;
        }

        if (this.x <= 40 || this.x >= width - 40) {
          this.direction = (this.direction + 180) % 360;
        }
        if (this.y <= 40 || this.y >= height - 40) {
          this.direction = (this.direction + 180) % 360;
        }
      }
      push();
      translate(this.x, this.y);
      rotate(this.direction);
      animation.draw();
      pop();
    }
  }

  squish() {
    if (!this.squished) {
      this.squished = true;
      this.currentAnimation = "squished";
      score++;
      bugSpeed += 0.5;
      for (let bug of bugs) {
        bug.speed = bugSpeed;
      }
      this.speed = 0;
    }
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 8 === 0) {
      this.u++;
    }

    if (this.u === this.startU + this.duration) {
      this.u = this.startU;
    }
  }
}

function mousePressed() {
  if (gameState === GameStates.PLAY) {
    for (let bug of bugs) {
      if ((dist(mouseX, mouseY, bug.x, bug.y) < 40) && !bug.squished) {
        bug.squish();
      }
    }
  }
}