var canvas = document.getElementById("mazeCanvas");
var ctx = canvas.getContext("2d");

var maze = new Image();
maze.src = "images/maze25.svg";

var ratImage = new Image();
ratImage.src = "images/rat.png";

var cheeseImage = new Image();
cheeseImage.src = "images/cheese.png";

var collisionCanvas = document.createElement("canvas");
collisionCanvas.width = canvas.width;
collisionCanvas.height = canvas.height;
var collisionCtx = collisionCanvas.getContext("2d");

var playerX = 0;
var playerY = 0;
var playerSize = 10;
var speed = 7;

var cheeses = [];
var cheeseSize = 10;

var w = false;
var a = false;
var s = false;
var d = false;

var win = false;


var goalX = canvas.width / 2;
var goalY = canvas.height - 20;
var goalSize = 20;

maze.onload = function () {
    collisionCtx.fillStyle = "white";
    collisionCtx.fillRect(0, 0, canvas.width, canvas.height);
    collisionCtx.drawImage(maze, 0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 7; i++) {
        var x, y;

        do {
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;
        } while (isWall(x, y));

        cheeses.push({ x: x, y: y, collected: false });
    }

    playerX = canvas.width / 2;
    playerY = playerSize;

    while (isWall(playerX, playerY)) {
        playerY++;
    }

    requestAnimationFrame(loop);
};

document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") w = true;
    if (e.key === "ArrowLeft") a = true;
    if (e.key === "ArrowDown") s = true;
    if (e.key === "ArrowRight") d = true;
});

document.addEventListener("keyup", function (e) {
    if (e.key === "ArrowUp") w = false;
    if (e.key === "ArrowLeft") a = false;
    if (e.key === "ArrowDown") s = false;
    if (e.key === "ArrowRight") d = false;
});

function loop() {

    if (!win) {
        movePlayer();
        checkCheeseCollision();
    }

    draw();
    requestAnimationFrame(loop);
}

function movePlayer() {
    var newX = playerX;
    var newY = playerY;

    if (w) newY -= speed;
    if (s) newY += speed;
    if (a) newX -= speed;
    if (d) newX += speed;

    if (!isWall(newX, playerY)) {
        playerX = newX;
    }

    if (!isWall(playerX, newY)) {
        playerY = newY;
    }
}

function checkCheeseCollision() {
    for (var i = 0; i < cheeses.length; i++) {
        if (!cheeses[i].collected) {
            if (
                playerX - playerSize < cheeses[i].x + cheeseSize &&
                playerX + playerSize > cheeses[i].x - cheeseSize &&
                playerY - playerSize < cheeses[i].y + cheeseSize &&
                playerY + playerSize > cheeses[i].y - cheeseSize
            ) {
                cheeses[i].collected = true;
            }
        }
    }

    if (cheeses.every(c => c.collected) && isAtGoal(playerX, playerY)) {
        win = true;
    }
}

function isAtGoal(x, y) {
    return (
        x + playerSize > goalX - goalSize / 2 &&
        x - playerSize < goalX + goalSize / 2 &&
        y + playerSize > goalY - goalSize / 2 &&
        y - playerSize < goalY + goalSize / 2
    );
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(maze, 0, 0, canvas.width, canvas.height);

    // Draw cheeses
    for (var i = 0; i < cheeses.length; i++) {
        if (!cheeses[i].collected) {
            ctx.drawImage(
                cheeseImage,
                cheeses[i].x - cheeseSize,
                cheeses[i].y - cheeseSize,
                cheeseSize * 2,
                cheeseSize * 2
            );
        }
    }

    ctx.drawImage(
        ratImage,
        playerX - playerSize,
        playerY - playerSize,
        playerSize * 2,
        playerSize * 2
    );

    ctx.fillStyle = "yellow";
    ctx.fillRect(goalX - goalSize / 2, goalY - goalSize / 2, goalSize, goalSize);

    if (win) {
        ctx.fillStyle = "yellow";
        ctx.font = "36px Arial";
        ctx.fillText("You Win!", canvas.width / 2 - 90, canvas.height / 2);
    }
}

function isWall(x, y) {

    if (
        x - playerSize < 0 ||
        y - playerSize < 0 ||
        x + playerSize >= canvas.width ||
        y + playerSize >= canvas.height
    ) {
        return true;
    }

    var points = [
        [x, y],
        [x + playerSize, y],
        [x - playerSize, y],
        [x, y + playerSize],
        [x, y - playerSize]
    ];

    for (var i = 0; i < points.length; i++) {
        var px = Math.round(points[i][0]);
        var py = Math.round(points[i][1]);

        var pixel = collisionCtx.getImageData(px, py, 1, 1).data;

        if (pixel[0] < 80 && pixel[1] < 80 && pixel[2] < 80) {
            return true;
        }
    }

    return false;
}