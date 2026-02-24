const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

let n = 0
function startGame() {
    renderGrid(3);
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

let field = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
];

let counter = 0;
let end = false;
function cellClickHandler(row, col) {

    console.log(`Clicked on cell: ${row}, ${col}`);

    if (field[row][col] !== EMPTY || end) return;
    counter += 1;
    if (counter % 2 == 1) {
        field[row][col] = CROSS;
        renderSymbolInCell(CROSS, row, col);
    } else {
        field[row][col] = ZERO;
        renderSymbolInCell(ZERO, row, col);
    }
    if (isWin(row, col)) {
        alert(`победил игрок за ${counter % 2 == 1 ? CROSS : ZERO}`);
        end = true;
    } else if (isDraw()) {
        alert('Победила дружба');
        end = true;
    }
}

function isWin(row, col) {
    //строки
    let first = field[row][0];
    for (let i = 0; i < 3; i++) {
        if (field[row][i] === EMPTY) break;
        if (field[row][i] !== first) break;
        if (i == 2) return true;
    }
    //столбцы
    first = field[0][col];
    for (let i = 0; i < 3; i++) {
        if (field[i][col] === EMPTY) break;
        if (field[i][col] !== first) break;
        if (i == 2) return true;
    }

    //диагонали
    if (row == col) {
        first = field[0][0]
        for (let i = 0; i < 3; i++) {
            if (field[i][i] === EMPTY) break;
            if (field[i][i] !== first) break;
            if (i == 2) return true;
        }
    }
    if (row + col == 2) {
        first = field[0][2]
        for (let i = 0; i < 3; i++) {
            if (field[i][2 - i] === EMPTY) break;
            if (field[i][2 - i] !== first) break;
            if (i == 2) return true;
        }
    }

    return false
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            field[i][j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j);
        }
    }
    end = false;
}

function isDraw() {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[j].length; j++) {
            if (field[i][j] === EMPTY) {
                return false;
            }
        }
    }

    return true;
}


/* Test Function */
/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
