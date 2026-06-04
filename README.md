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

#Day4 - Custom Event Emitter - Restaurant Order Management System

## Overview

This project demonstrates the use of Node.js Event Emitters by simulating a simple restaurant order management system.

The application allows users to:

* Login to the system
* Place a food order
* Generate a bill with tax
* Simulate food preparation
* Notify customers when their order is ready

The project showcases event-driven programming using Node.js's built-in `EventEmitter` module.

---

## Concepts Covered

### Event Emitters

The application uses custom events to handle different stages of the order lifecycle.

* Event Registration (`.on()`)
* One-Time Event Listeners (`.once()`)
* Event Triggering (`.emit()`)

### Asynchronous Operations

* Simulated food preparation using `setTimeout()`
* Event-based communication between different modules

### User Input Handling

* Reading user input using the `readline` module
* Processing menu selections dynamically

---

## Events Implemented

### 1. Login Event

Triggered when a user logs in.

```javascript
eventEmitter.once("login", () => {
  console.log(`Welcome, ${user}!`);
});
```

**Purpose**

* Greets the customer after successful login.
* Uses `.once()` to ensure the event executes only one time.

---

### 2. Food Order Event

Triggered when a customer selects a food item.

```javascript
eventEmitter.on("food", () => {
  // Billing and order processing
});
```

**Responsibilities**

* Calculates the total bill.
* Adds tax to the order amount.
* Displays payment confirmation.
* Assigns a table number.
* Simulates food preparation.

---

### 3. Order Ready Event

Triggered after the food preparation timer completes.

```javascript
setTimeout(() => {
  eventEmitter.emit(status, order, tabNum);
}, 5000);
```

**Responsibilities**

* Notifies customers when their order is ready.
* Displays serving information.

---

## Application Flow

```text
User Starts Application
          │
          ▼
Select Option
(Login / Order Food)
          │
          ▼
Login Event Triggered
          │
          ▼
Food Selection
          │
          ▼
Food Event Triggered
          │
          ▼
Bill Calculation
          │
          ▼
Payment Confirmation
          │
          ▼
Food Preparation (5 Seconds)
          │
          ▼
Order Ready Event Triggered
          │
          ▼
Food Served to Table
```

---

## Features

* Event-driven architecture
* One-time login event listener
* Dynamic food ordering system
* Tax calculation
* Random table allocation
* Simulated order preparation delay
* Order status notifications

---

## Technologies Used

* Node.js
* EventEmitter Module
* Readline Module
* JavaScript (ES6)

---

## Sample Output

```text
--------------------------
| Choose Option From Below |
1. Login
2. Order Food
--------------------------

Enter a Number: 1
Enter Name: Kavin

Welcome, Kavin!

Enter a Number: 2

1. Burger
2. Pizza
3. Sandwich

Enter a Number: 2

Total Bill for your order Pizza is $8.4
Payment Successful

Your Pizza is Getting Prepared.
Your Table Number is 7, wait there, will be served once it is ready!

Order: Pizza is serving on Table 7
```

---

## Key Learnings

* Understanding Node.js Event Emitters
* Creating custom events and listeners
* Using `.on()`, `.once()`, and `.emit()`
* Event-driven application design
* Handling asynchronous workflows
* Managing user input through the command line
* Simulating real-world business workflows using events

---

## Future Enhancements

* Support multiple orders per customer
* Store orders in a database
* Implement order cancellation
* Add payment methods
* Generate invoices
* Build a REST API version using Express.js

# Streams - File Copy Using Readable and Writable Streams

## Overview

This project demonstrates how to use Node.js Streams to efficiently read data from a file and write it to another file without loading the entire file into memory.

The application copies the contents of a source file (`file.pdf`) into a destination file (`copy.txt`) using stream piping.

---

## Concepts Covered

### Streams

Streams allow data to be processed in small chunks instead of loading the entire file into memory.

### Benefits

* Improved performance
* Reduced memory consumption
* Efficient handling of large files
* Faster file transfers

---

## Types of Streams Used

### Readable Stream

Used to read data from a source file.

```javascript
const readStream = fs.createReadStream("file.pdf");
```

### Writable Stream

Used to write data into a destination file.

```javascript
const writeStream = fs.createWriteStream("copy.txt");
```

---

## Stream Piping

The `pipe()` method automatically transfers data from a Readable Stream to a Writable Stream.

```javascript
readStream.pipe(writeStream);
```

### Advantages of Pipe

* Cleaner code
* Automatic flow control
* Better memory management
* Handles backpressure internally

---

## Event Handling

### Data Event

Triggered whenever a chunk of data is received.

```javascript
readStream.on("data", (chunk) => {
  console.log(chunk.length);
});
```

**Purpose**

* Processes file data chunk by chunk.
* Displays the size of each buffer received.

---

### End Event

Triggered when the file has been completely read.

```javascript
readStream.on("end", () => {
  console.log("File Read Completed");
});
```

**Purpose**

* Indicates successful completion of file reading.

---

### Error Event

Triggered when an error occurs during reading or writing.

```javascript
readStream.on("error", (err) => {
  console.log(err);
});
```

```javascript
writeStream.on("error", (err) => {
  console.log(err);
});
```

**Purpose**

* Handles file system errors gracefully.
* Prevents application crashes.

---

### Finish Event

Triggered when all data has been successfully written.

