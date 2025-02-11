let sprite1;
let sprite2;
let sprite3;
let character1;
let character2;
let character3;

function preload() {
  sprite1 = loadImage("media/green.png");
  sprite2 = loadImage("media/blue.png");
  sprite3 = loadImage("media/purple.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  character1 = new Character(random(80, width-80), random(80, height-80));
  character1.addAnimation("left", new SpriteAnimation(sprite1, 1, 0, 8));
  character1.addAnimation("right", new SpriteAnimation(sprite1, 1, 0, 8));
  character1.addAnimation("stand", new SpriteAnimation(sprite1, 0, 0, 1));
  character1.currentAnimation = "stand";

  character2 = new Character(random(80, width-80), random(80, height-80));
  character2.addAnimation("left", new SpriteAnimation(sprite2, 1, 0, 8));
  character2.addAnimation("right", new SpriteAnimation(sprite2, 1, 0, 8));
  character2.addAnimation("stand", new SpriteAnimation(sprite2, 0, 0, 1));
  character2.currentAnimation = "stand";

  character3 = new Character(random(80, width-80), random(80, height-80));
  character3.addAnimation("left", new SpriteAnimation(sprite3, 1, 0, 8));
  character3.addAnimation("right", new SpriteAnimation(sprite3, 1, 0, 8));
  character3.addAnimation("stand", new SpriteAnimation(sprite3, 0, 0, 1));
  character3.currentAnimation = "stand";
}

function draw() {
  background(220);

  character1.draw();
  character2.draw();
  character3.draw();
}

function keyPressed() {
  character1.keyPressed();
  character2.keyPressed();
  character3.keyPressed();
}

function keyReleased() {
  character1.keyReleased();
  character2.keyReleased();
  character3.keyReleased();
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "left":
          this.x -= 2;
          break;
        case "right":
          this.x += 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch(keyCode) {
      case LEFT_ARROW:
        this.currentAnimation = "left";
        this.animations[this.currentAnimation].flipped = true;
        this.animations["stand"].flipped = true;
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        this.animations["stand"].flipped = false;
        break;
    }
  }

  keyReleased() {
    this.currentAnimation = "stand";
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
    let s = this.flipped ? -1 : 1;
    scale(s, 1);
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0) {
      this.u++;
    }

    if (this.u === this.startU + this.duration) {
      this.u = this.startU;
    }
  }
}