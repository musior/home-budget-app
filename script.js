let incomes = [];

/* 
Przychód (income) będzie obiektem: 
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

  console.log(income);
  incomes.push(income);
};

incomeForm.addEventListener("submit", addIncome);