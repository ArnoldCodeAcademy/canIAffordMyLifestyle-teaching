const positionContainer = document.getElementById('position-container');
const expensesContainer = document.getElementById('expenses-container');

const positionItem = document.getElementById('item-position');
const expenseItem = document.getElementById('item-expense');

function initModule() {
  const addExpenseButton = document.getElementById('b-add-expenses')

  addExpenseButton.addEventListener('click', addExpense)
}

function addExpense() {
  const position = positionItem.content.cloneNode(true)
  const expense = expenseItem.content.cloneNode(true)

  positionContainer.append(position)
  expensesContainer.append(expense)
}

export {initModule}
