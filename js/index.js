const canvas = document.querySelector("canvas");
canvas.style.border = "2px solid grey";
let ctx = canvas.getContext("2d");
let startScreen = document.querySelector(".game-intro");
let intervalId = 0;
let isGameOver = false;
let score = 0;
let background = new Image();
background.src = "../images/road.png";
let car = new Image();
car.src = "../images/car.png";
let carX = 250;
let carY = 400;
let carWidth = 80;
let carLength = 130;
//obstacle car
let obCar = new Image();
obCar.src = "../images/obcar.png";
let obCarX = 300;
let obCarY = -400;
let loser = new Image();
loser.src = "../images/loser.png";
const myObstacles = [];
var mySound;
const myMusic = new Audio("../images/bg.mp3");


window.onload = () => {
  canvas.style.display = "none";
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight" && carX + carWidth < canvas.width - 50) {
      carX += 4;
    } else if (event.code === "ArrowLeft" && carX > 50) {
      carX -= 4;
    }
  });


if(audio.isPaused)
   audio.play()
   audioElement.loop=true;
  

  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = ("../images/crash.mp3");
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  };

  function startGame() {
    canvas.style.display = "block";
    startScreen.style.display = "none";

  

    mySound = new sound("crash.mp3");
    myMusic.play() 
   
    //drawing the background and the cars
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(car, carX, carY, carWidth, carLength);
    ctx.drawImage(obCar, obCarX, obCarY, carWidth, carLength);
  
    

    //obCar movement
    obCarY += 2;
    if (obCarY > canvas.height) {
      obCarY = -400;
      score++;
    }
    //collision with cars
    if (
      carY < obCarY + carLength &&
      carX < obCarX + carWidth - 5 &&
      carX + carWidth > obCarX &&
      carY + carLength > obCarY
    ) 
    {
      isGameOver = true;
      mySound.play();
      myMusic.pause();
    }
    
    //scoreboard
    ctx.font = "30px Courier";
    ctx.fillText(`Score: ${score}`, 100, 40);
    intervalId = requestAnimationFrame(startGame);
    if (isGameOver) {
      cancelAnimationFrame(intervalId);
      gameOver();
    }
  }

  function gameOver() {
  ctx.drawImage(loser, 0, 0, canvas.width, canvas.height);
  setTimeout(window.location.reload.bind(window.location), 3000);
}
}


