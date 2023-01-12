function initModule() {
  document.getElementById('downloadButton').addEventListener('click', downloadLifestyle)
}

function downloadLifestyle() {
  const rows = [
    ['Position 1', '17'],
    ['Position 2', '29'],
  ]

  let csvContent = "data:text/csv;charset=utf-8,";

  rows.forEach(function (rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });

  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}

export {initModule}
