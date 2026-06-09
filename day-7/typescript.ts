/* <- Start
//Generics
//Used when classes or soemething which used often
// Below example has code duplication , methods are common but type different
class NumberStack{
    private items:number[]=[]

    push(item:number){
        this.items.push(item)
    }
    pop(){
        return this.items.pop()
    }
}

class StringStack{
    private items:string[]=[]

     push(item:string){
        this.items.push(item)
    }
    pop(){
        return this.items.pop()
    }

}

const numStack= new NumberStack()
numStack.push(1)
numStack.push(2)
console.log(numStack.pop());


const stringStack=new StringStack()

stringStack.push("Hello")
stringStack.push("World !")

console.log(stringStack.pop());


//By using Generic - denoted by <T>

class Stack<T>
{
    private items:T[]=[]

    push(item:T){
        this.items.push(item)
    }
    pop(){
        return this.items.pop()
    }
}

const numStack= new Stack<number>
numStack.push(10)
numStack.push(20)

console.log(numStack.pop());

const stringStack= new Stack<string>

stringStack.push("John")
stringStack.push("Doe")
console.log(stringStack.pop());

//Typecasting
// Sometimes, type cannot be determined automatically in typescript and initialized with undefined and may cause issue later

interface User {
  name: string;
  age: number;
}

const jsonData = `{"name":"Jhon","age":30}`;
End -> */
/*
 * Difference b/w JSON Object vs Object
 * Syntax: JSON requires double quotes around all keys and string values, whereas JavaScript objects allow unquoted keys and single or double quotes for strings. 
 * Functions: JSON cannot contain methods or functions; if a JavaScript object is stringified, functions are ignored. 
 * Comments: JSON does not allow comments, while JavaScript objects can include them. 
 *Usage: JavaScript objects handle data manipulation within code, while JSON handles data transmission between systems. 
 * Convert JSON String to JS Object --> JSON.pase() should be used
 */

//  const user = JSON.parse(jsonData) as User //  Since ts don't know what type it is , it will make it any data type
//  console.log(`Name: ${user.name} Age: ${user.age} Email: ${user.email}`); // Since email is not present in User Interface it showing error, it is typecasting
 /*
// Type Assertion

 const element=document.getElementById("myElement")
 element.value//type determined as general html element automatically , thats why value not in error 

//Fix

const element=document.getElementById("myElement") as HTMLInputElement
 element.value//type determined as general html element automatically , thats why value not in error 


//Intersection Types

interface Emplyoee{
    name:string
    id:number
}

interface Admin{
    isAdmin:boolean
    accessLevel:number
}

type AdminEmployee=  Emplyoee & Admin

const adminEmp:AdminEmployee={
    name:"Alis",
    id:3034,
    isAdmin:true,
    accessLevel:2
}

console.log(adminEmp);
console.log(adminEmp.isAdmin);
console.log(adminEmp.accessLevel);
*/
