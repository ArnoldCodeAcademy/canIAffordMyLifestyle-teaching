import * as Expenses from './modules/add-expenses.js'
import * as Summary from "./modules/summary.js";

Expenses.initModule();
Summary.initModule();

window.deleteExpense = Expenses.deleteExpense


