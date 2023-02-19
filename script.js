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

const renderElement = (budget, table) => {
  const newElement = document.createElement("div");
  newElement.id = `element-${budget.id}`;

  const elementTitleAndValue = document.createElement("p");
  elementTitleAndValue.innerHTML = `<span>${budget.title} - ${budget.value} PLN</span>`;

  newElement.appendChild(elementTitleAndValue);
  table.appendChild(newElement);
}

const calcSum = (table, sumField) => {
  sum = table.map(element => Number(element.value)).reduce((a, b) => a + b);
  sumField.innerText = sum;
  if (sumField === sumIncome) {
    incomeSum += sum;
  } else {
    spendingSum += sum;
  };
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
  renderElement(income, incomeTabel);
  calcSum(incomes,sumIncome);
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
  renderElement(spending, spendingTabel);
  calcSum(spendings, sumSpending);
  sumBudget(incomeSum, spendingSum);
  spendingName.value = "";
  spendingValue.value = "";
}

incomeForm.addEventListener("submit", addIncome);
spendingForm.addEventListener("submit", addSpending);