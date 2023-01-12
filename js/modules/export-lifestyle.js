import {linkedInputs} from "./summary.js";

function initModule() {
  document.getElementById('downloadButton').addEventListener('click', downloadLifestyle)
}

function downloadLifestyle() {
  const expensesAndPositions = linkedInputs.filter(x => !x.id.includes('tax'));

  const rows = convertForExport(expensesAndPositions);

  let csvContent = "data:text/csv;charset=utf-8,";

  rows.forEach(function (rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });

  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}

function convertForExport(expensesAndPositions) {
  const rawArray = expensesAndPositions.map(x => x.value);
  return convertArrayIntoPairOfTwos(rawArray)
}

function convertArrayIntoPairOfTwos(arr) {
  // map through the array
  return arr.map((value, index) => {
    // check if the current index is even
    if (index % 2 === 0) {
      // if it is, return a subarray with the current value and the next value in the array
      return [value, arr[index + 1]];
    }
    // if not, return null
    return null;
    // filter out any null values
  }).filter(Boolean);
}

export {initModule}
