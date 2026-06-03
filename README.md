# Day 1 - JavaScript Fundamentals

## JavaScript Runtime

JavaScript is a **single-threaded, synchronous language**.

- It has a single **Call Stack**.
- It can execute only one task at a time.
- The Call Stack is managed by the JavaScript Engine.

### Global Execution Context (GEC)

Whenever a JavaScript program starts:

1. A Global Execution Context (GEC) is created.
2. The GEC is pushed onto the Call Stack.
3. Functions are executed one by one.
4. Once execution is complete, they are removed (popped) from the Call Stack.

---

## Web APIs

**Note:** Web APIs are provided by the browser and are **not part of JavaScript itself**.

Common Web APIs:

- `setTimeout()`
- DOM APIs
- `fetch()`
- `console`

```javascript
setTimeout(() => {
  console.log("Hello");
}, 1000);
```

Since `window` is the global object in browsers, both are equivalent:

```javascript
window.setTimeout(...);
setTimeout(...);
```

---

## How setTimeout Works

```javascript
setTimeout(callback, 2000);
```

### Execution Flow

1. Callback function is registered.
2. Timer starts in the Web API environment.
3. After the timer expires, the callback is moved to the Callback Queue.
4. The Event Loop monitors the Call Stack.
5. When the Call Stack becomes empty, the callback is pushed to the Call Stack and executed.

```text
Call Stack
    ↓
Web APIs (Timer)
    ↓
Callback Queue
    ↓
Event Loop
    ↓
Call Stack
```

---

## Event Listener Working

```javascript
document
  .getElementById("btn")
  .addEventListener("click", function cb() {
    console.log("Clicked");
  });
```

### Execution Flow

1. Callback function is registered.
2. Browser waits for the event.
3. When the event occurs, the callback is placed in the Callback Queue.
4. Event Loop moves it to the Call Stack when the stack becomes empty.

---

## Event Loop

The Event Loop continuously checks:

- Is the Call Stack empty?
- If yes, move pending callbacks from queues to the Call Stack.

### Function

```text
While (Call Stack is Empty)
        ↓
Take Task From Queue
        ↓
Push To Call Stack
        ↓
Execute
```

---

## Callback Queue (Task Queue)

Stores callbacks from:

- `setTimeout`
- `setInterval`
- DOM Events
- Other browser events

Also known as the **Task Queue**.

---

## Microtask Queue

A special queue with **higher priority** than the Callback Queue.

### Sources

- Promise callbacks (`.then()`, `.catch()`, `.finally()`)
- Mutation Observer callbacks

### Important Rule

All Microtasks must complete before tasks from the Callback Queue are executed.

```text
Call Stack Empty
        ↓
Microtask Queue
        ↓
Callback Queue
```

---

## Starvation of Callback Queue

Since the Microtask Queue has higher priority, continuously creating new microtasks can prevent Callback Queue tasks from executing promptly.

This situation is known as **Callback Queue Starvation**.

---

## Callback Functions

A callback function is a function passed as an argument to another function.

```javascript
function greet(name, callback) {
  callback(name);
}

greet("John", (name) => {
  console.log(name);
});
```

### Benefits

- Enables asynchronous programming.
- Allows flexible and reusable code.

---

## First-Class Functions

In JavaScript, functions are **first-class citizens**, meaning they can:

- Be assigned to variables.
- Be passed as arguments.
- Be returned from other functions.

```javascript
const sayHello = () => {
  console.log("Hello");
};
```

Because functions are first-class citizens, callback functions are possible.

---

## Why Global Variables Should Be Avoided

Global variables can be accessed and modified from anywhere in the application.

### Problems

- Harder to debug
- Harder to maintain
- Increased coupling
- Risk of accidental modification
- Data conflicts in backend applications

### Preferred Alternatives

- Local variables
- Function parameters
- Module-scoped variables
- Proper state management

---

## Problems with Callback Functions

### 1. Callback Hell

Occurs when callbacks are nested inside other callbacks.

```javascript
api1(() => {
  api2(() => {
    api3(() => {
      api4(() => {});
    });
  });
});
```

### Issues

- Difficult to read
- Difficult to maintain
- Difficult to debug

