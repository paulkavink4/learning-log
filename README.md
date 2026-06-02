Day 1
JS is a synchronised single threaded language.
It has one call stack and can do only one thing at a time.
Present inside JS engine
Any JS programs runs, Global Execution Context will get created and get pushed to Call Stack.
After execution of each , pops out from call stack.
By default call stack doesn’t have timer,

Web API 
Note: Not a part of JS, its a Part of Browser

	
—----------------------------------------------------Window—--------------------------------------------------------
setTimeout()
DOM APIs
fetch()
console



Since ‘Window’ is a global object, don’t need use along like window.setTimeout() instead we can use setTimeout alone.

setTimeout Working:
Eg. setTimeout(call back function, timer) 
First callback function will be registers and timer is Started
Once the timer expired, it will pushed into CallBack Queue
Event Loop will keep look is there anything in Callback Queue and pushes it to Call Stack
Creates an Global Execution Context  of Callback and runs in Call Stack.   

Event Listener Working:
Eg. document.getElementById(“id”).addEventListener(“click”, function cb(){
	console.log(“Callback”);
});

First callback function will be registered and wait for the event 
If event occurred it will get into Callback Queue




Event Loop
Function:  Continuously look when call stack is empty, it will put what inside callback queue into call stack.

Microtask Queue: 
Similar to Callback Queue
More priority given

Note: All the tasks in Microtask Queue completed then only it goes to call back queue.

All the callback functions which comes through Promises & Mutation observer (Fetch) waits in microtask queue and get executed.

A.k.a - Callback queue -> Task Queue

Starvation of CallBack Queue: Since microtask queue has more priority, lets say those tasks in that are possible to create more microtask queue call backs, there may be the Call back queue not getting chance to executed.

Reference : https://youtu.be/8zKuNo4ay8E

 
CallBack Function:
Function that we can pass to another function as an argument
It is first  class citizen of Javascript
With this we can do asynchronous operations.

Note:
In JavaScript, functions themselves are known as first-class citizens.
This designation means that functions are treated like any other data type (such as strings or numbers), allowing them to be:
Assigned to variables.
Passed as arguments to other functions (often referred to as callbacks). 
Returned as values from other functions.
Because functions are first-class citizens, callback functions—which are functions passed into another function to be executed later—are a fundamental part of JavaScript's functional programming capabilities. 




Why Global Variables should be avoided ?
Global variables should generally be avoided because they can be modified from anywhere in the application, making code harder to understand, debug, test, and maintain. In backend applications, global variables can also cause data conflicts between multiple users or requests. Using local variables, function parameters, and proper state management makes applications more predictable and scalable.
Negative Side of Call Back Functions: Callback Hell, Inversion of Control

CallBack Hell
	One call back inside another callback function. The code will goes horizontally instead of vertically.
	Also known as Pyramid  of Doom.
	Eg. call back inside another call back depends on api

Unreadable
Unmaintable

Inversion of Control
In callbacks, Inversion of Control means we pass our function (callback) to another function or library and lose control over when, how, or whether our callback is executed. This can lead to issues such as callbacks being called multiple times, never being called, or being called with unexpected data. Promises and async/await help address this problem by providing a more predictable execution model.


Promises
Promises are used to handle asynchronous operation in JS.
Promise is empty object with some data and value {data:}

Promise is an object which represents the eventful completion of asynchronous operation.

Note: Due to IOC, promise were used it will get call the execute the  function 100% and once whenever we got the data..(Earlier used callback inside another callback)

To use this -> fetch () , an api & function given by browser
//4-5 sec aynsc operation to complete
States of Promises:
Pending
Fulfilled
Rejected
Promise is Immutable
Note: When Promise chaining is issued we have to return in each promise

Arrow Function WITHOUT { }
↓
Automatic return

Arrow Function WITH { }
↓
Must write return manually

