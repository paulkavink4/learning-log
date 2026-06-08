//Strong Typing - to show error other than the type assigned
/*
var test:string
test=1 
test= function(a,b){
    return a+b
}


var myString:string="test"
var myNumber:number=1
var myBoolean:boolean=true;

myString=myNumber


//Inferred Typing
// It detect the datatype automatically and restricts other
var myString = "This is String"
var myNumber=10
myNumber="hello"



//Duck Typing
//bject Structure order can be changed, no issues
//what given first ,  should be present in subsequent structure
var complexType ={name:"myName",id:1}
complexType={id:1}
complexType={name:"anotherName"}
complexType={id:2, name:"anotherName"}//no error

console.log(complexType);


//Arrays
var arrOfNo:number[]=[29,30,31]
arrOfNo=[32,33,34]
arrOfNo=["one","two"]
console.log(arrOfNo);

//Any
//with that structure can be changed, shouldn't use unnecessarliry
var item1:any={id:1, name:"item 1"}
item1={id:2}

//Enum

enum MyDirection {
    Up,
    Down,
    Left,
    Right
}

function myMove(direction:any) {
    console.log(`Moving: ${MyDirection[direction].toLowerCase()}`)
}

myMove(MyDirection.Left)

//Functions
function addNumber(a:number,b:number){
    return a+b
}

console.log(addNumber(3,5));

//Optional Parameters - ?

var concatStrings= function(a:string,b:string,c?:string){
    return a+b+c;
}

console.log(concatStrings("a","b","c"));
console.log(concatStrings("d","e"));


//Default Parameters
// notation ="someValue"
var concatStrings= function(a:string,b:string,c:string="cat"){
    return a+b+c;
}

console.log(concatStrings("a","b","c"));
console.log(concatStrings("a","b"));


//Interfaces

function greetUser(user:{firstName:string,lastName:string}){
    return `Hello ${user.firstName} ${user.lastName}`
}

function logUserDeatils(user:{firstName:string, lastName:string, age:number}){
    console.log(`User: ${user.firstName} ${user.lastName},Age: ${user.age}`);
    
}
let user1={firstName:"John",lastName: "Doe",age:25}
console.log(greetUser(user1));

logUserDeatils(user1)
// Here we are giving the structure again and again


interface User{
    firstName:string 
    lastName:string
    age:number
    midName?:string
}

function greetUser(user:User){
    return `Hello ${user.firstName} ${user.midName} ${user.lastName}`
}

function logUserDeatils(user:User){
    console.log(`User: ${user.firstName} ${user.lastName},Age: ${user.age}`);
    
}
let user1={firstName:"John",midName:"Celvin",lastName: "Doe",age:25 }
console.log(greetUser(user1));

logUserDeatils(user1)


//Class

//Without Class
let user1={
    firstName:"John",
    lastName:"Doe",
    age:25
}

let user2={
    firstName:"Jane",
    lastName:"Smith",
    age:25
}

function greetUser(user:{firstName:string,lastName:string}){
    return `Hello, ${user.firstName} ${user.lastName}`
}

function getUserAge(user:{age:number}){
    return user.age
}

console.log(greetUser(user1));
console.log(getUserAge(user1));

//With Class
//Created a function inside a classs, which requires same data types
class User{
    firstName:string
    lastName:string
    age:number

    constructor(firstName:string,lastName:string,age:number){
        this.firstName= firstName
        this.lastName = lastName
        this.age = age
    }
    greet(){
        return `Hello, ${this.firstName} ${this.lastName}`
    }

    getAge(){
        return this.age
    }
}

//Creating Instances

let user= new User("Jhon", "Doe",25)
let user2= new User("Jane","Smith",23)

console.log(user.greet());
console.log(user.getAge());
console.log(user2.greet());
console.log(user2.getAge());


//Inheritance

//without inheritance

class User{
    firstName:String
    lastName:String
    age:number

    
    constructor(firstName:String, lastName:string, age:number){
        this.firstName=firstName
        this.lastName=lastName
        this.age=age
    }

    greet(){
        return `Hello, ${this.firstName} ${this.lastName}`
    }
    getAge(){
        return this.age
    }


}

class AdminUser{
    firstName:String
    lastName:String
    age:number
    role:string

    constructor(firstName:String, lastName:string, age:number, role:string){
        this.firstName=firstName
        this.lastName=lastName
        this.age=age
        this.role=role
    }

    greet(){
        return `Hello, ${this.firstName} ${this.lastName} ${this.role}`
    }
    getAge(){
        return this.age
    }

    manageUser(){
        return `Managing Users with role: ${this.role}`
    }
}

let user1= new User("John","Doe",25)
let admin1=new AdminUser("Alice","Smithe",30,"Adminstrator")

console.log(user1.greet());
console.log(user1.getAge());

console.log(admin1.greet());
console.log(admin1.getAge());
console.log(admin1.manageUser());




//With  - we can avoid unnecessary code

class User{
    firstName:String
    lastName:String
    age:number

    
    constructor(firstName:String, lastName:string, age:number){
        this.firstName=firstName
        this.lastName=lastName
        this.age=age
    }

    greet(){
        return `Hello, ${this.firstName} ${this.lastName}`
    }
    getAge(){
        return this.age
    }
}

class AdminUser extends User{
    role:string

     constructor(firstName:String, lastName:string, age:number, role:string){
        super(firstName,lastName,age)
        this.role=role
    }
    greet(): string {
        return `Hello, ${this.firstName} ${this.lastName}`
    }
    getAge(): number {
         return this.age
    }
    manageUser(){
        return `Managing Users with role: ${this.role}`
    }
}

let admin1= new AdminUser("John","Doe",25,"Manager")
console.log(admin1.greet());
console.log(admin1.getAge());
console.log(admin1.manageUser());



//Closures
//Without Closure
let counterValue=0

function incrementCounter(){
    counterValue++
}

function getCounterValue() {
    return counterValue
}
incrementCounter()
console.log(getCounterValue());

incrementCounter()
console.log(getCounterValue());

// WIth Closure - avoiding global pollution
function createCounter(){
    let counterValue=0;

    return{
        increment: function(){
            counterValue++
        },
        getValue:function(){
            return counterValue
        }
    }
}
const counter1= createCounter()
const counter2= createCounter()

counter1.increment()
counter2.increment()
counter2.increment()

console.log(counter1.getValue());
console.log(counter2.getValue());


//Access Modifiers - public, private, protected

//without class modifiers

class User{
    name:string
    age:number

    constructor(name:string, age:number){
        this.name=name
        this.age=age
    }
}

const user= new User("Alice", 30)
console.log(user.name);
user.name="BoB" // can modified
console.log(user.name);


//Private - can accessed with in the class
class User{
    private name:string
    private age:number

    constructor(name:string, age:number){
        this.name=name
        this.age=age
    }

    public getName(){
        return this.name;
    }
    //By default modifier is public
    setName(name:string){
        this.name=name
    }
    getAge(){
        return this.age
    }
    setAge(age:number){
        if (age>0 && age<100) {
            this.age=age
        }
        
    }
}

const user= new User("Kavin",25)

// user.name="Suresh"

// console.log(user.name);//error

console.log(user.getName());
user.setAge(-10)
console.log(user.getAge());

//Static Functions - used for some utility function

class User{
    name:string
    age:number

    constructor(name:string, age:number){
        this.name=name
        this.age=age
    }
    //can be accessed without instatiation, but "this" will not work here
    static isAdult(age:number){
        return age>=18
    }
} 

const user= new User("Alice",30)
console.log(User.isAdult(30));

End ->


//Static Properties
class User{
    name:string


    constructor(name:string){
        this.name=name
    }
   getName(){
    return this.name
   }
} 

let totalUsers=0

function createUser(name:string){
    //Here's tight coupling there, two related things related together - if error occured at last line as well it will increment the count
    totalUsers++
    return new User(name)
}

let user1=createUser("Alice")
let user2=createUser("Bob")

console.log(totalUsers);
console.log(user1.getName())
console.log(user2.getName());
*/

//Fix
class User{
    name:string
    static totalUsers:number=0

    constructor(name:string){
        this.name=name
        User.totalUsers++
    }
   getName(){
    return this.name
   }

   static getTotalUser(){
    return User.totalUsers
   }
} 

console.log("Users at Start: ", User.getTotalUser());

const user1= new User("Alice")
const user2=new User("Bob")


console.log(user1.getName());
console.log(user2.getName());


console.log("Users at End: ",User.getTotalUser());

















 