Also known as the **Pyramid of Doom**.

---

### 2. Inversion of Control (IoC)

When using callbacks, we hand over control of our function to another function or library.

```javascript
someLibrary(myCallback);
```

Potential issues:

- Callback may never be called.
- Callback may be called multiple times.
- Callback may receive unexpected data.

Promises help solve this problem by providing a more predictable execution model.

---

# Promises

Promises are used to handle asynchronous operations.

A Promise represents the eventual completion or failure of an asynchronous task.

```javascript
const promise = fetch("/api/users");
```

### Promise States

1. Pending
2. Fulfilled
3. Rejected

---

## Why Promises Were Introduced

Promises help address:

- Callback Hell
- Inversion of Control

Benefits:

- Better readability
- Easier error handling
- Predictable execution flow

---

## Promise Chaining

```javascript
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
```

**Important:** Always return a value or Promise when chaining.

---

## Promise Immutability

Once a Promise is settled:

- Fulfilled → Cannot change
- Rejected → Cannot change

Its state becomes immutable.

---

## Arrow Functions and Return

### Without Curly Braces

Implicit return:

```javascript
const add = (a, b) => a + b;
```

### With Curly Braces

Explicit return required:

```javascript
const add = (a, b) => {
  return a + b;
};
```

---

## Reference

- https://youtu.be/8zKuNo4ay8E
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Day 2

## Worker Threads

Worker Threads enable multithreading in Node.js, allowing CPU-intensive tasks to run separately from the main thread.

### Why Use Worker Threads?
- Prevent blocking the Event Loop.
- Suitable for CPU-bound operations such as:
  - Data processing
  - Image manipulation
  - Complex calculations
  - Encryption/Decryption

### Note
LibUV already provides background threads for:
- Database operations
- Network requests
- File read/write (I/O) operations

Worker Threads are primarily intended for CPU-heavy tasks.

### Communication Between Threads

Worker Threads communicate with the main thread using a messaging system.

#### Sending Data from Worker Thread

```javascript
const { parentPort } = require("worker_threads");

parentPort.postMessage("Task Completed");
```

#### Receiving Data in Main Thread

```javascript
worker.on("message", (data) => {
  console.log(data);
});
```

#### Error Handling

```javascript
worker.on("error", (err) => {
  console.error(err);
});
```

---

## Memory Leaks

### Normal Memory Lifecycle

```text
Program uses memory
        ↓
Work completes
        ↓
Garbage Collector frees memory
```

### What is a Memory Leak?

A memory leak occurs when an application keeps references to objects that are no longer needed, preventing the Garbage Collector from reclaiming memory.

As memory usage continuously grows, it can lead to:
- Increased memory consumption
- Poor performance
- Application crashes

---

## Debugging

Debugging is the process of identifying, isolating, and fixing software issues.

### Common Debugging Techniques

- Logging (`console.log`)
- Breakpoints
- Variable inspection
- Memory monitoring
- Execution flow tracing

---

## Async/Await

`async` and `await` provide a cleaner way to work with Promises.

### Async Function

An `async` function always returns a Promise.

```javascript
async function example() {
  return "Hello";
}
```

Equivalent to:

```javascript
Promise.resolve("Hello");
```

Even non-Promise values are automatically wrapped inside a Promise.

### Await

- Used before a Promise.
- Can only be used inside an `async` function.
- Pauses execution until the Promise resolves.

```javascript
const data = await fetchData();
```

---

## Fetch API

The `fetch()` method is used to make HTTP requests.

### Flow

```text
fetch()
   ↓
Returns Promise
   ↓
Resolves to Response Object
   ↓
response.json()
   ↓
Returns Promise
   ↓
Resolves to Actual Data
```

### Example

```javascript
const response = await fetch(url);
const data = await response.json();
```

---

## Error Handling

Error handling is the process of detecting and managing runtime issues to ensure the application continues operating safely.

### Common Approaches in Node.js

- `try...catch`
- `.catch()` for Promises
- Async/Await error handling
- Express Error-Handling Middleware

### Example

```javascript
try {
  const data = await fetchData();
} catch (error) {
  console.error(error);
}
```

Proper error handling:
- Prevents application crashes
- Improves reliability
- Provides meaningful feedback to users

