const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var balls = [];
var boatAnimation =[];
var boatSpritedata, boatSpritesheet;

var brokenBoatAnimation=[];
var brokenBoatSpritedata, brokenBoatSpritesheet;

var cannonExplosion;


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  cannonBallImage = loadImage("./assets/cannonball.png");
  boatSpritedata=loadJSON("assets/voat/boat.json");
  boatSpritesheet=loadImage("assets/boat/boat.png");
  brokenBoatSpritedata=loadJSON("assets/boat/broken_boat.json");
  brokenBoatSpritesheet=loadImage("assets/boat/broken_boat.png");
  cannonExplosion=loadSound("./assets/cannon_explosion.mp3")

}


function setup() {
  canvas = createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;
  angle=-PI/4;

  ground = new Ground(0,height,-1,width*2,-1);
  tower = new Tower(150,350,160,310);
  cannon = new Cannon(180,110,100,50,angle);


  var boatFrames=boatSpritedata.frames;
  for(var i=0; i<boatFrames.length; i++){
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

  var brokenBoatFrames = brokenBoatSpritedata.frames;
  for (var i = 0;i< brokenBoatFrames.length;i++){
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }

  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() 
{
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Matter.Body.setVelocity(boat.body,{
    x:-0.9,
    y:0
  });

  Engine.update(engine);
  tower.display();
  cannon.display();
  boat.display();

  for(var i=0; i<balls.length ; i++){
    showCannonBalls(balls[i],i);
  }

  for(var j = 0; j<boats.length; j++){
    if (balls[i] !== undefined && boats[j] !== undefined){
      var collision = Matter.SAT.collides(balls[i].body, boats[j].body)
      if (collision.collided){
        boats[j].remove(j);
        Matter.World.remove(world.remove(world, balls[i].body));
        balls.splice(i,1);
        i--;
      }
    }
  }
}

function KeyPressed(){
  if(keyCode===DOWN_ARROW){
    cannonBall = new CannonBall(cannon.x,cannon.y);
    balls.push(cannonBall);
  }
}

function keyReleased(){
  if(keyCode===DOWN_ARROW){
    cannonExplosion.play();
    balls[balls.length-1].shoot();
  }
}

function showCannonBalls(ball,index){
  ball.display();
  if(ball.body.position.x >= width||ball.body.position.y >= height-50){
    Matter.World.remove(world, ball[i].body);
    balls.splice(index, 1);
  }
}

function showBoats(){
  if(boats.length>0){
    if(
      boats.length<4&&
      boats[boats.length-1].body.position.x<width-300
    ){
      var positions=(-40,-60, -70,-20);
      var position = random(positions);
      boat = new Boat(width, height -100, 170, 170, position,boatAnimation);
      boat.push(boat);
    }
    for (var i = 0; i < boats.length; i++){
      Matter.Body.setVelocity(boat[i].body,{
        x:-0.9,
        y:0
      });
      boats[i].display();
      boats[i].animate();
    }
    else{
      var boat=new Boat(width, height-100,200,200,-100);
      boats.push(boat);
    }
  }
}