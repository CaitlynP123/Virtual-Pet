var database

var dog, hungryDog, happyDog;

var feed, addFood
var foodObj, foodStock
var fedTime, lastFed 

var bottle, bottleImg

function preload(){
  hungryDog = loadImage("Images/Dog.png");
  happyDog = loadImage("Images/happy dog.png");

  bottleImg = loadImage("Images/milkImage.png")
}

function setup() {
  database = firebase.database()
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock = database.ref('FoodStock');
  foodStock.on("value",readFoodStock,showError);

  fedTime = database.ref('lastFed');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
   
  dog = createSprite(800,200,150,150);
  dog.addImage(hungryDog);
  dog.scale = 0.15;
  
  feed = createButton("FEED THE DOG");
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  bottle = createSprite(730,215)
  bottle.addImage("empty bottle",bottleImg)
  bottle.visible = false
  bottle.scale = 0.125

  var name = createInput("Name")
  var giveName = createButton("Name Your Dog")

  name.position(900,170)
  giveName.position(935,190)

  giveName.mousePressed(()=>{
    name.hide();
    giveName.hide();

    var dogName = name.value();
    
    var greeting = createElement('h3',"Please Feed "+dogName)
    greeting.position(900, 160)
  });

}

function draw() {
  background(46,139,87);

  foodStock = database.ref('FoodStock')
  foodStock.on("value",readFoodStock,showError)

  foodObj.display()

  drawSprites();
}

function readFoodStock(data){
  foodStock = data.val()
}

function feedDog(){
  var hr = hour()
  foodObj.updateLastFed(hr)

  dog.addImage(happyDog)  

  bottle.visible = true
    
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    'FoodStock' : foodObj.getFoodStock(),
  })
  }


function addFoods(){
  foodStock = 20
  foodObj = new Food()

  bottle.visible = false

  dog.addImage(hungryDog)

  database.ref('/').update({
    'FoodStock' : foodStock
  })
}

function showError(){
  console.log("ERROR")
}