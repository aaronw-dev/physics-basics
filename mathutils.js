Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};
function positive(num) {
    return (num > 0 ? num : -num)
}
function multiplyVector(v1, v2) {
    return new Vector2(v1.x * v2.x, v1.y * v2.y);
}
function addVector(v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
}
function subtractVector(v1, v2) {
    return new Vector2(v1.x - v2.x, v1.y - v2.y);
}
function normalizeVector(vector) {
    let returnVector = new Vector2(0, 0);
    let negativex = vector.x < 0
    let negativey = vector.y < 0
    //console.log(vector)
    if (positive(vector.x) > positive(vector.y)) {
        returnVector.y = vector.y / vector.x;
        returnVector.x = 1;
    } else if (positive(vector.x) < positive(vector.y)) {
        returnVector.x = vector.x / vector.y;
        returnVector.y = 1;
    }
    if (negativex == true)
        returnVector.x *= -1
    if (negativey == true)
        returnVector.y *= -1
    return returnVector
}
function reflectVector(v, n, bounce = 0.5) {
    let wx = v.x - 2 * (v.x * n.x) * n.x
    let wy = v.y - 2 * (v.y * n.y) * n.y
    wx *= bounce
    wy *= bounce
    return new Vector2(wx, wy)
}
function roundVector(v) {
    //return new Vector2(+v.x.toFixed(2), +v.y.toFixed(2));
    return new Vector2(+v.x.toFixed(2), +v.y.toFixed(2));
}

function getVectorMagnitude(v, squared = true) {
    return squared ? Math.sqrt(((v.x * v.x) + (v.y * v.y))) : ((v.x * v.x) + (v.y * v.y));
}

function getVectorDistance(v1, v2) {
    return getVectorMagnitude(subtractVector(v1, v2))
}

function perpendicularCCW(v) {
    return new Vector2(-v.y, v.x);
}

function getPerpendicularCCW(v) {
    return new Vector2(-v.y, v.x);
}

function perpendicularCW(v) {
    return new Vector2(v.y, -v.x);
}

function getPerpendicularCW(v) {
    return new Vector2(v.y, -v.x);
}

function averageVector(v1, v2) {
    return new Vector2((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
}
function dotProduct(v1, v2) {
    return ((v1.x * v2.x) + (v1.y * v2.y));
}
function perpDotProduct(v1, v2) {
    return ((v1.x * v2.y) - (v1.y * v2.x));
}
/*public static Vector3 NearestPointOnFiniteLine(Vector3 start, Vector3 end, Vector3 pnt)
{
    var line = (end - start);
    var len = line.magnitude;
    line.Normalize();
    var v = pnt - start;
    var d = Vector3.Dot(v, line);
    d = Mathf.Clamp(d, 0f, len);
    return start + line * d;
}*/
function nearestPointOnLine(line, point) {
    let li = subtractVector(line.end, line.start); // var line = (end - start);
    let len = getVectorMagnitude(li); //var len = line.magnitude;
    li = multiplyVector(normalizeVector(li), new Vector2(1, (line.flipnormal ? 1 : -1)))//line.Normalize();
    let v = subtractVector(point, line.start) //var v = pnt - start;
    let d = dotProduct(v, li); //var d = Vector3.Dot(v, line);
    d = d.clamp(0, len); //d = Mathf.Clamp(d, 0f, len);
    let finished = addVector(line.start, multiplyVector(li, new Vector2(d, d))); //return start + line * d;
    return finished;
}