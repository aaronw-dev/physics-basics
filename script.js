var ballPosition = new Vector2(40, 40)
var ballStartPosition = new Vector2(40, 70)
var ballEndPosition;
var ballVelocity = new Vector2(0, -7)
var ballPositions = []

var gravitationalConstant = 0.0981
var physics
gravitationalConstant *= 2
var bounce = 0.6;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.arc(ballStartPosition.x, ballStartPosition.y, 5, 0 * Math.PI, 2 * Math.PI)
ctx.fillStyle = "#00ff00"
ctx.fill()

const ball = document.createElement("div")
ball.className = "ball"
ball.style.top = `${ballPosition.y}px`
ball.style.left = `${ballPosition.x}px`
document.body.appendChild(ball)

const marker = document.createElement("div")
marker.className = "marker"
marker.style.top = `${ballPosition.y + 30}px`
marker.style.left = `${ballPosition.x}px`
document.body.appendChild(marker)

let test = new Line(new Vector2(20, 20), new Vector2(200, 20));
//  drawLine(test);
let testBox = new Box(true, true, "#ffff00", new Vector2(0, window.innerHeight - 50), new Vector2(window.innerWidth, window.innerHeight))
drawBox(testBox)

function drawLine(line) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000"
    ctx.beginPath();
    ctx.moveTo(line.start.x, line.start.y);
    ctx.lineTo(line.end.x, line.end.y);
    ctx.stroke();
}

function drawBox(box) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000"
    ctx.beginPath();

    ctx.moveTo(box.top.start.x, box.top.start.y);
    ctx.lineTo(box.top.end.x, box.top.end.y);
    ctx.lineTo(box.right.end.x, box.right.end.y);
    ctx.lineTo(box.bottom.end.x, box.bottom.end.y);
    ctx.lineTo(box.left.end.x, box.left.end.y);

    if (box.fill) {
        ctx.fillStyle = box.fillcolor;
        ctx.fill();
    }
    if (box.stroke) {
        ctx.stroke();
    }
}
function setBallPosition() {
    ball.style.top = `${ballPosition.y}px`
    ball.style.left = `${ballPosition.x}px`
    marker.style.top = `${ballPosition.y + 30}px`
    marker.style.left = `${ballPosition.x}px`
}
function endSimulation() {
    ballEndPosition = ballPosition;
    console.log("Simulation finished.")
}
function displacement(start, end) {
    return new Vector2(end.x - start.x, end.y - start.y)
}
function distance(d) {
    return Math.sqrt((d.x ** 2) + (d.y ** 2))
}
function reflectVector(vec, b) {
    return new Vector2(vec.x * b, -vec.y * b)
}
function addVelocity(v) {
    ballVelocity = new Vector2(ballVelocity.x + v[0], ballVelocity.y + v[1])
}
function tickPhysics() {
    if ((ballPosition.y + (ballVelocity.y + gravitationalConstant)) + 30 < window.innerHeight - 50) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000000"
        document.getElementById("position").innerText = "Ball Position: " + (ballPosition.x + ", " + ballPosition.y)
        let d = displacement(ballStartPosition, ballPosition)
        document.getElementById("displacement").innerText = "Displacement: " + (d.x + ", " + d.y)
        document.getElementById("distance").innerText = "Distance: " + distance(d).toFixed(2);
        ballPosition.x += ballVelocity.x
        ballPosition.y += (ballVelocity.y += gravitationalConstant)
        ballPosition.x = Math.round(ballPosition.x)
        ballPosition.y = Math.round(ballPosition.y)
        ctx.lineTo(ballPosition.x, ballPosition.y + 30);
        ctx.stroke()
        setBallPosition()
    } else {
        //clearInterval(physics)
        //endSimulation()
        ballVelocity = reflectVector(ballVelocity, bounce);
    }
}
/*addEventListener("resize", (event) => {
    let ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
});*/
function startSim(p) {
    ballStartPosition.x = ballPosition.x
    ballStartPosition.y = ballPosition.y + 30
    ctx.strokeStyle = "#000000"
    ctx.beginPath();
    ctx.moveTo(ballPosition.x, ballPosition.y + 30);
    ctx.lineWidth = 2;
    clearInterval(physics)
    ballVelocity = new Vector2(p[0], p[1])
    physics = setInterval(tickPhysics, 10)
}