---

## Streams

A Stream in Node.js allows data to be processed chunk by chunk instead of loading the entire data into memory at once.

### Benefits

- Reduced memory usage
- Better performance
- Efficient handling of large files

### Common Use Cases

- File processing
- File uploads/downloads
- Video streaming
- Data transformation
- Network communication

### Example

```javascript
const fs = require("fs");

const readStream = fs.createReadStream("file.txt");

readStream.on("data", (chunk) => {
  console.log(chunk);
});
```

### Types of Streams

1. Readable Stream
2. Writable Stream
3. Duplex Stream
4. Transform Stream

# Day 3 - OOPs and Express.js Fundamentals

## Overview

This session focused on understanding Object-Oriented Programming (OOP) concepts in JavaScript and core Express.js fundamentals, including routing, middleware, events, route parameters, query parameters, and handling HTTP requests.

---

## Object-Oriented Programming (OOP)

### 1. Encapsulation

Encapsulation is the practice of keeping data and the methods that operate on that data together within a class.

**Key Learnings:**

* Creating classes using the `class` keyword.
* Using constructors to initialize object properties.
* Defining methods inside classes.
* Using private fields (`#`) to restrict direct access to sensitive data.

### 2. Inheritance

Inheritance allows a child class to reuse properties and methods from a parent class.

**Key Learnings:**

* Extending classes using the `extends` keyword.
* Reusing parent class functionality.
* Understanding how `super()` invokes the parent constructor.

### 3. Polymorphism

Polymorphism allows the same method name to have different behaviors depending on the object that invokes it.

**Key Learnings:**

* Method overriding.
* Implementing different behaviors using the same method signature.

### 4. Abstraction

Abstraction hides implementation details and exposes only the necessary functionality.

**Key Learnings:**

* Simplifying complex logic through service classes.
* Exposing only required methods to consumers.

---

## Express.js Fundamentals

### Creating an Express Server

**Key Learnings:**

* Initializing an Express application.
* Starting a server using `app.listen()`.
* Handling HTTP requests and responses.

### Sending Responses

Learned different ways of sending responses:

* `res.send()`
* `res.status()`
* `res.sendFile()`
* `res.redirect()`

---

## Middleware

Middleware functions execute during the request-response cycle.

### Key Learnings

* Creating custom middleware using `app.use()`.
* Using third-party middleware such as Morgan for request logging.
* Understanding the purpose of the `next()` function.
* Middleware execution order and request flow.

---

## Event-Driven Architecture

Node.js follows an event-driven architecture using the Event Emitter pattern.

### Key Learnings

* Creating custom events.
* Registering event listeners using `.on()`.
* Triggering events using `.emit()`.

### Event Flow

```text
Event Emitted
      ↓
Listener Receives Event
      ↓
Callback Function Executes
```

---

## Route Parameters

Route parameters allow dynamic values to be passed through URLs.

### Example

```text
/api/users/:id
```

### Key Learnings

* Accessing route parameters using `req.params`.
* Converting string values to numbers.
* Validating route parameters.
* Returning appropriate HTTP status codes.

---

## Query Parameters

Query parameters are commonly used for filtering and searching data.

### Example

```text
/api/users?filter=user_name&value=kavin
```

### Key Learnings

* Accessing query parameters using `req.query`.
* Filtering data dynamically based on user input.

---

## Handling POST Requests

POST requests are used to send data from the client to the server.

### Key Learnings

* Parsing JSON requests using `express.json()`.
* Accessing request payloads through `req.body`.
* Creating new resources dynamically.
* Returning `201 Created` responses.

---

## HTTP Status Codes Used

| Status Code | Meaning            |
| ----------- | ------------------ |
| 200         | Success            |
| 201         | Resource Created   |
| 400         | Bad Request        |
| 404         | Resource Not Found |

---

## Topics Covered

* OOP Concepts in JavaScript

  * Encapsulation
  * Inheritance
  * Polymorphism
  * Abstraction
* Express.js Basics
* Middleware
* Morgan Logging Middleware
* Event Emitters
* Route Parameters
* Query Parameters
* GET and POST Requests
* Request Validation
* HTTP Status Codes
* JSON Request Handling