```javascript
writeStream.on("finish", () => {
  console.log("File copied Successfully");
});
```

**Purpose**

* Confirms successful file copy operation.

---

## Application Flow

```text
Source File (file.pdf)
          │
          ▼
   Read Stream
          │
          ▼
     Buffer Chunks
          │
          ▼
      pipe()
          │
          ▼
   Write Stream
          │
          ▼
Destination File (copy.txt)
```

---

## Alternative Approach

Instead of using `pipe()`, data can be manually written chunk by chunk.

```javascript
readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});
```

However, using `pipe()` is recommended because it automatically manages data flow and backpressure.

---

## Technologies Used

* Node.js
* File System (fs) Module
* Readable Streams
* Writable Streams
* Stream Events

---

## Sample Output

```text
Buffer
65536

Buffer
65536

Buffer
32768

File Read Completed
File copied Successfully
```

---

## Key Learnings

* Creating Readable and Writable Streams.
* Processing large files efficiently.
* Understanding data chunks (buffers).
* Using `pipe()` for stream-to-stream communication.
* Handling stream events (`data`, `end`, `error`, `finish`).
* Implementing memory-efficient file operations in Node.js.

---

## Real-World Use Cases

* File uploads
* File downloads
* Video streaming
* Audio streaming
* Log processing
* Data migration
* Large file transfers

Streams are one of the most important performance optimization features in Node.js and are widely used in production applications.

# Custom Logger Utility Using Node.js

## Overview

This project demonstrates how to build a simple custom logging utility in Node.js using the File System (`fs`) module.

The logger records application events into a log file (`app.log`) with different log levels such as:

* INFO
* DEBUG
* ERROR

The implementation evolves from simple file writes to a reusable, object-oriented logging solution using a class.

---

## Concepts Covered

### File System Module (`fs`)

Node.js provides the built-in `fs` module for interacting with the file system.

Used methods:

```javascript
fs.appendFileSync()
```

This method appends data to a file and creates the file if it does not already exist.

---

## Basic Logging

Initially, log messages are written directly to the log file.

```javascript
fs.appendFileSync("app.log", "[INFO] User Logged In\n");
fs.appendFileSync("app.log", "[ERROR] Payment Failed\n");
```

### Limitation

* Repetitive code
* Difficult to maintain
* No centralized logging logic

---

## Function-Based Logger

To improve reusability, separate functions are created for each log level.

```javascript
function info(message) {
  fs.appendFileSync("app.log", `[INFO] ${message}\n`);
}

function error(message) {
  fs.appendFileSync("app.log", `[ERROR] ${message}\n`);
}

function debug(message) {
  fs.appendFileSync("app.log", `[DEBUG] ${message}\n`);
}
```

### Benefits

* Cleaner code
* Reusable logging functions
* Better readability

---

## Generic Logging Function

Instead of creating multiple functions, a single reusable function can handle all log levels.

```javascript
function writeLog(level, message) {
  const time = new Date();

  fs.appendFileSync(
    "app.log",
    `${time} [${level}] ${message}\n`
  );
}
```

### Benefits

* Reduces code duplication
* Supports dynamic log levels
* Includes timestamps

---

## Object-Oriented Logger

The final implementation uses a Logger class.

```javascript
class Logger {
  writeLog(level, message) {
    const time = new Date();

    fs.appendFileSync(
      "app.log",
      `${time} [${level}] ${message}\n`
    );
  }

  info(message) {
    this.writeLog("INFO", message);
  }

  error(message) {
    this.writeLog("ERROR", message);
  }

  debug(message) {
    this.writeLog("DEBUG", message);
  }
}
```

---

## Encapsulation

This implementation demonstrates the OOP concept of **Encapsulation**.

### Why?

The logging logic is encapsulated inside the `Logger` class:

* Internal implementation details are hidden.
* Consumers only use public methods.
* Changes to logging behavior can be made without affecting application code.

### Example

```javascript
const logger = new Logger();

logger.info("User Logged In");
logger.debug("OTP Generated");
logger.error("Payment Failed");
```

---

## Application Flow

```text
Application Event
        │
        ▼
Logger Method Called
(info/debug/error)
        │
        ▼
writeLog()
        │
        ▼
Timestamp Added
        │
        ▼
Written to app.log
```

---

## Sample Log Output

```text
Wed Jun 04 2026 10:15:20 GMT+0530 [INFO] User Logged In
Wed Jun 04 2026 10:15:25 GMT+0530 [DEBUG] OTP Generated
Wed Jun 04 2026 10:15:30 GMT+0530 [ERROR] Payment Failed
```

---

## Features

* Custom logging utility
* Timestamped logs
* Multiple log levels
* Reusable logging methods
* Object-oriented implementation
* Centralized logging mechanism

---

## Technologies Used

* Node.js
* File System (fs) Module
* JavaScript Classes
* Object-Oriented Programming (OOP)

---

## Key Learnings

* Working with the Node.js File System module.
* Writing and appending data to files.
* Designing reusable utility functions.
* Implementing logging systems.
* Applying the OOP concept of Encapsulation.
* Building maintainable and scalable code structures.

---

## Real-World Use Cases

* API request logging
* Authentication tracking
* Error monitoring
* Application debugging
* Audit trails
* Production system monitoring

A custom logger is a foundational component in backend applications and helps developers monitor, debug, and maintain systems effectively.


