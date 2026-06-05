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

//Assignment
enum FoodStatus{
    Ordered,
    Preparing,
    Served
}

type OrderId= string|number

interface Order{
    id:OrderId
    item:string
    note?:string
    status:FoodStatus
}
//A order without note
let order1:Order={
    id:301,
    item:"Burger",
    status:FoodStatus.Ordered
}

console.log(order1);

//Order with note
let order2:Order={
    id:"D002",
    item:"Sandwich",
    note:"Add extra mayonaise",
    status:FoodStatus.Preparing
}

console.log(order2);

