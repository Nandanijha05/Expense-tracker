var form=document.querySelector("#expense-form");
var button=document.querySelector("#expense-btn")
var amt=document.querySelector("#amt");
const cat = document.getElementById("cat");
const desc = document.getElementById("description");
const pay = document.getElementById("pay-met");
const date = document.getElementById("date");
const rcheck = document.getElementById("rec");
const inter = document.getElementById("time");
const tbody=document.getElementById("expense-table-body")

// button.addEventListener("click", function(e){
//     e.preventDefault();
//     console.log("The page refresd, page did not reloaded");
    
// })

    form.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = amt.value;
    const category = cat.value;
    const description = desc.value;
    const paymentMethod = pay.value;
    const date1 = date.value;
const isRecurring = rcheck.checked;
    const interval = inter.value;

    console.log(amount);
    console.log(category);
    console.log(description);
    console.log(paymentMethod);
    console.log(date1);
    console.log(isRecurring);
    console.log(interval);
    var row=document.createElement('tr');
    var c1=document.createElement('td')
    var c2=document.createElement('td')
    var c3=document.createElement('td')
    var c4=document.createElement('td')
    var c5=document.createElement('td')
    c2.innerText=category
    c3.innerText=description
    c1.innerText=amount;
    c4.innerText=date1
    c5.innerText=paymentMethod
    row.appendChild(c2)
    row.appendChild(c3)
    row.appendChild(c1)
    row.appendChild(c4)
    row.appendChild(c5)
    tbody.appendChild(row);
        form.reset();
});






