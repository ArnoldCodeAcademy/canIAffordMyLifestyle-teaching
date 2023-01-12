const linkedInputs = [];

function initModule() {
  new InputSynchronizer(document.getElementById("0_input"), 20, 'change');
  new InputSynchronizer(document.getElementById('0_position'), 'Position', 'input');
  new InputSynchronizer(document.getElementById('tax_rate_input'), 0, 'change');
  updateSummary();
}

function InputSynchronizer(element, value, event) {
  this.id = element.id;
  this.element = element;
  this.value = value;

  element.value = value;
  element.addEventListener(event, this);

  linkedInputs.push(this);
}

//default implementation for "eventListener interface"
// gets invoked by giving the handler just the object itself
InputSynchronizer.prototype.handleEvent = function (event) {
  switch (event.type) {
    case "change": {
      this.calculateSummary(this.element.value);
      break;
    }
  }
};

InputSynchronizer.prototype.calculateSummary = function (value) {

  if (this.element.id.includes('tax')) {
    this.value = keepInBoundaries(parseInt(value));
    this.element.value = keepInBoundaries(parseInt(value));
  } else {
    this.value = value;
    this.element.value = value;
  }

  printChanges({
    id: this.element.id,
    value: this.element.value
  })

  updateSummary();
};

function keepInBoundaries(value) {
  const min = 0;
  const max = 99;

  if (value < min) {
    value = min;
  } else if (value > max) {
    value = max;
  }
  return value;
}

function printChanges(changes) {
  console.log(changes);
}

function updateSummary() {
  updateLifeCost();
}


function updateLifeCost() {
  const linkedExpenses = linkedInputs.filter(x => !x.id.includes('tax'));

  const total = linkedExpenses.reduce((acc, x) => acc + parseFloat(x.value), 0);
  document.getElementById('summary').innerText = `My life costs me a total of $${total} per month.`;
  document.getElementById('total_expenses').innerText = `$${total}`;

  const taxRateInput = linkedInputs.find(x => x.id.includes('tax'));

  updateDaily(total, taxRateInput.value);
  updateMonthly(total, taxRateInput.value);
  updateYearly(total, taxRateInput.value);
}


function updateDaily(total, taxRate) {
  const dailyBeforeTaxes = ((total / 30) / (1 - (parseInt(taxRate)/ 100))).toFixed(2);
  const dailyAfterTaxes = (total / 30).toFixed(2);

  document.getElementById('summary_daily').innerText = `$${dailyBeforeTaxes} daily ($${dailyAfterTaxes} after taxes)`;
}

function updateMonthly(total, taxRate) {
  const monthlyBeforeTaxes = (total / (1 - (parseInt(taxRate)/ 100))).toFixed(2);
  const monthlyAfterTaxes = (total).toFixed(2);

  document.getElementById('summary_monthly').innerText = `$${monthlyBeforeTaxes} monthly ($${monthlyAfterTaxes} after taxes)`;
}

function updateYearly(total, taxRate) {
  const yearlyBeforeTaxes = (total * 12 / (1 - (parseInt(taxRate)/ 100))).toFixed(2);
  const yearlyAfterTaxes = (total * 12).toFixed(2);

  document.getElementById('summary_yearly').innerText = `$${yearlyBeforeTaxes} yearly ($${yearlyAfterTaxes} after taxes)`;

}

function deleteLinkedInput(id) {
  const linkedInputToDelete = linkedInputs.find(x => x.id === id);

  if (linkedInputToDelete) {
    linkedInputs.splice(linkedInputs.indexOf(linkedInputToDelete), 1);
    updateLifeCost();
  }
}

export {initModule, InputSynchronizer, linkedInputs, deleteLinkedInput}
