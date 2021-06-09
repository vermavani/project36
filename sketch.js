var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var FeedTime;

//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadImage("dog1.png");
happyDog=loadImage("dog2.png");
playground = loadImage("play.jpg")
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(700,250,150,150);
  dog.addImage(sadDog);
  dog.scale=0.9;

  //create feed the dog button here
  feedTheDog = createButton("Feed the Dog")
  feedTheDog.position(700,95)
  feedTheDog.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(playground);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed=data.val();
  });

  //write code to read fedtime value from the database 
  textSize(20)
  fill("black")
  if(lastFed>=12){

    text("Last Feed:" +lastFed +"PM",300,30)
  }
  else if(lastFed==0){
    text("Last Feed: 12PM",300,30)
  }
  else{
    text("Last Feed:"+lastFed +"AM",300,30)
}
drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  dog.scale = 0.8;

  //write code here to update food stock and last fed time
  foodS--;
  database.ref('/').update({
  Food:foodS
    
  })
  database.ref('/').update({
   FeedTime:hour()
   
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
