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

const totalBudget = document.getElementById("total-budget");

let sum = 0;

const renderInput = (income) => {
  const newIncome = document.createElement("div");
  newIncome.id = `income-${income.id}`;

  const incomeTitleAndValue = document.createElement("p");
  incomeTitleAndValue.innerHTML = `<span>${income.title} - ${income.value} zł</span>`;

  newIncome.appendChild(incomeTitleAndValue);
  incomeTabel.appendChild(newIncome);
}

const renderSpending = (spending) => {
  const newSpending = document.createElement("div");
  newSpending.id = `spending-${spending.id}`;

  const spendingTitleAndValue = document.createElement("p");
  spendingTitleAndValue.innerHTML = `<span>${spending.title} - ${spending.value} zł</span>`;

  newSpending.appendChild(spendingTitleAndValue);
  spendingTabel.appendChild(newSpending);
}

const calcSumIncome = () => {
  sum = incomes.map(element => Number(element.value)).reduce((a, b) => a + b);
  sumIncome.innerText = sum;
}

const sumBudget = () => {
  if (sum < 0) {
    totalBudget.innerText = `Your are under the budget, current budget is ${sum} zł.`
  } 
  if (sum == 0) {
    totalBudget.innerText = `Your current budget is ${sum} zł.`
  } 
  if (sum > 0) {
    totalBudget.innetText = `Your current budget is ${sum} zł.`
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
  sumBudget();
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
  spendingName.value = "";
  spendingValue.value = "";
}

incomeForm.addEventListener("submit", addIncome);
spendingForm.addEventListener("submit", addSpending);