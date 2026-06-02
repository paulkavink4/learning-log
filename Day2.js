const fs= require("fs")
// //Example 1: Global Array Leak
// const orders=[]
// setInterval(()=>{
//     orders.push({
//         id:Date.now()
//     })
//     console.log(orders);

// },1000)

// // Nothing removes old data.

// //Example 2
// setInterval(()=>{
//     console.log("Running...");

// },1000)
// //Thousands of active timers. Memory and CPU increase.

// //Why Leaks Happen

// let order={
//     id:1
// }

// let globalOrder=[]

// globalOrder.push(order)

// // GC cannot remove it.

// // Someone still references it.

// // How to Detect Memory Leaks
// // Method 1: Monitor Memory Usage

// setInterval(()=>{
//     console.log(process.memoryUsage());
// },5000)

/**
 * Async/Await
 */
// async function getData(){
//     return "Vannakam!"
// }

// const data = getData()
// console.log(data);

// data.then((res)=>console.log(res))

// const p=  new Promise((resolve,reject)=>{
//     resolve("Promise resolved Value !")
// })

// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Promise resolved Value !");
//   }, 5000);
// });
// //Js engine will now wait until resolved
// function getData() {
//   p.then((res) => console.log(res));
//   console.log("Which Prints First ?");
// }

// getData();

// // JS engine will wait here
// async function handlePromise() {
//   const val = await p;
//   console.log(val);
//   console.log("Which Prints First ?");
// }

// handlePromise();

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Promise resolved Value !");
//   }, 5000);
// });

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Promise resolved Value !");
//   }, 10000);
// });

// async function handlePromise() {
//   console.log("Hello World!");
//   const val1 = await p1;
//   console.log("Hello Javascript 1");
//   console.log(val1);

//   const val2 = await p2;
//   console.log("Hello Javascript 2");
//   console.log(val2);
//   console.log("Which Prints First ?");
// }

// handlePromise();

// const api_url="https://api.github.com/users/paulkavink4"

// async function handlePromise(){
//   try {
//      const res = await fetch(api_url)
//      const data= await res.json()
//      console.log(data);
//   } catch (error) {
//     console.log(error);

//   }

// }
// handlePromise()

/*
 * Error Handling


function processPayment(amount) {
  if (amount <= 0) {
    throw new Error("Invalid Payment Amount");
  }
  console.log("Payment Successful");
}

try {
  processPayment(-2);
} catch (error) {
  console.log(error.message);
}

async function getData() {
  try {
    let res = await fetch("www.google.com");
    let data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

getData();

 */

/*
  Streams

  Read Streams


const readStream = fs.createReadStream("data.txt")
readStream.on("data",(chunk)=>{
  console.log(chunk.toString());
  
})

readStream.on("end",()=>{
  console.log("Reading Finished");
  
})

readStream.on("error",(err)=>{
  console.log(err.message);
  
})
// Write Stream
const writeStream = fs.createWriteStream("orders.txt")

writeStream.write("Burger\n")
writeStream.write("Pizza\n")
writeStream.end()
*/

// Read Stream + Write Stream
const readStream=fs.createReadStream("input.txt")
const writeStream=fs.createWriteStream("output.txt")

// readStream.on("data",(chunk)=>{
//   writeStream.write(chunk)
// })

// Pipe
readStream.pipe(writeStream)

/**
 * readFileSync -  used to reas files,which can be send as response
 */
