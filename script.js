let incomes = [];
let spendings = [];
/* 
Przychód (income) będzie obiektem: 
@income:
{
  id: Number,
  title: String,
  value: Number
}

Wydatki (spending) będą również obiektem: 
@spending:
{
  id: Number,
  title: String,
  value: Number
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

/* Function to remove selected income or spending */
const removeElement = (event, tableId) => {
  incomes = incomes.filter((item) => item.id !== tableId);
  spendings = spendings.filter((item) => item.id !== tableId);

  const element = event.currentTarget;
  const elementParent = element.closest(".budget-list");
  elementParent.remove();

  calcSum(incomes, sumIncome);
  calcSum(spendings, sumSpending);
  sumBudget(incomeSum, spendingSum);
}

/* Function to edit income or spending */
const editElement = (event, budget, table) => {
  const element = event.currentTarget;
  const elementParent = element.closest(".budget-list");
  elementParent.innerHTML = "";

  const editForm = document.createElement("form");
  editForm.classList.add("editedForm");
  const editTitleInput = document.createElement("input");
  const editValueInput = document.createElement("input");
  const div = document.createElement("div");
  const buttonToConfirmEdit = document.createElement("button");

  div.classList.add("budget-action");
  editTitleInput.classList.add("form-container-input");
  editTitleInput.setAttribute("name", "editTitle");
  editTitleInput.setAttribute("id", "editTitle");
  editValueInput.classList.add("form-container-input");
  editValueInput.setAttribute("name", "editValue");
  editValueInput.setAttribute("id", "editValue");
  buttonToConfirmEdit.classList.add("tooltip");
  buttonToConfirmEdit.type = "submit";
  buttonToConfirmEdit.innerHTML = `✔️ <span class="tooltiptext">Confirm</span>`;

  editTitleInput.type = "text";
  editValueInput.type = "number";
  editTitleInput.value = `${budget.title}`;
  editValueInput.value = `${budget.value}`;

  editForm.appendChild(editTitleInput);
  editForm.appendChild(editValueInput);
  elementParent.appendChild(editForm);
  div.appendChild(buttonToConfirmEdit);
  elementParent.appendChild(div);

  buttonToConfirmEdit.addEventListener("click", (e) => {
    e.preventDefault();
    elementParent.remove();
    budget.title = editTitleInput.value;
    budget.value = editValueInput.value;
    renderElement(budget, table);
    calcSum(incomes, sumIncome);
    calcSum(spendings, sumSpending);
    sumBudget(incomeSum, spendingSum);
  });
}

/* Function to render income or spending on the screen */
const renderElement = (budget, table) => {
  const newElement = document.createElement("div");
  newElement.id = `element-${budget.id}`;
  newElement.classList.add("budget-list");

  const elementTitleAndValue = document.createElement("p");
  elementTitleAndValue.classList.add("budget-item");
  elementTitleAndValue.innerHTML = `<span>${budget.title} - ${budget.value} PLN</span>`;

  const budgetAction = document.createElement("div");
  budgetAction.classList.add("budget-action");

  const editBudget = document.createElement("button");
  const deleteBudget = document.createElement("button");

  deleteBudget.addEventListener("click", (e) => removeElement(e, budget.id));
  editBudget.addEventListener("click", (e) => editElement(e, budget, table));
  editBudget.classList.add("tooltip");
  deleteBudget.classList.add("tooltip");

  editBudget.innerText = "🖊️";
  deleteBudget.innerText = "❌";

  const tooltipTextEdit = document.createElement("span");
  const tooltipTextDelete = document.createElement("span");
  tooltipTextEdit.classList.add("tooltiptext");
  tooltipTextDelete.classList.add("tooltiptext");
  tooltipTextEdit.innerText = "Edit";
  tooltipTextDelete.innerText = "Delete";

  editBudget.appendChild(tooltipTextEdit);
  deleteBudget.appendChild(tooltipTextDelete);

  budgetAction.appendChild(editBudget);
  budgetAction.appendChild(deleteBudget);

  newElement.appendChild(elementTitleAndValue);
  newElement.appendChild(budgetAction);
  table.appendChild(newElement);
}

const calcSum = (table, sumField) => {
  sum = table.map(element => Number(element.value)).reduce((a, b) => a + b, 0);
  sumField.innerText = sum;
  if (sumField === sumIncome) {
    incomeSum = sum;
  } else {
    spendingSum = sum;
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
    value: valueOfIncome
  };

  incomes.push(income);
  renderElement(income, incomeTabel);
  calcSum(incomes, sumIncome);
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
    value: valueOfSpending
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