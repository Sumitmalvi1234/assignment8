const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const transactionCount = document.getElementById("transactionCount");
const addBtn = document.getElementById("addbtn");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const saveBtn = document.getElementById("saveBtn");
const themeToggle = document.getElementById("themeToggle");
const resetBtn = document.getElementById("resetBtn");
const logoutBtn = document.getElementById("logoutBtn");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
console.log(transactions);

let editId = null;
function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

const transactionList = document.getElementById("transactionList");

function displayTransactions() {
  transactionList.innerHTML = "";

  transactions.forEach(function (item) {
    const li = document.createElement("li");

   li.innerHTML = `
    <div class="transaction-card ${item.type}">
        <div>
            <h3>${item.title}</h3>
            <p>${item.type}</p>
        </div>

        <div>
            <h2>₹${item.amount}</h2>
            <button onclick="editTransaction(${item.id})">
                Edit
            </button>
            <button onclick="deleteTransaction(${item.id})">
            Delete
        </button>
        </div>
    </div>
`;

    transactionList.appendChild(li);
  });
}

function updateSummary() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(function (item) {
    if (item.type === "income") {
      totalIncome += item.amount;
    } else {
      totalExpense += item.amount;
    }
  });

  const totalBalance = totalIncome - totalExpense;

  balance.innerText = "₹" + totalBalance;

  income.innerText = "₹" + totalIncome;

  expense.innerText = "₹" + totalExpense;

  transactionCount.innerText = transactions.length;
}

function deleteTransaction(id) {
  transactions = transactions.filter(function (item) {
    return item.id !== id;
  });

  saveData();

  displayTransactions();
  updateSummary();
}

function editTransaction(id){
    const transaction = transactions.find(function(item){

        return item.id === id;

    });
    titleInput.value = transaction.title;
amountInput.value = transaction.amount;
typeInput.value = transaction.type;
editId = id;
popup.classList.remove("hidden");
}

displayTransactions();
updateSummary();

addBtn.addEventListener("click", function () {
  popup.classList.remove("hidden");
});

closeBtn.addEventListener("click", function () {
  popup.classList.add("hidden");
});

//save button
saveBtn.addEventListener("click", function () {
  

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const type = typeInput.value;
  console.log(type);

  if (title === "" || amount <= 0) {
    alert("please enter valid details");
    return;
  }
if (editId ===null){
const newTransaction = {
    id: Date.now(),
    title: title,
    amount: amount,
    type: type,
  };
   transactions.push(newTransaction);

}else{
    const transaction = transactions.find(function(item){

    return item.id === editId;

});
transaction.title = title;
transaction.amount = amount;
transaction.type = type;
editId = null;
}
  

 
  saveData();
  displayTransactions();
  updateSummary();
  titleInput.value = "";
  amountInput.value = "";
  typeInput.value = "income";
  popup.classList.add("hidden");
});

displayTransactions();
updateSummary();

themeToggle.addEventListener("change", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

});



resetBtn.addEventListener("click", function () {

    const confirmReset = confirm("Are you sure you want to delete all transactions?");

    if (!confirmReset) return;

    transactions = [];

    localStorage.removeItem("transactions");

    displayTransactions();
    updateSummary();

});


logoutBtn.addEventListener("click", function () {

    const logout = confirm("Are you sure you want to logout?");

    if (!logout) return;

    localStorage.removeItem("isLoggedIn");

    window.location.href = "index.html";

});