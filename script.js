let incomes = [];

/* 
Przychód (income) będzie obiektem: 
@income:
{
  id: Number,
  title: String,
  value: Number,
  isCompleted: Boolean
}
*/

const incomeTabel = document.getElementById("income-tabel");
const incomeName = document.getElementById("income");
const incomeValue = document.getElementById("valueIncome");
const incomeForm = document.getElementById("income-form");
const sumIncome = document.getElementById("sumIncome");

const renderInput = (income) => {
  const newIncome = document.createElement("div");
  newIncome.id = `income-${income.id}`;

  const incomeTitleAndValue = document.createElement("p");
  incomeTitleAndValue.innerHTML = `<span>${income.title} - ${income.value}</span>`;

  newIncome.appendChild(incomeTitleAndValue);
  incomeTabel.appendChild(newIncome);
}

const calcSumIncome = () => {
  const sumIncome = document.getElementById("sumIncome");
  const sum = incomes.map(element => Number(element.value)).reduce((a,b) => a + b, 0);
  sumIncome.innerText = sum;
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
    isCompleted: false,
  }

  incomes.push(income);
  renderInput(income);
  calcSumIncome();
  incomeName.value = "";
  incomeValue.value = "";
};

incomeForm.addEventListener("submit", addIncome);