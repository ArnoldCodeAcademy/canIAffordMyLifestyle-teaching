const linkedInputs = [];



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

};

function printChanges(changes){
  console.log(changes);
}

export {InputSynchronizer, linkedInputs}
