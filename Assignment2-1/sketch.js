let samples;
let startContext;
let button1;
let button2;
let button3;
let button4;
let bitCrusherSlider;
let bit = new Tone.BitCrusher(16).toDestination();

function preload() {
  samples = new Tone.Players({
    suspicious: "media/amongus.mp3",
    hello: "media/hello.mp3",
    melody: "media/melody.mp3",
    ringtone: "media/ringtone.mp3"
  }).connect(bit);
}

function setup() {
  createCanvas(400, 400);

  /*startContext = createButton("Start Audio Context");
  startContext.position(10, 10);
  startContext.mousePressed(startAudioContext);*/

  button1 = createButton("Play Suspicious Sample");
  button1.position(20, 20);
  button1.mousePressed(() => {samples.player("suspicious").start()});

  button2 = createButton("Play Hello Sample");
  button2.position(220, 20);
  button2.mousePressed(() => {samples.player("hello").start()});

  button3 = createButton("Play Melody Sample");
  button3.position(20, 70);
  button3.mousePressed(() => {samples.player("melody").start()});

  button4 = createButton("Play Ringtone Sample");
  button4.position(220, 70);
  button4.mousePressed(() => {samples.player("ringtone").start()});

  bitCrusherSlider = createSlider(1, 16, 0, 0.01);
  bitCrusherSlider.position(20, 200);
  bitCrusherSlider.input(() => {bit.bits.value = bitCrusherSlider.value()});
}

function draw() {
  background(220);
  text("Bit Crusher Amount: " + bitCrusherSlider.value(), 25, 190);
}

/*function startAudioContext() {
  if (Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio Context Started");
  }
  else {
    console.log("Audio Context Already Running");
  }
}*/
