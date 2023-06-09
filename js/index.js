// Canvas
window.addEventListener('load', () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const startScreen = document.querySelector(".game-intro");
    const restartBtn = document.querySelector('#restart-button');
    const goatBtn = document.querySelector('#goat-button')
    const imageGoat = document.querySelector('.goatImg')

// Music
    const audio = new Audio ("./sounds/audio.mp3");
    const sui = new Audio ("./sounds/sui.mp3")
    const mute = document.querySelector("#mute-button");
    audio.volume = 0.2;

// GOAT Image
    let showImage = false;
    
// Start button
document.getElementById('start-button').onclick = () => {
      startGame()
    };
    
    canvas.style.display = 'none'
    restartBtn.style.display = 'none'
    imageGoat.style.display = 'none'   
    //mute.style.display = 'none'
    
// Staduim img
    const staduimImg = new Image ()
    staduimImg.src = "./images/soccer-stadium.png";
    
// Player img
    const playerImg = new Image ()
    playerImg.src = "./images/player.png";
    
// Panel
    const panelImg = new Image ()
    panelImg.src = "./images/panel.png";

    const goatImg = new Image () 
    goatImg.src = "./images/cr7.png"
    
// Player
    const player = {
      height: 200,
      width: 100,
      speed: 4,
    }
    
// Player properties 
    let playerX = canvas.width/2 - player.width
    let playerY = canvas.height - player.height
    
// Ball properties
    let ballX = 100
    let ballY = 100
    let ballSpeedX = 1
    let ballSpeedY = 1 
    let ballRadius = 20
   
// Gravity 
    const gravity = 0.3
    
// Left and right properties
    let isMovingLeft = false
    let isMovingRight = false
    
// Game over
    let score = 0
    let gameOver = false
    let animateId
    
// Ball 
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
        drawBall()
      
      
    
// Right wall 
    if (ballX > canvas.width - ballRadius)
    {
        ballSpeedX *= -1
    }
    
// Floor 
    if (ballY > canvas.height - player.height - ballRadius &&
        ballX > playerX &&
        ballX < playerX + player.width)
    {
        ballSpeedY = -10
        player.width *= 1 
        score += 1
    
// Left side and right side of the head
    if (ballX < playerX + player.width / 2){
        ballSpeedX = -5
        } 
    else {
        ballSpeedX = 5
        }
    }
// Left wall 
    if (ballX < ballRadius)
    {
        ballSpeedX *= -1
    }
// Ceilling 
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
    
// Ball speed
        ballX += ballSpeedX
        ballY += ballSpeedY
    
// Gravity 
        ballSpeedY += gravity
    
// Gameover
    if (ballY > canvas.height - ballRadius) 
    {
        gameOver = true 
    }
    
        ctx.drawImage(panelImg,0 ,0, 80, 80)
        ctx.font = '35px sans'
        ctx.fillText(score,31,50)
    
    if (gameOver) 
    {
cancelAnimationFrame(animateId)
      
        
// Gameover text 
        ctx.drawImage(panelImg,canvas.width / 2 - 180, 100, 400, 400 )
        ctx.font = '55px impact'
        ctx.fillStyle = 'red'
        ctx.fillText('GAME OVER', canvas.width / 2 - 100, canvas.height / 2)
// Your total score
        ctx.fillStyle = 'black'
        ctx.font = '30px Gill sans'
        ctx.fillText(`Your Total Score: ${score}`, canvas.width / 2 - 100, canvas.height / 2 + 50)
        restartBtn.style.display = 'block';
// Goat of Football
        ctx.fillStyle = 'black'
        ctx.font = '20px Bradley Hand'
        ctx.fillText('Click on the G.O.A.T. of Football', canvas.width / 2 - 118, canvas.height / 2 - 120)
    }
    else 
    { 
        animateId = requestAnimationFrame(animate)
    }
        }
    
    
// Window
    function startGame() 
        {
        canvas.style.display = 'block'
        startScreen.style.display = 'none'
animate()
        audio.play()
        }

// Restart button
        restartBtn.addEventListener('click', () => 
    {
// Show canvas and hide start screen
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
      
// Start the game
        startGame();
    });
    
      
      
    
// AddEventListener
        goatBtn.addEventListener("click" , () => 
    {
        showImage = !showImage
    if (showImage){
        imageGoat.style.display = 'block'
        sui.play()
        } 
    else 
        {
        imageGoat.style.display = 'none'
        }
    })

        mute.addEventListener("click" , () => 
    {
        audio.muted = !audio.muted;
    })
document.addEventListener('keydown', event => 
    {
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        isMovingLeft = true;

        }
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        isMovingRight = true;
        }
    })
document.addEventListener('keyup', event => 
    {
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        isMovingLeft = false;
        }
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        isMovingRight = false
        }
    })
        })