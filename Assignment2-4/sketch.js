let colors = [[234, 65, 44], [239, 135, 51], [255, 249, 73], [119, 242, 59], [117, 249, 252], [0, 68, 247], [232, 93, 250], [119, 66, 20], [255, 255, 255], [0, 0, 0], [240, 240, 240]];
let selectedColor = colors[0];
let canvas;
let saveButton;
let clearButton;
let audioButton;
let eraser;
let dragging = false;
let polySynth;
let synth;
let part;
let seq;
let notes;
let panner;
let noiseEnv;
let filt;
let noise;
let samples;
let filled = 0;
let startX;
let startY;

function preload() {
  eraser = loadImage("media/eraser.png");
  samples = new Tone.Players({
    paint: "media/select.mp3",
    eraser: "media/eraser.mp3",
    save: "media/save.mp3",
    clear: "media/sparkle.mp3"
  }).toDestination();
}

function setup() {
  canvas = createCanvas(710, 400);

  background(240, 240, 240);

  audioButton = createButton("Start Audio Context");
  audioButton.position(720, 12);
  audioButton.mousePressed(() => {
    if (Tone.context.state !== "running") {
      Tone.start().then(() => {
        console.log("Audio context started");
        Tone.Transport.start();
      })
    }
    else {
      Tone.Transport.start();
    }
  });

  clearButton = createButton("Clear Canvas");
  clearButton.position(0, 410);
  clearButton.mousePressed(clearCanvas);

  saveButton = createButton("Save Drawing");
  saveButton.position(610, 410);
  saveButton.mousePressed(saveDrawing);

  palette();

  Tone.Transport.timeSignature = [4, 4];
  Tone.Transport.bpm.value = 60;

  polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
  part = new Tone.Part(((time, value) => {
    polySynth.triggerAttackRelease(value.note, value.dur, time);
  }), [
    {time: 0, note: "C3", dur: "4n"},
    {time: "0:1", note: ["E4", "G4"], dur: "2n"},
    {time: "0:3", note: ["E4", "G4"], dur: "4n"},
    {time: "1:0", note: "D3", dur: "4n"},
    {time: "1:1", note: ["F4", "A4"], dur: "2n"},
    {time: "1:3", note: ["F4", "A4"], dur: "4n"},
    {time: "2:0", note: "C4", dur: "4n"},
    {time: "2:1", note: ["E5", "G5"], dur: "4n"},
    {time: "2:2", note: ["E5", "G5"], dur: "2n"},
    {time: "3:0", note: "D4", dur: "4n"},
    {time: "3:1", note: ["F5", "A5"], dur: "4n"},
    {time: "3:2", note: ["F5", "A5"], dur: "2n"},
  ]).start();
  polySynth.volume.value = -20;
  part.loop = true;
  part.loopEnd = "4m";

  synth = new Tone.Synth().toDestination();
  synth.volume.value = -20;
  notes = [["C4", "D4"], ["F4", "E4"], ["A4", "F4"], null, ["C4", "D4"], ["F4", "E4"], ["A4", "G4"], null, "C5", ["D5", "C5"], ["B4", null], [["C5", null], null], ["E5", ["C5", null]], ["G4", ["E4", null]], ["D4", null], null];
  seq = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, "8n", time);
  }, notes, "4n").start();

  panner = new Tone.Panner(0).toDestination();
  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 0.3,
    decay: 0.3,
    sustain: 1,
    release: 0.2
  }).connect(panner);
  filt = new Tone.Filter(500, "lowpass").connect(noiseEnv);
  noise = new Tone.Noise("white").start().connect(filt);
  noise.volume.value = -15;
}

function mousePressed() {
  if (mouseX < 20 && mouseY < 200) {
    selectedColor = colors[floor(mouseY/20)];
    dragging = true;
    samples.player("paint").start();
  }
  else if (mouseX < 20 && mouseY < 220) {
    selectedColor = colors[floor(mouseY/20)];
    dragging = true;
    samples.player("eraser").start();
  }
  startX = mouseX;
  startY = mouseY;
}

function mouseDragged() {
  stroke(selectedColor);
  strokeWeight(10);
  if (dragging) {
    if (((mouseX < 25 && mouseY > 230) || mouseX > 25) && (mouseX < 710 && mouseY < 400)) {
      line(pmouseX, pmouseY, mouseX, mouseY);
      let freq = map(mouseY, 0, height, 500, 2000, true);
      filt.frequency.value = freq;
      let panVal = map(mouseX, 0, width, -1, 1, true);
      panner.pan.value = panVal;
      noiseEnv.triggerAttack();

      let distance = dist(startX, startY, mouseX, mouseY);
      if (distance > 20) {
        if (selectedColor !== colors[10]) {
          filled += distance/(width*height);
        }
        else if (selectedColor === colors[10]) {
          filled -= distance/(width*height);
        }
        filled = constrain(filled, 0, 1);
      }
      let bpm = map(filled, 0, 1, 60, 220);
      Tone.Transport.bpm.value = bpm;
    }
  }
}

function mouseReleased() {
  noiseEnv.triggerRelease();
}

function saveDrawing() {
  save(canvas, "my_drawing.png");
  samples.player("save").start();
}

function clearCanvas() {
  let confirmClear = confirm("Are you sure you want to clear the canvas?");
  if (confirmClear) {
    background(240, 240, 240);
    palette();
    filled = 0;
    Tone.Transport.bpm.value = 60;
    samples.player("clear").start();
  }
  dragging = false;
}

function palette() {
  // Palette
  strokeWeight(1);
  stroke(255);
  // Red
  fill(234, 65, 44);
  square(0, 0, 20);
  // Orange
  fill(239, 135, 51);
  square(0, 20, 20);
  // Yellow
  fill(255, 249, 73);
  square(0, 40, 20);
  // Green
  fill(119, 242, 59);
  square(0, 60, 20);
  // Cyan
  fill(117, 249, 252);
  square(0, 80, 20);
  // Blue
  fill(0, 68, 247);
  square(0, 100, 20);
  // Magenta
  fill(232, 93, 250);
  square(0, 120, 20);
  // Brown
  fill(119, 66, 20);
  square(0, 140, 20);
  // White
  fill(255, 255, 255);
  square(0, 160, 20);
  // Black
  fill(0, 0, 0);
  square(0, 180, 20);
  // Eraser
  fill (240, 240, 240);
  square(0, 200, 20);
  image(eraser, 0, 200, 20, 20);
}