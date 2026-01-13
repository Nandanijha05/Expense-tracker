var expense_tracker = []

//DOM SELECTION
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
function calc(){
    var total=0;
    expense_tracker.forEach(exp=>{
    total=total+exp.amount;
});
document.getElementById("total").innerText = "Rs." + total;
}



var editIndex=null;
var error=document.querySelector('#error')

document.addEventListener("DOMContentLoaded",function(){
    var data=localStorage.getItem("expense")
// Set default date to today
const today = new Date().toISOString().split('T')[0];
date.value = today;

    if(data!=null){
        // var data=localStorage.getItem("expense")
        expense_tracker=JSON.parse(data);
    }
    render();

    form.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = Number(amt.value);
    const category = cat.value;
    const description = desc.value;
    const paymentMethod = pay.value;
    const date1 = date.value;
    const isRecurring = rcheck.checked;
    const interval = inter.value;
    console.log(amount);
    if(amount<=0 || isNaN(amount)){
            error.innerText='Not a valid amount'
            error.style.color='red';
            error.style.fontStyle='italic';
            return;

    }
    
    error.innerText="";
    

    var obj={
     amount,category,description,paymentMethod,date1,isRecurring,interval
    }
    console.log("editIndex before submit:", editIndex);

    if(editIndex===null)
        expense_tracker.push(obj);
    else
    {
        expense_tracker[editIndex]=obj;
        editIndex=null;
        button.innerText="add expense"
    }
    // var expense=JSON.stringify(expense_tracker);
    localStorage.setItem("expense",JSON.stringify(expense_tracker));
    render();

    form.reset();
    error.innerText = "";
error.style.color = "";
error.style.fontStyle = "";


});
});

const render=function(){
    tbody.innerHTML = ""//clear table

    expense_tracker.forEach((exp,index)=>{
    var row=document.createElement('tr')

    row.innerHTML=`<td>${exp.category}</td><td>${exp.description}</td><td>Rs.${exp.amount}</td><td>${exp.date1}</td><td>${exp.paymentMethod}</td><td><button data-index="${index}" data-action="delete">Delete</button ><button data-index="${index}" data-action="edit">Edit</button>
  </td>`;
    tbody.appendChild(row); 
});
    calc();
     renderTrendGraph();
}

tbody.addEventListener("click", function(e){
    const b =e.target;
        if(b.tagName!=="BUTTON") return;
        const index=Number(b.dataset.index)
        const action =b.dataset.action;
        if(action==="delete")
            deleteEpenses(index);
        if(action==="edit")
            edit(index);
        
    })


function edit(index){
    const exp=expense_tracker[index];

        amt.value=exp.amount;
        cat.value=exp.category;
        desc.value = exp.description;
        pay.value = exp.paymentMethod;
        date.value = exp.date1;
        rcheck.checked = exp.isRecurring;
        inter.value = exp.interval;

    editIndex=index;
    button.innerText="Update Index"
}

function deleteEpenses(index){
            const confirmDelete = confirm("Are you sure you want to delete this expense?");
            if (!confirmDelete) return;

        expense_tracker.splice(index,1)
        localStorage.setItem("expense",JSON.stringify(expense_tracker));
        render();
}
// localStorage.clear();









function renderTrendGraph() {
    const ctx = document.getElementById("trendChart").getContext("2d");

    // Prepare last 7 days
    const dates = [];
    const totals = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const formatted = d.toISOString().split("T")[0]; // YYYY-MM-DD
        dates.push(formatted);
        totals.push(0);
    }

    // Aggregate expenses
    expense_tracker.forEach(exp => {
        const index = dates.indexOf(exp.date1);
        if (index !== -1) {
            totals[index] += exp.amount;
        }
    });

    // Only destroy if it's a valid Chart instance
    if (window.trendChart && typeof window.trendChart.destroy === "function") {
        window.trendChart.destroy();
    }

    // Create a new line chart
    window.trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: "Expenses (Last 7 Days)",
                data: totals,
                borderColor: "#1e88e5",
                backgroundColor: "rgba(30, 136, 229, 0.2)",
                tension: 0,  // straight lines
                fill: false,
                pointRadius: 5,
                pointBackgroundColor: "#1565c0"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true, position: "top" },
                tooltip: {
                    callbacks: {
                        label: function(context) { return `Rs.${context.raw}`; }
                    }
                }
            },
            scales: {
                x: { title: { display: true, text: "Date" } },
                y: { beginAtZero: true, title: { display: true, text: "Amount (Rs.)" } }
            }
        }
    });
}

