var dog,dogImg;
var happyDog,happyDogImg;
var database;
var foodS;
var readState;
var foodStock,foodStockImg;
var fedTime;
var lastFed;
var gameState;
var hungry;
var feed;
var addFood;
var bedroom,garden,washroom;
var bedroomImg,gardenImg,washroomImg;
var vaccinationImg,runningImg,runningLeftImg;
var LivingRoomImg,LazyImg,InjectionImg,HappyDogImg;
var dogVaccinationImg,deadDogImg;
var foodObj;

function preload()
{
  dogImg=loadImage("dog.png");
  happyDogImg=loadImage("Happy.png");
  bedroomImg=loadImage("Bed Rooom.png");
  gardenImg=loadImage("Garden.png");
  washroomImg=loadImage("Wash Room.png");
  vaccinationImg=loadImage("Vaccination.jpg");
  runningImg=loadImage("running.png");
  runningLeftImg=loadImage("runningLeft.png");
  LivingRoomImg=loadImage("Living Room.png");
  LazyImg=loadImage("Lazy.png");
  InjectionImg=loadImage("Injection.png");
  HappyDogImg=loadImage("happy dog.png");
  dogVaccinationImg=loadImage("dogVaccination.png");
  deadDogImg=loadImage("deadDog.png");
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("add Food");
  addFood.position(800,95);
  addFood.mousePressed("addFoods");
   
  var foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
  
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}


function draw() {  
background(46,139,87)

if(gameState!=hungry){
feed.hide();
addFood.hide();
dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog);
}

if(currentTime==(lastFed+1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime==(lasteFed+2)){
  update("Sleeping");
  foodObj.bedroom();
}else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
  update("Bathing");
  foodObj.washroom();
}else{
  update("Hungry")
  foodObj.display();
}

if(keyWentDown(UP_ARROW)){
  writeStock(foods);
  dog.addImage(dogHappy);
}


  Food.display();
  Food.bedroom();
  Food.garden();
  Food.washroom();
  drawSprites();
  text("Foodremaining:",30,30)
  fill("white")
  stroke("black");
  textSize(5)
  fill("white");
  stroke("black")
  textSize(5);
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed :"+ lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else {
  text("Last Feed : "+lastFEd + "AM",350,30);
}
}


function readStock(data){
  foodS.data.val();
}
function writeStocks(){
  if(x<=0){
    x=0;
  }else{
    x=x+1;
  }
  
  database.ref('/').update({
    food:x
  })
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


