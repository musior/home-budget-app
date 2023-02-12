let incomes = [];
let spendings = [];
/* 
Przychód (income) będzie obiektem: 
@income:
{
  id: Number,
  title: String,
  value: Number,
  isDeleted: Boolean
}

Wydatki (spending) będą również obiektem: 
@spending:
{
  id: Number,
  title: String,
  value: Number,
  isDeleted: Boolean
}
*/

const incomeTabel = document.getElementById("income-tabel");
const incomeName = document.getElementById("income");
const incomeValue = document.getElementById("valueIncome");
const incomeForm = document.getElementById("income-form");
const sumIncome = document.getElementById("sumIncome");


const spendingTabel = document.getElementById("spending-tabel");
const spendingName = document.getElementById("spending");
const spendingValue = document.getElementById("valueSpending");
const spendingForm = document.getElementById("spending-form");
const sumSpending = document.getElementById("sumSpending");

const totalBudget = document.getElementById("total-budget");

let sumTotal = 0;
let incomeSum = 0;
let spendingSum = 0;

const renderInput = (income) => {
  const newIncome = document.createElement("div");
  newIncome.id = `income-${income.id}`;

  const incomeTitleAndValue = document.createElement("p");
  incomeTitleAndValue.innerHTML = `<span>${income.title} - ${income.value} PLN</span>`;

  newIncome.appendChild(incomeTitleAndValue);
  incomeTabel.appendChild(newIncome);
}

const renderSpending = (spending) => {
  const newSpending = document.createElement("div");
  newSpending.id = `spending-${spending.id}`;

  const spendingTitleAndValue = document.createElement("p");
  spendingTitleAndValue.innerHTML = `<span>${spending.title} - ${spending.value} PLN</span>`;

  newSpending.appendChild(spendingTitleAndValue);
  spendingTabel.appendChild(newSpending);
}

const calcSumIncome = () => {
  incomeSum = incomes.map(element => Number(element.value)).reduce((a, b) => a + b);
  sumIncome.innerText = incomeSum;
}

const calcSumSpending = () => {
  spendingSum = spendings.map(element => Number(element.value)).reduce((a, b) => a + b);
  sumSpending.innerText = spendingSum;
}

const sumBudget = (incomeSum, spendingSum) => {
  sumTotal = incomeSum - spendingSum;
  if (sumTotal > 0) {
    totalBudget.innerText = `You can still spend ${sumTotal} PLN.`;
  } else if (sumTotal < 0) {
    totalBudget.innerText = `The balance is negative. You are in negative ${(-sumTotal)} PLN.`;
  } else {
    totalBudget.innerText = `The balance is zero PLN.`;
  }  
}

const addIncome = (event) => {
  event.preventDefault();
  const incomeTitle = incomeName.value;
  const valueOfIncome = incomeValue.value;

  const incomeId = Date.now();

  const income = {
    id: incomeId,
    title: incomeTitle,
    value: valueOfIncome,
    isDeleted: false,
  };

  incomes.push(income);
  renderInput(income);
  calcSumIncome();
  sumBudget(incomeSum, spendingSum);
  incomeName.value = "";
  incomeValue.value = "";
};

const addSpending = (event) => {
  event.preventDefault();
  const spendingTitle = spendingName.value;
  const valueOfSpending = spendingValue.value;

  const spendingId = Date.now();

  const spending = {
    id: spendingId,
    title: spendingTitle,
    value: valueOfSpending,
    isDeleted: false,
  };

  spendings.push(spending);
  renderSpending(spending);
  calcSumSpending();
  sumBudget(incomeSum, spendingSum);
  spendingName.value = "";
  spendingValue.value = "";
}

incomeForm.addEventListener("submit", addIncome);
spendingForm.addEventListener("submit", addSpending);