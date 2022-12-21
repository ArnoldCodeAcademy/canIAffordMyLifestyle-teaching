const linkedInputs = [];

function initModule(){
  new InputSynchronizer(document.getElementById("0_input"), 20);
  updateSummary();
}

function InputSynchronizer(element, value) {
  this.id = element.id;
  this.element = element;
  this.value = value;

  element.value = value;
  element.addEventListener("change", this);

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
  this.value = value;
  this.element.value = value;

  printChanges({
    id: this.element.id,
    value: this.element.value
  })

  updateSummary()

};

function printChanges(changes){
  console.log(changes);
}

function updateSummary(){
  updateLifeCost();

}


function updateLifeCost(){
  const total = linkedInputs.reduce((acc, x) => acc + parseFloat(x.value), 0);
  document.getElementById('summary').innerText = `My life costs me a total of $${total} per month.`;

  updateDaily(total);
  updateMonthly(total);
  updateYearly(total);
}


function updateDaily(total){
  const dailyBeforeTaxes = (total / 30).toFixed(2) + '*TAX_RATE';
  const dailyAfterTaxes = (total / 30).toFixed(2);

  document.getElementById('summary_daily').innerText = `$${dailyBeforeTaxes} daily ($${dailyAfterTaxes} after taxes)`;
}

function updateMonthly(total){
  const monthlyBeforeTaxes = (total).toFixed(2) + '*TAX_RATE';
  const monthlyAfterTaxes = (total).toFixed(2);

  document.getElementById('summary_monthly').innerText = `$${monthlyBeforeTaxes} monthly ($${monthlyAfterTaxes} after taxes)`;
}

function updateYearly(total){
  const yearlyBeforeTaxes = (total * 12) .toFixed(2) + '*TAX_RATE';
  const yearlyAfterTaxes = (total *12 ).toFixed(2);

  document.getElementById('summary_yearly').innerText = `$${yearlyBeforeTaxes} yearly ($${yearlyAfterTaxes} after taxes)`;

}

export {initModule,InputSynchronizer, linkedInputs}
