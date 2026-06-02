console.log("Customer entered");

setTimeout(() => {
    console.log("Coffee served");
}, 5000);

console.log("Taking another order");

const button = document.getElementById("orderBtn");

button.addEventListener("click", () => {
    console.log("Order Received");
});

takeOrder()
  .then(cookFood)
  .then(generateBill)
  .then(takePayment)
  .catch(err => console.log(err));