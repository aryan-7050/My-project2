let gameSeq = [];
let userSeq = [];

// The names of the colors/buttons. These must match the class/ID in HTML
let btns = ["yellow", "green", "red", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let body = document.querySelector("body"); // Added for simpler body access

// 1. Game Start Handler
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game is started");
    started = true;
    levelUp();
  }
});

// 2. Button Flash Function
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

// 3. Level Up Function
function levelUp() {
  userSeq = []; // Reset user sequence for the new level
  level++;
  h2.innerText = `Level ${level}`;

  // Choose a random button for the game sequence
  let randIdx = Math.floor(Math.random() * btns.length);
  let randcolor = btns[randIdx];
  // Select button using its ID (more specific than class)
  let randBtn = document.querySelector(`#${randcolor}`); 
  
  gameSeq.push(randcolor);
  console.log("Game Sequence:", gameSeq); // Log the full sequence for debugging
  
  btnFlash(randBtn); 
}

// 4. Check Answer Function
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    // Correct! Check if the sequence is complete.
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000); // Wait 1 second before starting the next level
    }
  } else {
    // Incorrect! Game Over.
    h2.innerHTML = `Game over! Your score was <b>${level - 1}</b>.<br>Press any key to restart.`;
    
    // Flash red background for error indication
    body.style.backgroundColor = "red";
    setTimeout(function() {
      body.style.backgroundColor = "white"; // Or your default body color
    }, 150);
    
    // Reset game state
    resetGame(); 
  }
}

// 5. Button Press Handler
function btnPress() {
  if (!started) return; // Ignore presses before the game starts
  
  let btn = this;
  btnFlash(btn); 

  let userColor = btn.getAttribute("id"); // Get the color from the button's ID
  userSeq.push(userColor); 
  
  // Check the *last* element added to the user sequence
  checkAns(userSeq.length - 1); 
}

// 6. Game Reset Function (Encapsulation for cleaner code)
function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// 7. Event Listener Setup
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}