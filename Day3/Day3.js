/**
 * OOPS
 * #1 Encapsulation
 * Keep data and methods together


class Bill{
    constructor(amount){
        this.amount=amount
    }

      calculateTax(){
        return this.amount*0.2
    }

    // In js, we can't have named function directly inside the class but can have Function Expression
}

const bill1= new Bill(200)

console.log("Tax: ",bill1.calculateTax());
console.log("Amount: ",bill1.amount);

class BankAccount{
    #balance=0

    deposit(amount){
        this.#balance +=amount;
    }

    getBalance(){
        return this.#balance
    }
}

const account= new BankAccount()
account.deposit(1000)
console.log(account.getBalance());

 * #2 Inheritance

class Emplyoee{
    constructor(name){
        this.name=name;
    }
}

class Cashier extends Emplyoee{
    generateBill(){
        console.log(this.name,"Generated Bill");
        
    }

}

const cashier= new Cashier("Kavin")

cashier.generateBill()

//When Cashier object created, js will look for is there any constructor in Cashier Class, if not it will add a constructor with super(name) statemnt, this super statement call the constructor of parent class and initialise the value

 *#3: Polymorphism
 * Same Method, Different Behaviour
 
 class Payment{
    pay(){
        console.log("Payment");
        
    }
 }

 class CardPayment{
    pay(){
        console.log("Paid by Card");
    }
 }

 class UpiPayment{
    pay(){
        console.log("Paid by UPI");
        
    }
 }

 const p1= new UpiPayment()
 const p2= new CardPayment()
 const p3= new Payment()

 p1.pay()
 p2.pay()
 p3.pay()

 *#4: Abstraction
 * Hide Complexity, shows only necessary things
 class BillingService{
    generateBill(amount){
        const tax = amount * 0.18
        return amount + tax
    }
 }

 const billing = new BillingService()

 const bill = billing.generateBill(2000)
 console.log(bill);

*/

const express = require("express");
const app = express();
const morgan = require("morgan");
app.listen(3000);

/* Express

app.get("/",(req,res)=>{
    
    // res.send("<h1>Hello</h1>")
    // res.status(200)
    res.sendFile("/home/paulkavin/learning-node/index.html")
    // Used to send file, status code , content type will be updated automatically
})

//For Redirecting
app.get("/home",(req,res)=>{
    res.redirect("/")
})
//app.use used to create a middleware, it will  not verify any url

app.use((req,res)=>{
    res.sendFile("/home/paulkavin/learning-node/error.html")
})

# Middle Ware

app.use(morgan("dev")) // For Logging Dev Details, 3rd Party Middle Ware
app.use((req,res,next)=>{
    console.log("Request Recevied, Middle Ware1");
    console.log(req.host);
    console.log(req.path);
    console.log(req.method);
    next();
    
})

//next() used to convey the browser to move forward, it is not necessary to middleware give response

app.get("/",(req,res)=>{
    
    // res.send("<h1>Hello</h1>")
    // res.status(200)
    res.sendFile("/home/paulkavin/learning-node/index.html")
    // Used to send file, status code , content type will be updated automatically
})

//Here below middle ware will not run for / request, since response is already sent !

app.use((req,res,next)=>{
    console.log("Request Recevied, Middle Ware 2");
    console.log(req.host);
    console.log(req.path);
    console.log(req.method);
    next();
    
})

#Event 
Someone emits (fires) an event
↓
Someone else listens for that event
↓
Listener executes code


const eventEmitter= require("events")
const emitter = new eventEmitter()

emitter.on("documentUploaded",(fileName)=>{
    console.log(`Document Uploaded Successfuly: ${fileName}`);
    
})

emitter.emit(
    "documentUploaded", "invoice.pdf"
)

*/

/**

**Route Params 
// Used in type: module and index.mjs for the below code
import express from "express";

const app = express();
const PORT = 3000;

const users = [
  {
    id: 1,
    user_name: "Kavin",
  },
  {
    id: 2,
    user_name: "Paul",
  },
  {
    id: 3,
    user_name: "Suresh",
  },
];

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);

});

app.get("/", (req, res) => {
  res.send({
    msg: "Hello",
  });
});

// app.get("/api/users",(req,res)=>{
//     res.send(users)
// })

//Getting Params
app.get("/api/users/:id",(req,res)=>{
    // console.log(req.params);
    //Changing string into number
    const id=parseInt(req.params.id)
    //Checking id is not a number
    if (isNaN(id)) {
        return res.status(400).send({mes:"Bad request, Invalid ID"})
    }
    console.log(id);

    const user= users.find((user)=>user.id==id)

    if(user){
        return res.send(user)
    }else{
        res.status(404).send("User not Found")
    }
})

//Query Params - used to relevant filter
app.get("/api/users",(req,res)=>{
    const {query:{filter,value}}=req
    console.log(filter,value);
    if (filter && value) {
        return  res.send(users.filter((user)=>user[filter].toLowerCase().includes(value)))
    //[filter]= user_name
    }
   
})

//Post request - from frontend to backend data
app.use(express.json()) // this middle ware used to make express to accept in JSON format
app.post("/api/users",(req,res)=>{
    console.log(req.body);
    const {body}=req
    const newUser={id: users[users.length-1].id+1, ...body} //spreading keeps the attributes, without it will be like json insdide another
    users.push(newUser);
    return res.status(201).send(newUser)
    
})

*/
