import {deleteLinkedInput, InputSynchronizer, linkedInputs} from "./summary.js";

const positionContainer = document.getElementById('position-container');
const expensesContainer = document.getElementById('expenses-container');

const positionItem = document.getElementById('item-position');
const expenseItem = document.getElementById('item-expense');

let totalCount = 0


const expensesIds = [{
  position: '0_position',
  expense: '0_expenses',
  input: '0_input',
}]


function initModule() {
  const addExpenseButton = document.getElementById('b-add-expenses')

  addExpenseButton.addEventListener('click', addExpense)
}

function addExpense() {
  const position = positionItem.content.cloneNode(true)
  const expense = expenseItem.content.cloneNode(true)

  totalCount++;
  position.firstElementChild.id = `${totalCount}_position`;
  expense.firstElementChild.id = `${totalCount}_expense`;
  expense.firstElementChild.firstElementChild.firstElementChild.id = `${totalCount}_input`;

  expensesIds.push({
    position: position.firstElementChild.id,
    expense: expense.firstElementChild.id,
    input: expense.firstElementChild.firstElementChild.firstElementChild.id
  });

  positionContainer.append(position);
  expensesContainer.append(expense);


  new InputSynchronizer(document.getElementById(`${totalCount}_input`), 0, 'change');
  new InputSynchronizer(document.getElementById(`${totalCount}_position`), 'Position', 'input');

  console.log(expensesIds);
}

function deleteExpense(id) {
  if (expensesIds.length <= 1) {
    window.alert("Can't delete your only expense.");
    return;
  }

  const pureId = id.split('_')[0];

  const positionId = `${pureId}_position`
  const expenseId = `${pureId}_expense`

  for (let i = 0; i < expensesIds.length; i++) {
    if (expensesIds[i].position === positionId) {
      expensesIds.splice(i, 1)
    }
  }

  const position = document.getElementById(positionId);
  const expense = document.getElementById(expenseId);

  expense.remove();
  position.remove();


  deleteLinkedInput(`${pureId}_input`);
  deleteLinkedInput(`${pureId}_position`);
}

export {initModule, deleteExpense}
