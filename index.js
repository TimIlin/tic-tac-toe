const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const RED = '#FF0000';

const container = document.getElementById('fieldWrapper');

let dimension = 3;
let field = [];
let counter = 0;
let end = false;

document.addEventListener('DOMContentLoaded', () => {
    if (!container) {
        console.error("Элемент с ID 'fieldWrapper' не найден в HTML.");
        return;
    }
    setupGame();
});



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

function initializeGameAssets(size) {
    initializeField(size);
    counter = 0;
    end = false;
}

function resetClickHandler() {
    initializeField(dimension);
    end = false;
    counter = 0;
    renderGrid(dimension);
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    if (resetButton) {
        resetButton.removeEventListener('click', resetClickHandler);
        resetButton.addEventListener('click', resetClickHandler);
    }
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


function cellClickHandler(row, col) {
    if (field[row][col] !== EMPTY || end) return;

    counter += 1;
    const currentPlayerSymbol = counter % 2 === 1 ? CROSS : ZERO;

    field[row][col] = currentPlayerSymbol;
    renderSymbolInCell(currentPlayerSymbol, row, col, '#333');

    const winningCoords = isWin(row, col);

    if (winningCoords) {
        alert(`Победил игрок за ${currentPlayerSymbol}`);
        end = true;
        renderWinningLine(winningCoords, RED);

    } else if (isDraw()) {
        alert('Победила дружба');
        end = true;
    }
}

function renderWinningLine(coordsArray, color) {
    coordsArray.forEach(coord => {
        renderSymbolInCell(field[coord.r][coord.c], coord.r, coord.c, color);
    });
}


function isWin(row, col) {
    const D = dimension;

    let first = field[row][0];
    if (first !== EMPTY) {
        let match = true;
        for (let i = 1; i < D; i++) {
            if (field[row][i] !== first) { match = false; break; }
        }
        if (match) {
            const line = [];
            for (let j = 0; j < D; j++) line.push({ r: row, c: j });
            return line;
        }
    }

    first = field[0][col];
    if (first !== EMPTY) {
        let match = true;
        for (let i = 1; i < D; i++) {
            if (field[i][col] !== first) { match = false; break; }
        }
        if (match) {
            const line = [];
            for (let j = 0; j < D; j++) line.push({ r: j, c: col });
            return line;
        }
    }

    if (row === col) {
        first = field[0][0];
        if (first !== EMPTY) {
            let match = true;
            for (let i = 1; i < D; i++) {
                if (field[i][i] !== first) { match = false; break; }
            }
            if (match) {
                const line = [];
                for (let j = 0; j < D; j++) line.push({ r: j, c: j });
                return line;
            }
        }
    }

    if (row + col === D - 1) {
        first = field[0][D - 1];
        if (first !== EMPTY) {
            let match = true;
            for (let i = 1; i < D; i++) {
                if (field[i][D - 1 - i] !== first) { match = false; break; }
            }
            if (match) {
                const line = [];
                for (let j = 0; j < D; j++) line.push({ r: j, c: D - 1 - j });
                return line;
            }
        }
    }

    return null;
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