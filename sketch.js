var PLAY = 1;
var END = 0;
var gameState ;//= PLAY;

var playerImage, player;
var backgroundImg, background;
var ground;
var obstacaleImg;
var coinImg;
var bottleGroup, obstacleGroup;
var score = 0;
var playerCollided;
var gameOver;
var gameOverImg;
var restart, restartImg;
var bottleGroup, bottle, bottleImg;
var isDisplayIntro=true;

var play, restartImg;
var playbutton;
var playButtonImg;
var displayIntroduction;
var plasticImg, p1Img;
var playstart, playstartImg;

function preload(){

playerImage = loadAnimation("a.png","b.png","c.png");

backgroundImg = loadImage("background.jpg");

obstacaleImg = loadImage("Obstacle.png");

coinImg = loadImage("pbottle.png");

playerCollided = loadAnimation("c.png");

gameOverImg = loadImage("gameOver.jpg");
 
restartImg = loadImage("restart.png");

bottle = loadImage("pbottle.png");

jumpSound = loadSound("jump.mp3");

playButtonImg = loadImage("playButton.png");

plasticImg = loadImage("plastic123.png");

p1Img = loadImage("p2.jpg");

playstartImg = loadImage("playstart.png")
}

function setup(){
  createCanvas(windowWidth, windowHeight)

player = createSprite(windowWidth-1100,windowHeight-120,50,100);
player.addAnimation("Img", playerImage);
player.addAnimation("collided",playerCollided);
player.scale=1.5;

gameOver=createSprite(windowWidth-600,windowHeight-400,60,60);
gameOver.addImage(gameOverImg);
gameOver.scale=0.5;

plastic=createSprite(windowWidth-850,windowHeight-350,60,60);
plastic.addImage(plasticImg);
plastic.scale=0.3;

p1 = createSprite(windowWidth-400,windowHeight-350,60,60);
p1.addImage(p1Img);
p1.scale= 0.5;

playstart = createSprite(windowWidth-600,windowHeight-150,60,60);
playstart.addImage(playstartImg);
playstart.scale=0.4;

background = createSprite(0,0, windowWidth,windowHeight);
background.scale = 1;
background.addImage(backgroundImg);
background.velocityX = -3;
background.depth = player.depth;
player.depth =  player.depth+1;

background.x = background.width/2;

ground = createSprite(550,650,windowWidth + 2000,10);
ground.velocityX = -3;
ground.x = ground.width/2;

restart = createSprite(windowWidth-600,windowHeight-250,30,30);
restart.addImage(restartImg);
restart.scale  = 0.2;



bottleGroup = new Group();
obstacleGroup = new Group();

playbutton = createSprite(windowWidth-580,windowHeight-200,30,30);
playbutton.addImage(playButtonImg);
playbutton.scale  = 0.2;

}

var isPlay=true;
var disp=true;

function draw(){
  if(isPlay){
    playbutton.visible=true;
    ground.velocityX = 0;
    background.velocityX = 0;
    player.velocityY = 0;
   obstacleGroup.setVelocityXEach(0);
   bottleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bottleGroup.setLifetimeEach(-1);
    gameOver.visible= false;
    plastic.visible=true;
    p1.visible=true;
    playstart.visible=false;
    restart.visible=false;

    
  
    //displayIntroduction();
    

    if(mousePressedOver(playbutton)){
      gameState = PLAY;
      playbutton.visible=false;
      background.velocityX = -3;
      ground.velocityX = -3;
      plastic.visible=false;
      p1.visible=false;
      playstart.visible=false;
    
      disp=false;
    // play();
    }
    
  }
  
 
  if(gameState === PLAY){
    isPlay=false;
    if(background.x < 0){
      background.x = background.width/2;
    }
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && player.y >=500 ){
      player.velocityY= -22;

      jumpSound.play();
    }
    console.log('Player',player);

    player.velocityY = player.velocityY+0.8;
    player.collide(ground);

    if(obstacleGroup.isTouching(player)){
      gameState = END;
    
    }

    for(var i =0; i<bottleGroup.length; i++){
      if(bottleGroup.get(i).isTouching(player)){
        score = score + 10;
        bottleGroup.get(i).destroy();
      }
    }
    if(bottleGroup.isTouching(player)){
      score = score + 10;
    }
  gameOver.visible=false;
  restart.visible = false;
    spawnObstacles();
    spawnCoin();

    
  
  }
 
  if(gameState === END ){
    ground.velocityX = 0;

    background.velocityX = 0;

    player.velocityY = 0;
    player.velocityX  = 0;
   obstacleGroup.setVelocityXEach(0);
   bottleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bottleGroup.setLifetimeEach(-1);
    player.changeAnimation("collided", playerCollided);
    gameOver.visible=true;
    restart.visible = true;

    if(mousePressedOver(restart)){
      reset();
    }
  }

 

  
  drawSprites();
  
  

 textSize(35);
 fill("red");
 text("Score : "+score,70,80);

 if(disp){
  textSize(28);
  fill("#ADD8E6");
  text("Press space to jump ",1000,80);
  textSize(20);
  fill("yellow");
  text("Marine Plastic pollution is a huge problem.Marine species ingest or are entangled by plastic debris, which causes severe injuries and deaths..",100,110);
      textSize(28);
      fill("yellow");
      text(" Help this boy collect the plastic and beware don't touch the poisonous fish.",240,150);
      textSize(28);
      fill("pink");
      text(" Click this play button to start the game",580,550);

 }
  
}
 
  function displayIntroduction(){
    textSize(28);
      fill(255);
      text("Marine plastic pollution is a huge problem. Help this boy collect the plastic.",240,80);
      disp=false;
    }
  
 

function spawnObstacles(){
  if(frameCount % 150 === 0){

    var obstacle = createSprite(1200,600,40,40);
    obstacle.y= Math.round(random(400,600));
   obstacle.addImage(obstacaleImg);
   obstacle.velocityX = -3;
   obstacle.scale = 0.1;
   obstacle.lifetime=1000;
   obstacle.setCollider("circle",0,0,15);
    obstacle.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
  
    
   obstacleGroup.add(obstacle);

  }
}

function spawnCoin(){
  if(frameCount % 150 === 0){
    var coin = createSprite(1200,600,40,30);
    coin.y=Math.round(random(200,350));
    coin.addImage(coinImg);
    coin.velocityX= -5;
    coin.scale = 0.2;
    coin.lifetime=1000;
    coin.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
   
    bottleGroup.add(coin);
  }
}

function reset(){
  gameState = PLAY;
 
  background.velocityX = -3;

  ground.velocityX = -3;

  score = 0;
  gameOver.visible=false;
  restart.visible = false;
  bottleGroup.destroyEach();
  obstacleGroup.destroyEach();
  player.changeAnimation("Img", playerImage);
}

 
