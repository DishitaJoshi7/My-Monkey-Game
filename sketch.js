var monkey, monkey_running, jungle
var banana, bananaImage, obstacle, obstacleImage, jungleImage
var FoodGroup, obstacleGroup
var score, ground, rand
var survivalTime = 0

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkey_collided = loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg")
}



function setup() {
  createCanvas(500, 550);

  jungle = createSprite(250, 250, 10, 10);
  jungle.addImage("bg", jungleImage)


  monkey = createSprite(250, 300, 30, 30);
  monkey.addAnimation("monkey", monkey_running)
  monkey.scale = 0.1;



  ground = createSprite(500, 315, 1000, 10);
  ground.velocityX = -4;
  ground.x = width / 2;


  FoodGroup = createGroup();
  obstacleGroup = createGroup();

  survivalTime = 0


}


function draw() {
  background("500");

  //jump when space is pressed
  if (keyDown("space")) {
    monkey.velocityY = -10;
  }

  //adding gravity
  monkey.velocityY = monkey.velocityY + 0.5;

  //collide with ground
  monkey.collide(ground);

  //ground reset
  ground.velocityX = -3
  if (ground.x < 0) {
    ground.x = width / 2
  }

  food();
  obstacles();

  if (monkey.isTouching(obstacleGroup)) {
    monkey.velocityX = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.addAnimation("monkey", monkey_collided);
    survivalTime = 0;
  }
  
  

  drawSprites();

  fill("yellow")

  //survival time
  textSize(30)
  text("Survival Time:" + survivalTime, 10, 40);

  survivalTime = survivalTime + Math.round(getFrameRate() / 60)


}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(550, 250, 30, 30)
    banana.y = Math.round(random(120, 200))
    banana.addImage("food", bananaImage)
    banana.scale = 0.1
    banana.lifetime = -1
    banana.velocityX = -3
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(550, 280, 30, 30);
    obstacle.addImage("stone", obstaceImage)
    obstacle.scale = 0.2
    obstacle.lifetime = -1
    obstacle.velocityX = -2
    obstacleGroup.add(obstacle)


  }
}