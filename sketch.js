var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudimage; 
var obstacle,obstacle1image;
var obstacle2image;
var obstacle3image;
var obstacle4image;
var obstacle5image;
var gamestate="play"
var obstaclegroup
var cloudgroup 
var score=0;
var trexcoll
var GameoverImage
var RestartImage
var gameover,restart
var checkpoint
var die
var jump

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudimage=loadImage("cloud.png")
  GameoverImage=loadImage("gameOver.png")
  RestartImage=loadImage("restart.png")
  
 
  obstacle1image=loadImage("obstacle1.png");
  obstacle2image=loadImage("obstacle2.png");
  obstacle3image=loadImage("obstacle3.png");
  obstacle4image=loadImage("obstacle4.png");
  obstacle5image=loadImage("obstacle5.png");
  obstacle6image=loadImage("obstacle6.png");
  
  trexcoll=loadAnimation("trex_collided.png");
  checkpoint=loadSound("checkPoint.mp3")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("Collision",trexcoll)
  trex.scale = 0.40;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  trex.setCollider("rectangle",2,15,60,100);
trex.debug=false
  obstaclegroup=createGroup()
  cloudgroup=createGroup()
  gameover=createSprite(300,75)
  gameover.addImage("Game Over",GameoverImage);
  gameover.scale=0.82
  restart=createSprite(300,120)
  restart.addImage(RestartImage)
  restart.scale=0.45
}

function draw() {
  //set background color
  background(180);
  text("score:"+score,500,20)
  if(gamestate=="play")
    {
      increasespeed()
      trex.changeAnimation("running",trex_running)
      ground.velocityX=-4
      gameover.visible=false;
      restart.visible=false;
      score=score+1
      if(keyDown("space")&& trex.y >= 150) {
    trex.velocityY = -10;
        jump.play()
        
  }
      if (score%100==0){
        checkpoint.play()
      }
        trex.velocityY = trex.velocityY + 0.8
      if (ground.x < 0){
    ground.x = ground.width/2;
    }
      spawnClouds()
  spawnObstacles()
      if (trex.isTouching(obstaclegroup))
        {
      gamestate="end"
          die.play()
        }
    }
  if (gamestate=="end")
    {
      trex.velocityY = trex.velocityY + 0.8
      trex.changeAnimation("Collision",trexcoll)
      gameover.visible=true
      restart.visible=true
      cloudgroup.setVelocityXEach(0);
      obstaclegroup.setVelocityXEach(0);
ground.velocityX=0
      cloudgroup.setLifetimeEach(-1);
      obstaclegroup.setLifetimeEach(-1);
 if(mousePressedOver(restart)){
   rebegin()
 }


      
    } 
    
  
  
  
  
  trex.collide(invisibleGround);
  
  drawSprites();
}
function rebegin()
{
  gamestate="play"
  cloudgroup.destroyEach();
obstaclegroup.destroyEach();
  score=0
}
 

function spawnClouds(){
  if(frameCount%60==0)
  {
 cloud=createSprite(550,15,10,20);
  cloud.addImage("anything",cloudimage);
  cloud.velocityX=-6
  cloud.y=random(10,70)
        cloud.lifetime=100
    cloudgroup.add(cloud)
}
}

function spawnObstacles(){
    if(frameCount%50==0)
{
  

  obstacle=createSprite(550,170,5,5)
  obstacle.scale=0.45
  obstacle.velocityX=-6
  var a=Math.round(random(1,6))
  console.log(a)
  switch(a){
    case 1: obstacle.addImage("Anything",obstacle1image)
      break;                
      case 2: obstacle.addImage("Anything",obstacle2image)
      break;
      case 3: obstacle.addImage("Anything",obstacle3image)
      break;
      case 4: obstacle.addImage("Anything",obstacle4image)
      break;
      case 5: obstacle.addImage("Anything",obstacle5image)
      break;
      case 6: obstacle.addImage("Anything",obstacle6image)
      break;
      
      
  }
  obstacle.lifetime=100
  obstaclegroup.add(obstacle)
}  
}
function increasespeed()
{
  if(score>200){
    cloudgroup.setVelocityXEach(-9);
      obstaclegroup.setVelocityXEach(-9);
    ground.velocityX=(-9)
  }
}
