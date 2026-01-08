var form=document.querySelector("#expense-form");
var button=document.querySelector("#expense-btn")
var amt=document.querySelector("#amt");
const cat = document.getElementById("cat");
const desc = document.getElementById("description");
const pay = document.getElementById("pay-met");
const date = document.getElementById("date");
const rcheck = document.getElementById("rec");
const inter = document.getElementById("time");

button.addEventListener("click", function(e){
    e.preventDefault();
    console.log("The page refresd, page did not reloaded");
    
})

    form.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = amt.value;
    const category = cat.value;
    const description = desc.value;
    const paymentMethod = pay.value;
    const date = date.value;
    const isRecurring = rCheck.checked;
    const interval = inter.value;

    console.log(amount);
    console.log(category);
    console.log(description);
    console.log(paymentMethod);
    console.log(date);
    console.log(isRecurring);
    console.log(interval);
});




