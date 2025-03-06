let synth;
let filt;
let rev;
let chor;
let filtSlider;
let revSlider;
let chorSlider;
let keyNotes = {
  'q': 'C4',
  'w': 'D4',
  'e': 'E4',
  'r': 'F4',
  'u': 'G4',
  'i': 'A4',
  'o': 'B4',
  'p': 'C5'
}

function setup() {
  createCanvas(400, 400);
  filt = new Tone.Filter(1000, "lowpass").toDestination();
  rev = new Tone.Reverb(1).connect(filt);
  chor = new Tone.Chorus(4, 20, 0.5).connect(rev);
  synth = new Tone.PolySynth(Tone.Synth).connect(chor);
  synth.set({
    envelope: {
      attack: 0.1,
      decay: 0.5,
      sustain: 1,
      release: 0.5
    },
    oscillator: {
      type: 'sawtooth'
    }
  });
  synth.volume.value = -3;

  filtSlider = createSlider(200, 2000, 1000, 10);
  filtSlider.position(20, 200);
  filtSlider.input(() => {filt.frequency.value = filtSlider.value()});

  chorSlider = createSlider(0, 5, 0.5, 0.01);
  chorSlider.position(20, 260);
  chorSlider.input(() => {chor.depth = chorSlider.value()});
}

function draw() {
  background(220);
  text("Use the keyboard to play notes.", 20, 30);
  text("Q - C4\nW - D4\nE - E4\nR - F4\nU - G4\nI - A4\nO - B4\nP - C5", 20, 50);
  text("Filter Cutoff Frequency: " + filtSlider.value(), 25, 193);
  text("Chorus Depth: " + chorSlider.value(), 25, 253);
}

function keyPressed() {
  let pitch = keyNotes[key];
  if (pitch) {
    synth.triggerAttack(pitch);
  }
}

function keyReleased() {
  let pitch = keyNotes[key];
  if (pitch) {
    synth.triggerRelease(pitch);
  }
}