var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg;
var spaceship;
var planetsGroup, obstaclesGroup;
var score = 0;

function preload() {
  bg_img = loadImage('./assets/background.jpg');
  spaceship_img = loadImage('./assets/Rocket_1.png');
  coin_img = loadImage('./assets/Coin_Image.png');

  planet_1 = loadImage('./assets/PlanetImage_1.png');
  planet_2 = loadImage('./assets/PlanetImage_2.png');
  planet_3 = loadImage('./assets/PlanetImage_3.png');
  planet_4 = loadImage('./assets/PlanetImage_4.png');
  planet_5 = loadImage('./assets/PlanetImage_5.png');

  obstacle_1 = loadImage('./assets/Obstacle_1.png');
  obstacle_2 = loadImage('./assets/Obstacle_2.png');
  obstacle_3 = loadImage('./assets/Obstacle_3.png');
  obstacle_4 = loadImage('./assets/Obstacle_4.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(width/2, height/2, width, height);
  bg.addImage(bg_img);
  bg.scale = 2;

  spaceship = createSprite(250, height/2 + 200, 100, 100);
  spaceship.addImage(spaceship_img);
  spaceship.scale = 0.8;

  planetsGroup = new Group();
  obstaclesGroup = new Group();
  // coinsGroup = new Group();
}

function draw() {
  background(255,255,255);

  if(gameState === PLAY) {

    if(spaceship.x > width - 65) {
      spaceship.x = width - 66;
    }

    if(spaceship.x < 65) {
      spaceship.x = 66;
    }

    if(spaceship.y > height - 30) {
      spaceship.y = height - 31;
    }

    if(spaceship.y < 30) {
      spaceship.y = 31;
    }

    if(keyDown(LEFT_ARROW)) {
      spaceship.x -= 6
    }

    if(keyDown(RIGHT_ARROW)) {
      spaceship.x += 6
    }

    if(keyDown(UP_ARROW)) {
      spaceship.y -= 6
    }

    if(keyDown(DOWN_ARROW)) {
      spaceship.y += 6
    }

    var r = Math.round(random(1,3));
    if(r === 1) {
      spawnPlanets();
    }
    else if (r === 2){
      spawnObstacles(); 
    }
    // else{
    //   spawnCoins();
    // }

    // for(var i=0; i<coinsGroup.length; i++) {
    //   if(coinsGroup.get(i).isTouching(spaceship)) {
    //     coinsGroup.get(i).destroy();
    //     score = score + 5;
    //   }
    // }

    for(var i=0; i<obstaclesGroup.length; i++) {
      if(obstaclesGroup.get(i).isTouching(spaceship)) {
        obstaclesGroup.get(i).destroy();
        score = score - 10;
      }
    }

    if(score <= - 20 || score >= 50) {
      gameState = END;
    }
  }
  
  else if(gameState === END) {
    obstaclesGroup.setVelocityXEach(0);
    planetsGroup.setVelocityXEach(0);
    // coinsGroup.setVelocityXEach(0);

    obstaclesGroup.setLifetimeEach(-1);
    planetsGroup.setLifetimeEach(-1);
    // coinsGroup.setLifetimeEach(-1);
  } 
  
  drawSprites();
  textSize(25);
  text("Score: " + score, width - 200, 100);

}

function spawnPlanets() {
  if(frameCount % 400 == 0) {

  planet = createSprite(width + 50, random(height/2 - 400, height/2 + 400), 50, 50);
  planet.velocityX -= 3;
  planet.scale = 0.3;

  var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: planet.addImage(planet_1);
      break;
      case 2: planet.addImage(planet_2);
      break;
      case 3: planet.addImage(planet_3);
      break;
      case 4: planet.addImage(planet_4);
      break;
      case 5: planet.addImage(planet_5);
      break;
    
    }
    
    planetsGroup.add(planet);
    
    planet.depth = spaceship.depth;
    spaceship.depth += 1;
  }
}

function spawnObstacles() {
  if(frameCount % 60 == 0) {
    
    obstacle = createSprite(width + 50, random(height/2 - 400, height/2 + 400), 50, 50);
    obstacle.velocityX -= 5;
    obstacle.scale = 0.5;

    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle_1);
      break;
      case 2: obstacle.addImage(obstacle_2);
      break;
      case 3: obstacle.addImage(obstacle_3);
      break;
      case 4: obstacle.addImage(obstacle_4);
      break;
    }

    obstaclesGroup.add(obstacle);
    obstacle.lifetime = 500;

    obstacle.depth = spaceship.depth;
    spaceship.depth += 1; 
  }
}

// function spawnCoins() {
//   if(frameCount % 50 == 0) {
//     coin = createSprite(Math.round(random(50, width - 50)), Math.round(random(50, height - 50)));
//     coin.scale = 0.1;
//     coin.addImage(coin_img);

//     coinsGroup.add(coin);
//     coin.lifetime = 500;
//     coin.depth = spaceship.depth;
//     spaceship.depth += 1;
//   }
// }