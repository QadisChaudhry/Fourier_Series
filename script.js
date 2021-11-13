let time = 0;
let wave = [];

function setup() {
    createCanvas($(document).width() - 15, 400);
}

function draw() {
    background(0);
    translate(175, 200);

    let x = 0;
    let y = 0;

    for (i = 0; i < 25; i++) {
        let n = i + 1;
        let radius = 100 * (2 / PI) * (1 / ((-1)**i * n));

        let px = x;
        let py = y;

        x += radius * cos(n * time);
        y += radius * sin(n * time);

        stroke(255);
        fill(255);
        ellipse(x, y, 3);

        stroke(255, 100);
        noFill();
        ellipse(px, py, radius * 2);
        line(px, py, x, y);
    }
    wave.unshift(y);

    translate(200, 0);
    beginShape();
    stroke(255, 100);
    for (i = 0; i < wave.length; i++) {
        vertex(i, wave[i]);
    }
    endShape();

    if (wave.length > 1000) {
        wave.pop();
    }

    line(x - 200, y, 0, wave[0]);

    time -= 0.03;
}
