var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

var bricks = [];

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    game.paddle.moveTo(relativeX - Paddle.width / 2);
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

class Paddle {
  constructor() {
    this.x = paddleX;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.x,
      canvas.height - Paddle.height,
      Paddle.width,
      Paddle.height
    );
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  move(dx) {
    this.x += dx;
  }

  moveTo(x) {
    this.x = x;
  }
}
Paddle.width = 75;
Paddle.height = 10;

class Ball {
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}

class Brick {
  constructor(x, y) {
    this.status = 1;
    this.x = x;
    this.y = y;
  }
  draw(ctx) {
    if (this.status == 0) return;
    ctx.beginPath();
    ctx.rect(this.x, this.y, Brick.brickWidth, Brick.brickHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  isCollide(x, y) {
    if (
      this.status === 1 &&
      x > this.x &&
      x < this.x + Brick.brickWidth &&
      y > this.y &&
      y < this.y + Brick.brickHeight
    )
      return true;
    else return false;
  }

  die() {
    this.status = 0;
  }
}

Brick.brickHeight = 20;
Brick.brickWidth = 75;

class Bricks {
  constructor() {
    this.bricks = [];
    for (var c = 0; c < brickColumnCount; c++) {
      this.bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {
        var brickX = r * (Brick.brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = c * (Brick.brickHeight + brickPadding) + brickOffsetTop;
        this.bricks[c][r] = new Brick(brickX, brickY);
      }
    }
  }

  draw(ctx) {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        this.bricks[c][r].draw(ctx);
      }
    }
  }
}

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");

    this.bricks = new Bricks();
    this.ball = new Ball();
    this.paddle = new Paddle();
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.bricks.draw(this.ctx);
    this.ball.draw(this.ctx);
    this.paddle.draw(this.ctx);
    drawScore();
    drawLives();
    this.collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > this.paddle.x && x < this.paddle.x + Paddle.width) {
        dy = -dy;
      } else {
        lives--;
        if (!lives) {
          alert("GAME OVER");
          document.location.reload();
        } else {
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = 3;
          dy = -3;
          this.paddle.moveTo((canvas.width - Paddle.width) / 2);
        }
      }
    }

    if (rightPressed && this.paddle.x < canvas.width - Paddle.width) {
      this.paddle.move(7);
    } else if (leftPressed && paddleX > 0) {
      this.paddle.move(-7);
    }

    x += dx;
    y += dy;
    requestAnimationFrame(this.draw.bind(this));
  }

  collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        var b = this.bricks.bricks[c][r];
        if (b.isCollide(x, y)) {
          dy = -dy;
          b.die();
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

const game = new Game(canvas);
game.draw();
