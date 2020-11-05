
class Food {
    constructor(foodStock, lastFed, bottleImage){
        foodStock = null;
        lastFed;
        bottleImage = loadImage("../images/Milk.png")
    }
    
    getFoodStock(){
        database.ref('/food').on("value", (data)=>{
            this.foodStock = data.val();
        })
    }

    updateFoodStock(foodValue){
        database.ref('/').update({
            food : foodValue
        })
    }

    deductFood(){
        this.foodStock = this.foodStock - 1;
    }

    display(){
        var x = 80, y = 100;

        ImageBitmapRenderingContext(CENTER);
        Image(this.image,720,220,70,70);

        if(this.foodStock != 0){
            for(var i = 0; i<this.foodStock; i++){
                if(i%20 == 0){
                    x = 80;
                    y = y + 50;
                }
                image(this.bottleImage,x,y,50,50);
            }
        }
    }
}