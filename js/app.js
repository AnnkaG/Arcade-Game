/****************** ENEMY PART  ***********************/
/******************************************************/

var gameOn = true;
var score = 0;

// Enemy function constructor
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Updates the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // dt parameter ensures the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
        
    //starting from the beginning if off canvas
    if(this.x > 570){
        this.x = -100;
        this.speed = 40 + Math.floor(Math.random()*200); 
    }
  
    this.checkCollision();
};

// checkCollision function - checks position of player and enemy - when too close collision occurs 
Enemy.prototype.checkCollision = function (){

   if (player.x < this.x + 80 &&
        player.x + 60 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
          player.x = 203;
          player.y = 380;
        
        if(score <= 0){
          score = 0;
        } else  {   
          score = score - 50;
        }
       
        updateScore();
        blick(); 
   }    
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/****************** PLAYER PART  **********************/
/******************************************************/


// Player function constructor
var Player = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite ='images/char-pink-girl.png';
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player update function
Player.prototype.update = function() {
  // Prevent player from moving beyond canvas wall boundaries

    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching top of canvas and update the score
    if (this.y < -10) {
        this.x = 200;
        this.y = 380;
        score = score + 100;
        updateScore();
    }
};

// Player handleInput function
Player.prototype.handleInput = function(keyPress) {
    switch(keyPress){
       case 'left' :
           this.x = this.x - 50;
           break;
       case 'up':
           this.y = this.y  - 35;
           break;
       case 'right':
           this.x = this.x  + 50;
           break;
       case 'down':
           this.y =  this.y + 35;
           break;
    }   
};

// instantiate enemy objects and define player

var allEnemies = [];
var player  = new Player(200,380);
var enemyPosition = [60,105, 150, 195, 230]; // y positions of the enemy

// initiates enemies with different speed
enemyPosition.forEach(function(posY) {

   var enemy = new Enemy(-100, posY, 20 + Math.floor(Math.random() * 100));
   allEnemies.push(enemy);
});




// This listens for key presses and sends the keys to your
 var elem = function(e) {
 var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
};

document.addEventListener('keyup', elem);



/****************** HELP FUNCTIONS  *******************/
/******************************************************/

// blick function - screen blicks yellow on collision with enemy
function blick() {
    document.querySelector('body').style.backgroundColor = 'lawngreen';
    setTimeout(function () {

        document.querySelector('body').style.backgroundColor = 'cadetblue';
    }, 100);
}

// updateScore function - updates DOM element of the score
function updateScore() {
     document.getElementById("skore").innerHTML = score;
}

// stop function - stops the game after time is off, resets allEnemies, disables keypress event
function stop() {
    allEnemies = [];
    player.x = 200;
    player.y = 380;
    document.removeEventListener('keyup', elem);
    gameOn = false;    
}
    



/****************** TIMER *****************************/
/******************************************************/

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==0 && m==0) {
    document.getElementById('timer').innerHTML = "0:00";
    
    showModal();
    stop();  
  } else {
      if(s==59)
      {m = m - 1;}
      document.getElementById('timer').innerHTML =
    m + ":" + s;
    setTimeout(startTimer, 1000);
  }

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec;} // add zero in front of numbers < 10
  if (sec < 0) {sec = "59";}
  return sec;
}
}


/****************** MODAL WINDOW  *********************/
/******************************************************/

// (source https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal2)

// Get the modal
var modal = document.getElementById('myModal');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function showModal() {
    modal.style.display = "block";
    document.getElementById("points").innerHTML = score;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};








