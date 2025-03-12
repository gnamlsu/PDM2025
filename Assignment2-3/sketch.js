let synth;
let rev;
let del;
let filt;
let values;
let showImage = false;
let showImageTimer = 0;
let imageDuration = 1000;

function preload() {
  waterdrop = loadImage("media/waterdrop.jpg");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  rev = new Tone.Reverb({
    decay: 0.1,
    wet: 0.5
  }).toDestination();

  del = new Tone.FeedbackDelay(0.1, 0.2).connect(rev);

  filt = new Tone.Filter(300, "highpass").connect(del);

  synth = new Tone.Synth().connect(filt);

  values = new Float32Array([0, 0, 500, 350, 300, 300, 300, 310, 330, 350, 400, 420, 600, 800, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

function draw() {
  background(220);

  text("Click to play sound effect", 200, 200);
  textAlign(CENTER, CENTER);

  if (showImage) {
    image(waterdrop, 200, 200, 400, 400);
    if (millis() - showImageTimer > imageDuration) {
      showImage = false;
    }
  }
}

function mouseClicked() {
  synth.triggerAttackRelease(400, 0.25);
  synth.frequency.setValueCurveAtTime(values, Tone.now(), 0.25);
  showImage = true;
  showImageTimer = millis();
}