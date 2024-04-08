// Variables to store canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Constants for bat and ball properties
const batWidth = 10;
const batHeight = 60;
const ballRadius = 5;

// Variables to store game state
let playerScore = 0;
let computerScore = 0;
let playerName = ""; // Variable to store player's name
let playerY = canvas.height / 2 - batHeight / 2;
let computerY = canvas.height / 2 - batHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = -3;
let ballSpeedY = 3;

// Function to start the game
function startGame() {
  playerName = document.getElementById("nameInput").value;
  if (!playerName.trim()) {
    alert("Please enter your name.");
    return;
  }
  
  // Hide start container
  document.getElementById("startContainer").style.display = "none";
  
  // Display canvas
  document.getElementById("canvas").style.display = "block";
  
  // Call the draw function to start the game
  draw();
}

// Function to draw the bats and ball
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bats
  ctx.fillStyle = "white";
  ctx.fillRect(10, playerY, batWidth, batHeight);
  ctx.fillRect(canvas.width - batWidth - 10, computerY, batWidth, batHeight);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fill();

  // Draw player's name and score
  ctx.font = "20px Arial";
  ctx.fillText(playerName + " score: " + playerScore, 20, 30);

  // Draw computer's name and score
  ctx.fillText("Pingy score: " + computerScore, canvas.width - 160, 30);

  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom walls
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with bats
  if (
    (ballX - ballRadius <= batWidth + 10 && ballY >= playerY && ballY <= playerY + batHeight) ||
    (ballX + ballRadius >= canvas.width - batWidth - 10 && ballY >= computerY && ballY <= computerY + batHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Computer bat movement
  if (ballY < computerY + batHeight / 2) {
    computerY -= 5;
  } else {
    computerY += 5;
  }

  // Check for point scored
  if (ballX - ballRadius <= 0) {
    computerScore++;
    reset();
  } else if (ballX + ballRadius >= canvas.width) {
    playerScore++;
    reset();
  }

  // Redraw
  requestAnimationFrame(draw);
}

// Function to reset the ball position
function reset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

// Event listeners for player bat movement
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowUp" && playerY > 0) {
    playerY -= 10;
  } else if (event.code === "ArrowDown" && playerY + batHeight < canvas.height) {
    playerY += 10;
  }
});

// Start the game
draw();