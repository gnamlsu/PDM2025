function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 0, 129);

  stroke(255);
  strokeWeight(3.5);
  fill(0, 128, 0);
  circle(200, 200, 200)

  fill(255, 0, 0);
  beginShape();
  vertex(200, 100);
  vertex(226, 168);
  vertex(295, 168);
  vertex(240, 212);
  vertex(261, 280);
  vertex(200, 236);
  vertex(139, 280);
  vertex(160, 212);
  vertex(105, 168);
  vertex(174, 168);
  endShape(CLOSE);
}
