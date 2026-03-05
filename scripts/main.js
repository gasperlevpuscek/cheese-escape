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
var playerCollisionRadius = 7;
var speed = 5;

var cheeses = [];
var cheeseSize = 10;
var solvePathSourceWidth = 404;
var solvePathSourceHeight = 404;

var solvePathRaw =
    "202,2 202,10 234,10 234,26 250,26 250,10 266,10 266,26 282,26 282,90 298,90 298,74 314,74 314,58 298,58 298,42 314,42 314,26 330,26 330,74 362,74 362,90 330,90 330,106 346,106 346,122 298,122 298,106 282,106 282,122 266,122 266,42 250,42 250,74 234,74 234,58 186,58 186,90 170,90 170,106 154,106 154,138 138,138 138,74 106,74 106,106 90,106 90,90 74,90 74,58 58,58 58,90 42,90 42,122 58,122 58,138 74,138 74,170 90,170 90,186 74,186 74,202 58,202 58,186 42,186 42,218 90,218 90,234 106,234 106,250 90,250 90,266 106,266 106,298 90,298 90,314 122,314 122,330 106,330 106,346 122,346 122,362 106,362 106,378 74,378 74,394 122,394 122,378 154,378 154,362 138,362 138,346 170,346 170,330 154,330 154,314 138,314 138,298 122,298 122,282 138,282 138,266 122,266 122,250 154,250 154,234 186,234 186,250 170,250 170,266 154,266 154,298 218,298 218,282 234,282 234,314 250,314 250,282 266,282 266,298 282,298 282,266 298,266 298,298 314,298 314,330 330,330 330,346 314,346 314,394 298,394 298,378 266,378 266,362 234,362 234,378 218,378 218,362 202,362 202,402";
var solvePathPoints = parseSolvePathPoints(solvePathRaw);

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

    for (var i = 0; i < 30; i++) {
        var x, y;
        var attempts = 0;

        do {
            var point = getRandomPointOnSolvePath();
            x = point.x;
            y = point.y;
            attempts++;

            if (attempts > 200) {
                x = Math.random() * canvas.width;
                y = Math.random() * canvas.height;
            }
        } while (isWall(x, y) || isTooCloseToExistingCheese(x, y));

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
    var moveX = 0;
    var moveY = 0;

    if (w) moveY -= speed;
    if (s) moveY += speed;
    if (a) moveX -= speed;
    if (d) moveX += speed;

    moveAxis("x", moveX);
    moveAxis("y", moveY);
}

function moveAxis(axis, distance) {
    if (distance === 0) {
        return;
    }

    var direction = distance > 0 ? 1 : -1;
    var remaining = Math.abs(distance);

    while (remaining > 0) {
        var step = Math.min(1, remaining) * direction;
        var nextX = axis === "x" ? playerX + step : playerX;
        var nextY = axis === "y" ? playerY + step : playerY;

        if (isWall(nextX, nextY)) {
            break;
        }

        if (axis === "x") {
            playerX = nextX;
        } else {
            playerY = nextY;
        }

        remaining -= 1;
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

function parseSolvePathPoints(raw) {
    var pairs = raw.trim().split(/\s+/);
    var points = [];
    var scaleX = canvas.width / solvePathSourceWidth;
    var scaleY = canvas.height / solvePathSourceHeight;

    for (var i = 0; i < pairs.length; i++) {
        var coords = pairs[i].split(",");
        points.push({
            x: Number(coords[0]) * scaleX,
            y: Number(coords[1]) * scaleY
        });
    }

    return points;
}

function getRandomPointOnSolvePath() {
    if (solvePathPoints.length < 2) {
        return { x: canvas.width / 2, y: canvas.height / 2 };
    }

    var segmentIndex = Math.floor(Math.random() * (solvePathPoints.length - 1));
    var start = solvePathPoints[segmentIndex];
    var end = solvePathPoints[segmentIndex + 1];
    var t = Math.random();

    return {
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t
    };
}

function isTooCloseToExistingCheese(x, y) {
    for (var i = 0; i < cheeses.length; i++) {
        var dx = cheeses[i].x - x;
        var dy = cheeses[i].y - y;
        var minDistance = cheeseSize * 2.5;

        if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
            return true;
        }
    }

    return false;
}

function isWall(x, y) {

    if (
        x - playerCollisionRadius < 0 ||
        y - playerCollisionRadius < 0 ||
        x + playerCollisionRadius >= canvas.width ||
        y + playerCollisionRadius >= canvas.height
    ) {
        return true;
    }

    var points = [
        [x, y],
        [x + playerCollisionRadius, y],
        [x - playerCollisionRadius, y],
        [x, y + playerCollisionRadius],
        [x, y - playerCollisionRadius],
        [x + playerCollisionRadius, y + playerCollisionRadius],
        [x + playerCollisionRadius, y - playerCollisionRadius],
        [x - playerCollisionRadius, y + playerCollisionRadius],
        [x - playerCollisionRadius, y - playerCollisionRadius]
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