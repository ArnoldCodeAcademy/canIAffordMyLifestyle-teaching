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
}

export {initModule,InputSynchronizer, linkedInputs}
