import * as Expenses from './modules/add-expenses.js'
import * as Summary from "./modules/summary.js";
import * as Export from "./modules/export-lifestyle.js";

Expenses.initModule();
Summary.initModule();
Export.initModule();

window.deleteExpense = Expenses.deleteExpense


