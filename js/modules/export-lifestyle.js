import {linkedInputs} from "./summary.js";

function initModule() {
  document.getElementById('downloadButton').addEventListener('click', downloadLifestyle)
}

function downloadLifestyle() {
  const expensesAndPositions = linkedInputs.filter(x => !x.id.includes('tax'));



  let csvContent = "data:text/csv;charset=utf-8,";

  rows.forEach(function (rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });

  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}

export {initModule}
