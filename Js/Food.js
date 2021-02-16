class Food {
    constructor(){
        this.foodStock = 20
        this.image = loadImage('images/Milk.png');
    }

   updateFoodStock(foodStock){
        this.foodStock = foodStock;
   }

   getTimeFed(){
    database.ref('lastFed').on("value",function(data){
        lastFed = data.val();
    })    
    }

   deductFood(){
     if(this.foodStock > 0){
      this.foodStock = this.foodStock-1;
      this.foodStock.updateFoodStock(-1)
     }
    }

    getFoodStock(){
      return this.foodStock;
    }

    updateLastFed(time){
        database.ref('/').set({
            'lastFed' : time
        })
    }

    display(){
        background(46,139,87);

        fill(255,255,254);
        textSize(15);

        if(lastFed >= 12){
            text("Last Feed : "+ lastFed % 12 + " PM", 50,30);
        } else if(lastFed==0){
            text("Last Feed : 12 AM",50,30);
        } else{
            text("Last Feed : "+ lastFed + " AM", 50,30);
        }
     
        var x = 70
        var y = 100 
     
        imageMode(CENTER)
     
        if(this.foodStock !== 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i % 10 == 0){
                    x = 70
                    y = y+50
                }
          
            image(this.image,x,y,50,50)
            x = x+30
            }
        }
    }
}