var ballPosition = new Vector2(40, 40)
var ballStartPosition = new Vector2(40, 70)
var ballEndPosition;
var ballVelocity = new Vector2(0, -7)
var ballPositions = []

var gravitationalConstant = 0.0981
var physics
gravitationalConstant *= 2
var bounce = 0.5;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

ctx.lineCap = "round";
ctx.lineJoin = "round";

ctx.arc(ballStartPosition.x, ballStartPosition.y, 5, 0 * Math.PI, 2 * Math.PI)
ctx.fillStyle = "#00ff00"
ctx.fill()

const ball = document.createElement("div")
ball.className = "ball"
ball.style.top = `${ballPosition.y}px`
ball.style.left = `${ballPosition.x}px`
document.body.appendChild(ball)

const marker = createMarker("#00ff00", 5, addVector(ballPosition, new Vector2(0, 30)))
//const groundMarker = createMarker("#42a1ff", 10)
let test = new Line(new Vector2(20, 20), new Vector2(200, 20));
//  drawLine(test);
let testBox = new Box(true, true, "#ffff00", new Vector2(20, window.innerHeight - 90), new Vector2(window.innerWidth - 20, window.innerHeight - 20))
drawBox(testBox)
let testBox1 = new Box(true, true, "#ffff00", new Vector2(20, 90), new Vector2(100, window.innerHeight - 90))
drawBox(testBox1)
let testBox2 = new Box(true, true, "#ffff00", new Vector2(1920 / 2, window.innerHeight - 590), new Vector2(window.innerWidth - 20, window.innerHeight - 520))
drawBox(testBox2)
let testBox3 = new Box(true, true, "#ffff00", new Vector2((1920 / 2) - 35, window.innerHeight - 160), new Vector2((1920 / 2) + 35, window.innerHeight - 90))
drawBox(testBox3)

const boxes = [testBox, testBox1, testBox2, testBox3]
function createMarker(color, diameter = 10, initialPosition = new Vector2(0, 0)) {
    let marker = document.createElement("div")
    marker.className = "marker"
    marker.style.backgroundColor = color
    marker.style.zIndex = 120
    marker.style.top = `${initialPosition.y}px`
    marker.style.left = `${initialPosition.x}px`

    marker.style.width = `${diameter}px`
    marker.style.height = `${diameter}px`

    document.body.appendChild(marker)
    return marker
}
function drawLine(line) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000"
    ctx.beginPath();
    ctx.moveTo(line.start.x, line.start.y);
    ctx.lineTo(line.end.x, line.end.y);
    ctx.stroke();
}

function drawBox(box) {
    box.sides.forEach(element => {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#ff000d"
        let average = averageVector(element.start, element.end);
        ctx.moveTo(average.x, average.y)
        //console.log(box.top.normal)
        let multipliedVector = multiplyVector(element.normal, new Vector2(15, 15))
        ctx.lineTo(average.x + multipliedVector.x, average.y + multipliedVector.y)
        ctx.stroke()
    });

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
function addVelocity(v) {
    ballVelocity = new Vector2(ballVelocity.x + v[0], ballVelocity.y + v[1])
}

function tickPhysics() {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000"
    document.getElementById("position").innerText = "Ball Position: " + (ballPosition.x + ", " + ballPosition.y)
    let d = displacement(ballStartPosition, ballPosition)
    document.getElementById("displacement").innerText = "Displacement: " + (d.x + ", " + d.y)
    document.getElementById("distance").innerText = "Distance: " + distance(d).toFixed(2);
    document.getElementById("velocity").innerText = "Velocity: " + (ballVelocity.x + ", " + ballVelocity.y);



    boxes.forEach(box => {
        box.sides.forEach(side => {
            let counter = 1
            let nearestPoint = nearestPointOnLine(side, new Vector2(ballPosition.x, ballPosition.y))


            /*if (counter == 1) {
                console.log("yoohoo")
                marker1.style.top = `${nearestPoint.y}px`
                marker1.style.left = `${nearestPoint.x}px`
            } else if (counter == 2) {
                marker2.style.top = `${nearestPoint.y}px`
                marker2.style.left = `${nearestPoint.x}px`
            } else if (counter == 3) {
                marker3.style.top = `${nearestPoint.y}px`
                marker3.style.left = `${nearestPoint.x}px`
            } else if (counter == 4) {
                marker4.style.top = `${nearestPoint.y}px`
                marker4.style.left = `${nearestPoint.x}px`
            }

            counter++;

            ctx.beginPath();
            ctx.arc(nearestPoint.x, nearestPoint.y, 5, 0 * Math.PI, 2 * Math.PI)
            ctx.fillStyle = "#00ff00"
            ctx.fill()*/

            let futureX = ballPosition.x + ballVelocity.x
            let futureY = ballPosition.y + (ballVelocity.y + gravitationalConstant)
            let futurePosition = new Vector2(futureX, futureY)
            let testdistance = getVectorDistance(futurePosition, nearestPoint)
            if (testdistance <= 30) {

                let reflectedVector = roundVector(reflectVector(ballVelocity, side.normal, bounce))
                ballVelocity = reflectedVector;
            }
        });
    });
    ctx.beginPath()
    ctx.moveTo(ballPosition.x, ballPosition.y + 30);
    ballPosition.x += ballVelocity.x
    ballPosition.y += (ballVelocity.y += gravitationalConstant)
    ballPosition.x = Math.round(ballPosition.x)
    ballPosition.y = Math.round(ballPosition.y)
    ctx.lineTo(ballPosition.x, ballPosition.y + 30);
    ctx.stroke()
    setBallPosition()
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