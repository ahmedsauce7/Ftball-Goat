// canvas
window.addEventListener('load', () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const startScreen = document.querySelector(".game-intro");
    const restartBtn = document.querySelector('#restart-button');
// music
    const audio = new Audio ("sounds/audio.mp3");
    const mute = document.querySelector("#mute-button");
    audio.volume = 0.1;

// game start
    let isGameStarted = false;
    
      
document.getElementById('start-button').onclick = () => {
      startGame()
    };
    
    canvas.style.display = 'none'
    restartBtn.style.display = 'none'
// how to hide the mute button    
    //mute.style.display = 'none'
    
//staduim img
    const staduimImg = new Image ()
    staduimImg.src = "images/soccer-stadium.png";
    
//player img
    const playerImg = new Image ()
    playerImg.src = "images/player.png";
    
//panel
    const panelImg = new Image ()
    panelImg.src = "images/panel.png";
    
//player
    const player = {
      height: 200,
      width: 100,
      speed: 4,
    }
    
// player properties 
    let playerX = canvas.width/2 - player.width
    let playerY = canvas.height - player.height
    
//ball img 
    let ballImg = new Image () 
    ballImg.src ="images/soccer.png";
    
// ball properties
    let ballX = 100
    let ballY = 100
    let ballSpeedX = 1
    let ballSpeedY = 1 
    let ballRadius = 20
   
// gravity 
    const gravity = 0.2
    
// left and right properties
    let isMovingLeft = false
    let isMovingRight = false
    
// game over
    let score = 0
    let gameOver = false
    let animateId
    
// ball 
    const drawBall = () => {
        ctx.beginPath()
        ctx.fillStyle = 'tomato'
// x, y, radius, startAngle, endAngle
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
      }
    
    const animate = () => {
        ctx.drawImage(staduimImg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(playerImg, playerX, playerY, player.width, player.height)
// ctx.drawImage(ballImg, ballX, ballY, 30, 0, Math.PI * 2)
        drawBall()
      
      
    
// right wall 
    if (ballX > canvas.width - ballRadius)
      {
        ballSpeedX *= -1
      }
    
//floor 
    if (ballY > canvas.height - player.height - ballRadius &&
        ballX > playerX &&
        ballX < playerX + player.width)
        {
        ballSpeedY = -10
        player.width *=1 
        score += 1
    
//left side and right side of the head
    if (ballX < playerX + player.width / 2){
        ballSpeedX = -5
        } 
    else {
        ballSpeedX = 5
        }
        }
//left wall 
    if (ballX < ballRadius)
        {
        ballSpeedX *=-1
        }
// ceilling 
    if (ballY < ballRadius)
        {
        ballSpeedY *= -1
        }
    
    if (isMovingLeft && playerX > 0){
        playerX -= player.speed
        }
    else if(isMovingRight && playerX < canvas.width - player.width) {
        playerX += player.speed
        }
    
// ball speed
        ballX += ballSpeedX
        ballY += ballSpeedY
    
//gravity 
        ballSpeedY += gravity
    
//gameover
    if (ballY > canvas.height - ballRadius) {
        gameOver = true 
        }
    
        ctx.drawImage(panelImg,0 ,0, 80, 80)
        ctx.font = '35px sans'
        ctx.fillText(score,32,50)
    
    if (gameOver) 
        {
cancelAnimationFrame(animateId)
      
        
//Gameover text 
        ctx.drawImage(panelImg,canvas.width / 2 - 180, 100, 400, 400 )
        ctx.font = '55px Arial'
        ctx.fillStyle = 'black'
        ctx.fillText('GAME OVER', canvas.width / 2 - 150, canvas.height / 2)
//Your total score
        ctx.fillStyle = 'black'
        ctx.font = '30px sans'
        ctx.fillText(`Your Total Score: ${score}`, canvas.width / 2 - 100, canvas.height / 2 + 50)
        restartBtn.style.display = 'block';
        }
    else { 
        animateId = requestAnimationFrame(animate)
        }
        }
    
    
// Window
    function startGame() {
        canvas.style.display = 'block'
        startScreen.style.display = 'none'
animate()
        audio.play()
        
        }
    // if (isGameStarted === true ) {
    //     startGame();
    //}

// restart button
        restartBtn.addEventListener('click', () => {
// show canvas and hide start screen
        canvas.style.display = 'block'
        startScreen.style.display = 'none'
        restartBtn.style.display = 'none'
        
        playerX = canvas.width/2 - player.width;
        playerY = canvas.height - player.height;
      
        ballX = 100;
        ballY = 100;
        ballSpeedX = 1;
        ballSpeedY = 1;
        ballRadius = 20;
      
        isMovingLeft = false;
        isMovingRight = false;
      
        score = 0;
        gameOver = false;
      
// start the game
        startGame();
        });
    
      
      
    
// AddEventListener
mute.addEventListener("click" , () => {
    audio.muted = !audio.muted;
})
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        isMovingLeft = true;
// wait till player moves  
    isGameStarted = true;
        }
      if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        isMovingRight = true;
// wait till player moves        
    isGameStarted = true;
        }
        })
document.addEventListener('keyup', event => {
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        isMovingLeft = false;
        }
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        isMovingRight = false
        }
        })
        })