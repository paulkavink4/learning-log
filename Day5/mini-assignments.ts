//Exercise

class RestaurantOrder{
    constructor(public orderId:number, public foodName:string, public price:number){
        this.orderId=orderId;
        this.foodName=foodName;
        this.price=price
    }

    showOrder():void{
        console.log(`Order ID: ${this.orderId} Food: ${this.foodName} Price: ${this.price}`);
        
    }

    calculateGst():number{
        return this.price*0.2;
    }
}

const order= new RestaurantOrder(101,"Burger", 5)

order.showOrder()

console.log(order.calculateGst());

