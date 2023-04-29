var bg, bgImg, ground, groundImg, cityBG; 
var hero, heroImg;
var gameState;
var titleImg;
var bulletImg, bulletGroup;
var bot1Img, bot2Img, botGroup1, botGroup2;
var bgSound;
var score;
var edges;

function preload(){
bgImg = loadImage("./Images/city_on_fire.webp")
heroImg = loadImage("./Images/Survivor_0.png")
cityBG = loadImage("./Images/Disaster.png")
bulletImg = loadImage("./Images/bullet1.png")
bot1Img = loadAnimation("./Images/bot10.png","./Images/bot11.png")
bot2Img = loadAnimation("./Images/spiker0.png","./Images/spiker1.png")
bgSound = loadSound("./sound/bgSound.wav");



}

function setup() {
  createCanvas(windowWidth, windowHeight);
   bg = createSprite(width/2, height/2, width*1.2, height);
   bg.addImage(cityBG);
   bg.scale = 2;
   bg.visible = false;
   bg.velocityX = -2
  
  ground = createSprite (width/2, height-10, width, 10)
  ground.visible = false;

  hero = createSprite(300,300,30,20);
  hero.addImage(heroImg);
  hero.scale = 0.15;
  hero.visible = false;

  bulletGroup  =  new Group();
  botGroup1 = new Group();
  botGroup2 = new Group();

  gameState = "start";

  score = 0
}

function draw() {
  background(0);

  edges = createEdgeSprites();
  botGroup2.bounceOff(edges[0])
  botGroup2.bounceOff(edges[2])
  botGroup2.bounceOff(edges[3])

  if (gameState === "start") {
    bg.visible = true;

    //titleImg = createImg("./Images/city_on_fire.webp");
    //titleImg.position(width/2 - 400, 100);
    //titleImg.size(400, 150)


    textSize(40);
    text("PRESS SPACE TO START THE GAME", width/2 - 300, height/2 + 300);

    if (keyDown("space")) {
      gameState = "play";
    }
    
  } else if(gameState === "play"){
    //hideTitle();
    if (!bgSound.isPlaying()) {
      bgSound.play()
      
    }
      play()
    
    
  } else{
    bgSound.stop()
    textSize(35);
    text("GAME OVER", width/2, height/2);
  }

}

function hideTitle(){
  titleImg.hide();

}

function play(){
  hero.visible = true;
  hero.collide(ground);



  if(bg.x-400 < 0){
    bg.x = width/2+450
  }
  
  if (keyDown(LEFT_ARROW)) {
    hero.x = hero.x - 10 ;
  }

  if (keyDown(RIGHT_ARROW)) {
    hero.x = hero.x + 10;
  }

  if (keyDown(UP_ARROW)) {
    hero.velocityY = hero.velocityY-0.9;

  }
  hero.velocityY = hero.velocityY + 0.8  

  if (bulletGroup.isTouching(botGroup1)) {
    botGroup1.destroyEach();
    score += 2
  }

  if(bulletGroup.isTouching(botGroup2))
   {
    
   }


  if (hero.isTouching(botGroup1) || hero.isTouching(botGroup2)) {
    gameState = "end"
  }

  spawnBot1();
  spawnBot2();
  drawSprites();

  textSize(30)
  fill("Red")
  text("SCORE :"+ score, width-1800, 50);
  
  

}

function keyPressed(){

  if (keyCode === 32) {
    var bullet = createSprite(hero.x, hero.y);
    bullet.addImage(bulletImg);
    bullet.scale = 0.2
    bullet.velocityX = 30
    bullet.lifetime = width/30
    bulletGroup.add(bullet)
    
  }
}

function spawnBot1(){
  if (frameCount%200 === 0){
    var bot1 = createSprite(width, height-10);
    bot1.y = Math.round(random(300,height-10));
    bot1.addAnimation("bot1",bot1Img)
    bot1.velocityX = -10;
    bot1.lifetime = width/10;
    botGroup1.add(bot1)}

    
  }

  function spawnBot2(){
  
      if (frameCount%550 === 0){
      var bot2 = createSprite(width, height-10);
      bot2.y = Math.round(random(499,498));
      bot2.addAnimation("bot2",bot2Img)
      bot2.debug = true;
      bot2.setCollider("circle",0,0,70);
      bot2.scale = 2.5
      bot2.velocityX = -10;
      bot2.velocityY = random(-2,+2)
      bot2.lifetime = width/10;
      //bot2.bounceOff(edges[0]);
      //bot2.bounceOff(edges[3]);
      botGroup2.add(bot2)
      
    }
  

}


function end(){

  hero.velocityX = 0
    hero.velocityY = 0
    hero.visible = false
}