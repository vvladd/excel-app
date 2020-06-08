const CODES = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function toCell(state, row) {
  return (_, col) => {
    const width = getWidth(state, col);
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${col}" 
        data-type="cell"
        data-id="${row}:${col}"
        style="width: ${width}"
      ></div>
    `;
  };
}

function toColumn({col, index, width}) {
  return `
    <div 
      class="column" 
      data-type="resizeble" 
      data-col="${index}" 
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function createRow(numRow, content, state) {
  const height = getHeight(state, numRow);
  const resizer = numRow
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `
    <div 
      class="row" 
      data-type="resizeble" 
      data-row="${numRow}" 
      style="height: ${height}"
    >
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

function withWidthFrom(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('');

  rows.push(createRow(0, cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(state.colState, row))
      .join('');
    rows.push(createRow(row + 1, cells, state.rowState));
  }
  return rows.join('');
}
