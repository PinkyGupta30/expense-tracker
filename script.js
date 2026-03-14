const form = document.getElementById("expenseForm")
const expenseList = document.getElementById("expenseList")

let expenses = JSON.parse(localStorage.getItem("expenses")) || []

render()

form.addEventListener("submit", function(e){

e.preventDefault()

const amount = document.getElementById("amount").value
const description = document.getElementById("description").value
const category = document.getElementById("category").value

const expense = {
amount,
description,
category
}

expenses.push(expense)

localStorage.setItem("expenses", JSON.stringify(expenses))

render()

form.reset()

})

function render(){

expenseList.innerHTML = ""

expenses.forEach((exp,index)=>{

const li = document.createElement("li")

li.className = "list-group-item d-flex justify-content-between align-items-center"

li.innerHTML = `
<div>
<b>₹${exp.amount}</b> - ${exp.description} - ${exp.category}
</div>

<div>
<button class="btn btn-warning btn-sm" onclick="editExpense(${index})">Edit</button>
<button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
</div>
`

expenseList.appendChild(li)

})

}

function deleteExpense(index){

expenses.splice(index,1)

localStorage.setItem("expenses", JSON.stringify(expenses))

render()

}

function editExpense(index){

const exp = expenses[index]

document.getElementById("amount").value = exp.amount
document.getElementById("description").value = exp.description
document.getElementById("category").value = exp.category

deleteExpense(index)

}
