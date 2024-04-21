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
    constructor(start = new Vector2(0, 0), end = new Vector2(1, 0)) {
        this.start = start;
        this.end = end;
    }
}

class Box {
    constructor(stroke = true, fill = true, fillcolor = "red", start = new Vector2(20, 20), end = new Vector2(400, 400)) {
        this.stroke = stroke;
        this.fill = fill;
        this.fillcolor = fillcolor;
        this.top = new Line(start, new Vector2(end.x, start.y));
        this.right = new Line(new Vector2(end.x, start.y), end);
        this.bottom = new Line(end, new Vector2(start.x, end.y));
        this.left = new Line(new Vector2(start.x, end.y), start);
        this.start = start;
        this.end = end;
    }
}