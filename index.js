const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let dimension = 3;
let field = [];
let counter = 0;
let end = false;
setupGame();

function setupGame() {
    let inputSize = prompt("Введите размер поля N (например, 3 для 3x3):", dimension);

    let newDim = parseInt(inputSize);

    if (!isNaN(newDim) && newDim >= 1) {
        dimension = newDim;
    } else if (inputSize === null) {
        dimension = 3;
    }

    initializeGameAssets(dimension);
    renderGrid(dimension);
    addResetListener();
}

function initializeField(size) {
    field = [];
    for (let i = 0; i < size; i++) {
        field[i] = [];
        for (let j = 0; j < size; j++) {
            field[i][j] = EMPTY;
        }
    }
}

function resetClickHandler() {
    initializeField(dimension);
    end = false;
    counter = 0;

    renderGrid(dimension);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function initializeGameAssets(size) {
    initializeField(size);
    counter = 0;
    end = false;
}


function cellClickHandler(row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (row >= dimension || col >= dimension || field[row][col] !== EMPTY || end) return;

    counter += 1;

    const currentPlayerSymbol = counter % 2 === 1 ? CROSS : ZERO;

    field[row][col] = currentPlayerSymbol;
    renderSymbolInCell(currentPlayerSymbol, row, col);

    if (isWin(row, col)) {
        alert(`Победил игрок за ${currentPlayerSymbol}`);
        end = true;
    } else if (isDraw()) {
        alert('Победила дружба');
        end = true;
    }
}

function isWin(row, col) {
    const D = dimension;

    let first = field[row][0];
    for (let i = 0; i < D; i++) {
        if (field[row][i] === EMPTY) break;
        if (field[row][i] !== first) break;
        if (i === D - 1) return true;
    }

    first = field[0][col];
    for (let i = 0; i < D; i++) {
        if (field[i][col] === EMPTY) break;
        if (field[i][col] !== first) break;
        if (i === D - 1) return true;
    }

    if (row === col) {
        first = field[0][0];
        for (let i = 0; i < D; i++) {
            if (field[i][i] === EMPTY) break;
            if (field[i][i] !== first) break;
            if (i === D - 1) return true;
        }
    }

    if (row + col === D - 1) {
        first = field[0][D - 1];
        for (let i = 0; i < D; i++) {
            if (field[i][D - 1 - i] === EMPTY) break;
            if (field[i][D - 1 - i] !== first) break;
            if (i === D - 1) return true;
        }
    }

    return false;
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    if (targetCell) {
        targetCell.textContent = symbol;
        targetCell.style.color = color;
    }
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    if (!targetRow) return null;
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    if (resetButton) {
        resetButton.removeEventListener('click', resetClickHandler);
        resetButton.addEventListener('click', resetClickHandler);
    }
}

function isDraw() {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] === EMPTY) {
                return false;
            }
        }
    }
    return true;
}