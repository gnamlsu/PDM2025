let colors = [[234, 65, 44], [239, 135, 51], [255, 249, 73], [119, 242, 59], [117, 249, 252], [0, 68, 247], [232, 93, 250], [119, 66, 20], [255, 255, 255], [0, 0, 0]];
let selectedColor = colors[0];

function setup() {
  createCanvas(710, 400);

  background(240, 240, 240);

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
}

function mousePressed() {
  if (mouseX < 20 && mouseY < 200) {
    selectedColor = colors[floor(mouseY/20)];
  }
}

function mouseDragged() {
  stroke(selectedColor);
  strokeWeight(10);
  if ((mouseX < 25 && mouseY > 210) || mouseX > 25) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}