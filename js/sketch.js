//Create variables here
var dog
var dogImg,happyDogImg
var database
var foodS,foodStock
var feedDogButton,addFoodButton

function preload()
{
  //load images here
  dogImg = loadImge("images/dogImg.png");
  happyDogImg = loadImage("images/dogImage1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);
  
  dog = createSprite(250,250);
  dog.addImage(dogImg)
  dog.scale = 0.2

  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  foodObj = new Food();
  foodObj.getFoodStock();

  feedDogButton = createButton("Feed The Dog!")
  feedDogButton.positionX = 850;
  feedDogButton.positionY = 95;
  feedDogButton.mousePressed(feedDog);

  addFoodButton = createButton("Get More Food!")
  addFoodButton.positionX = 950;
  addFoodButton.positionY = 95;
  addFoodButton.mousePressed(addFood);

  database.ref('FeedTime').on("value", function(data){
    lastFed = data.val();
  })
}

function draw() {  
  background(46,139,87);
  textSize(35);
  fill(255,255,255);

  if(lastFed >= 12){
    text("Last Fed : " + lastFed%12 + "PM", 700, 30);
  }else if(lastFed == 0){
    text("Last Fed : 12AM", 700, 30);
  }else{
    text("Last Fed : " + lastFed + "AM", 700, 30);
  }
  
  drawSprites();
  //add styles here

}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    food : foodObj.getFoodStock(),
    feedTime  : hour()
  })
}

// function to add food in stock
function addFood(){
  foodS++;
  database.ref('/').update({
    food : foodS
  })
}



