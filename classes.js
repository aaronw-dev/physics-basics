class Rigidbody {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
}

class Vector2 {
    x = 0;
    y = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    start = new Vector2(0, 0);
    end = new Vector2(1, 0);
    normal = new Vector2(0, 1);
    constructor(start = new Vector2(0, 0), end = new Vector2(1, 0), flipnormal = false) {
        this.start = start;
        this.end = end;
        let dx = end.x - start.x;
        let dy = end.y - start.y;
        this.flipnormal = flipnormal
        if (this.flipnormal == true) {
            this.normal = normalizeVector(new Vector2(-dy, dx));
        } else {
            this.normal = normalizeVector(new Vector2(dy, -dx));
        }
    }
}

class Box {
    constructor(stroke = true, fill = true, fillcolor = "red", start = new Vector2(20, 20), end = new Vector2(400, 400)) {
        this.stroke = stroke;
        this.fill = fill;
        this.fillcolor = fillcolor;
        this.top = new Line(new Vector2(start.x, start.y), new Vector2(end.x, start.y), false);
        this.right = new Line(new Vector2(end.x, start.y), new Vector2(end.x, end.y), true);
        this.bottom = new Line(new Vector2(end.x, end.y), new Vector2(start.x, end.y), true);
        this.bottom.normal = multiplyVector(this.bottom.normal, new Vector2(-1, 1))
        this.left = new Line(new Vector2(start.x, end.y), new Vector2(start.x, start.y), true);
        this.start = start;
        this.end = end;
        this.sides = [this.top, this.right, this.bottom, this.left]
    }
}