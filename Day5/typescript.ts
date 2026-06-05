/*
let userName:string="kavin"
let age:number=24
let isIntern:boolean=true

console.log(userName);
console.log(age);
console.log(isIntern);



let skills:String[]=["Node","React"]

console.log(skills);
skills.push("MangoDB")
console.log(skills);


function add(a:number,b:number):number{
    return a+b
}

console.log(add(10,20));

const  documents:{
    id:string,
    title:string,
    pages:number
}={
    id:"D001",
    title:"Node Js Guide",
    pages:200
}
console.log(documents.title);


interface MyDocument{
    id:string
    docTitle:string
    pages:number
}

const doc:MyDocument={
    id:"D002",
    docTitle:"Javascript Fundamentals",
    pages:150
}

console.log(doc.pages);

interface Employee{
    name:String
    salary:number
}

const emp:Employee={
    name:"Paul Kavin V",
    salary:10000
}

console.log(emp.name);
console.log(emp.salary);

//Class
class Bill{
    amount:number;

    constructor(amount:number){
        this.amount=amount
    }
//:number specifies return type should  also be in number type
    calculateTax():number{
        return this.amount*0.2;
    }
}

const bill=new Bill(1000)
console.log("Tax: ",bill.calculateTax());



//Shorter Constructor Syntax

class Bill {
  constructor(public amount: number) {
    this.amount = amount;
  }
  //:number - specifies return type should  also be in number type
  calculateTax(): number {
    return this.amount * 0.2;
  }
}

const bill = new Bill(1000);
console.log("Tax: ", bill.calculateTax());

//Access Modifiers
//1.Public
/*
class Employee{
    public name:string;

    constructor(name:string){
        this.name=name
    }
}

const emp=new Employee("Kavin")
console.log(emp.name);


//2. Private
class Employee{
    private salary:number;
    public name:string;

    constructor(salary:number, name:string){
        this.salary=salary
        this.name=name
    }
}

const emp=new Employee(10000,"Kavin")
// console.log(emp.salary);//Error: Property 'name' is private and only accessible within class 'Employee'.
console.log(emp.name);


//3. Protected - Accessible only inside child classes.

class Employee {
  constructor(protected name: string) {
    this.name = name;
  }
}

class Cashier extends Employee {
  //generateBill - in this function we can add return type as well as "void"
  generateBill() {
    console.log(`${this.name} Bill Generated!`);
  }
}

const cashier = new Cashier("Paul");
cashier.generateBill();
*/

/*
//Method Return Types

class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}

/*Meaning
 * Inputs -> numbers
 * Output -> number
 */

/*
function generateBill():void{
    console.log("Bill Generated");  
}

generateBill()



//Getters & Setters

class Employee{
    private salary:number

    constructor(salary:number){
        this.salary=salary
    }

    getSalary():number{
        return this.salary
    }

    setSalary(newSalary:number):void{
        this.salary=newSalary
    }
}

const emp= new Employee(10000)

console.log(emp.getSalary());
emp.setSalary(25000)
console.log(emp.getSalary());



//Abstract Classes
//An abstract class is a class that cannot be instantiated directly.
//Why Abstract Class - Because we can force child classes to implement methods.
abstract  class Employee{
    constructor(public name:string){}

    abstract calculateSalary():number
    abstract empName():void
}
// const emp= new Employee("Kavin")//Cannot create an instance of an abstract class.
class Cashier extends Employee{
    calculateSalary(): number {
        return 25000;
    }
    empName(): void {
        console.log(`Cashier Name: ${this.name}`);
        
    }
    
}

const cashier=new Cashier("Kavin")
console.log(cashier.calculateSalary());
cashier.empName()

//Interfaces with classes

interface Printable{
    print():void
}

class Invoice implements Printable{
    print(): void {
        console.log("Printing Invoice");
        
    }
}

interface MyDocument{
    id:string
    title:string
}

class PolicyDocument implements MyDocument{
    id: string;
    title: string;

    constructor(id:string,title:string){
        this.id=id
        this.title=title
    }
}

const doc= new PolicyDocument("101B","Order Policy")
console.log(`ID: ${doc.id} Title: ${doc.title}`);

*/

//Generics
//Same Function, Different Types

/*
function getData<T>(data:T):T{
    return data
}

console.log(getData("Kavin"));
console.log(getData(true));

//Generic Array

function firstItem<T>(items:T[]):T{
    return items[0]
}

console.log(firstItem([1,2,3]));
console.log(firstItem(["Node","Express","Typescript"]));

//Generic Interface

interface ApiResponse<T>{
    success:boolean
    data:T
}
*/
/*
const response:ApiResponse<String>={
    success:true,
    data:"Welcome"
}



//adding in another interface as value to an object with generic

interface MyDocument{
    title:String
}

const response:ApiResponse<MyDocument>={
    success:false,
    data:{
        title:"Node Js Guide"
    }
}
console.log(response.data);
*/

/*
//Mini Assignment

abstract class Employee{
    abstract calculateSalary():number
}

interface Login{
    login():void
}

interface Logout{
    logout():void
}

interface ApiResponse<T>{
    success:boolean
    data:T
}

class Cashier extends Employee implements Login,Logout{
    calculateSalary(): number {
        return 25000
    }

    login(): void {
        console.log("Login Successful");
    }

    logout(): void {
        console.log("Logout Successful");
        
    }

}

const response:ApiResponse<Cashier>={
    success:true,
    data:new Cashier()
}

response.data.login();
response.data.logout();
console.log(response.data.calculateSalary());
*/

/*
//Enums - without no control

enum OrderStatus{
    Pending,
    Preparing,
    Delivered
}

let oStatus:OrderStatus=OrderStatus.Preparing
//Enums are number internally
console.log(oStatus);


enum DocumentStatus{
    Draft="DRAFT",
    Review="REVIEW",
    Published="PUBLISHED"
}

let documentStatus:DocumentStatus=DocumentStatus.Draft

console.log(documentStatus);

//Union Types 
//One variable can have multiple possible types.

let id:string|number

id="DB01"
console.log(id);
id=102
console.log(id);

//Union with Literal Values

//Make a varibale accept certain given things alone
type Status="pending"|"approved"|"rejected"

let uploadStatus:Status

uploadStatus="rejected"
console.log(uploadStatus);

//Alias for Primitive
type DocumentId=string

let docId:DocumentId="D001"
console.log(docId);

//Alias for Objects

type MyDocument={
    id:string,
    title:string,
    pages:number
}

let doc:MyDocument={
    id:"D002",
    title:"Typescript Foundation",
    pages:400
}

//Optional Properties , "?" indicates that is optional

interface CreateDocumentRequest{
    title:String,
    author:string,
    description?:string
}

let doc:CreateDocumentRequest={
    title:"Express Basics",
    author:"Charlie"
}
console.log(doc);
*/
