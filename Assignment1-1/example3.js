function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  strokeWeight(0);
  fill(255, 249, 73);
  arc(105, 100, 100, 100, PI+QUARTER_PI, PI-QUARTER_PI);

  strokeWeight(0);
  fill(234, 65, 44);
  arc(230, 100, 100, 100, PI, TWO_PI);
  rect(180, 100, 100, 50);

  fill(255);
  circle(205, 100, 31);
  circle(255, 100, 31);

  fill(0, 68, 247);
  circle(205, 100, 18.5);
  circle(255, 100, 18.5);
}
