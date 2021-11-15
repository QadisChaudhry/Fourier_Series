let time = 0;
let wave = [];

function setup() {
    let width = $(document).width() - 15;
    createCanvas(width, 400);

    slider = createSlider(1, 25, 1);
    slider.position(20, 40);

    square = createRadio();
    square.option(1, "");
    square.position(width / 2 + 30, 35);

    sawtooth = createRadio();
    sawtooth.position(width / 2 - 30, 35);
    sawtooth.option(1, "");
}

function draw() {
    background(30);
    fill(235);
    text("Number of iterations", slider.x + 6, slider.y - 15)
    text("1", slider.x, slider.y + 27)
    text("25", slider.x + slider.width - 20, slider.y + 27)
    text("Square", square.x - 18, square.y + 25)
    text("Sawtooth", sawtooth.x - 25, sawtooth.y + 25)
    translate(175, 200);

    let x = 0;
    let y = 0;
    let r;

    for (i = 0; i < slider.value(); i++) {
        if (sawtooth.value()) {
            n = i + 1;
            r = 100 * (2 / PI) * (1 / ((-1)**n * n));
        } else if (square.value()){
            n = 2 * i + 1
            r = 50 * (4 / PI) * (1 / n);
        } else {
            n = null;
            r = 200 / PI;
        }

        let px = x;
        let py = y;

        x += r * cos(n * time);
        y += r * sin(n * time);

        stroke(255);
        fill(255);
        ellipse(x, y, 3);

        stroke(255, 100);
        noFill();
        ellipse(px, py, r * 2);
        line(px, py, x, y);
    }

    if (sawtooth.value() || square.value()) {
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
    }

    time -= 0.03;
}
