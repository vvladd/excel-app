const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
    <div class="cell" contenteditable></div>
    `;
}

function toColumn(col) {
  return `
    <div class="column" data-type="resizeble">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function createRow(numRow, content) {
  const resizer = numRow
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `
    <div class="row">
        <div class="row-info">
          ${numRow ? numRow : ''}
          ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('');

  rows.push(createRow(0, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('');
    rows.push(createRow(i + 1, cells));
  }
  return rows.join('');
}
