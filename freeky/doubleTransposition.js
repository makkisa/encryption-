
function visualizeDoubleTranspositionEncrypt() {
    let text = document.getElementById('double-input').value.replace(/\s+/g, ''); // Remove spaces
    const numRows = parseInt(document.getElementById('double-rows').value);
    const numColumns = parseInt(document.getElementById('double-columns').value);

    if (isNaN(numRows) || isNaN(numColumns) || numRows < 2 || numColumns < 2) {
        alert('يرجى إدخال أعداد صحيحة للصفوف والأعمدة (على الأقل 2).');
        return;
    }

    const matrix = createMatrix1(numRows, numColumns, text);
    createTableVisualization(matrix, 'المصفوفة الأولية');

    const transposedOnce = transposeMatrix(matrix);
    createTableVisualization(transposedOnce, 'بعد التبديل الأول');

    const transposedTwice = transposeMatrix(transposedOnce);
    createTableVisualization(transposedTwice, 'بعد التبديل الثاني');

    const encryptedText = transposedTwice.flat().filter(char => char).join('');
    document.getElementById('double-result').value = encryptedText;
}


function visualizeDoubleTranspositionDecrypt() {
    let encryptedText = document.getElementById('double-input').value.replace(/\s+/g, '');
    const numRows = parseInt(document.getElementById('double-rows').value);
    const numColumns = parseInt(document.getElementById('double-columns').value);

    if (isNaN(numRows) || isNaN(numColumns) || numRows < 2 || numColumns < 2) {
        alert('يرجى إدخال أعداد صحيحة للصفوف والأعمدة (على الأقل 2).');
        return;
    }

    const matrix = createMatrix1(numRows, numColumns, encryptedText);
    createTableVisualization(matrix, 'المصفوفة المشفرة');

    const reversedOnce = transposeMatrix(matrix);
    createTableVisualization(reversedOnce, 'بعد فك التبديل الأول');

    const reversedTwice = transposeMatrix(reversedOnce);
    createTableVisualization(reversedTwice, 'بعد فك التبديل الثاني');

    const decryptedText = reversedTwice.flat().filter(char => char).join('');
    document.getElementById('double-result').value = decryptedText;
}

function createMatrix1(rows, columns, text) {
    const matrix = Array.from({ length: rows }, () => Array(columns).fill(''));
    let index = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (index < text.length) {
                matrix[r][c] = text[index++];
            }
        }
    }
    return matrix;
}

function transposeMatrix(matrix) {
    const rows = matrix.length;
    const columns = matrix[0].length;
    const transposed = Array.from({ length: columns }, () => Array(rows).fill(''));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            transposed[c][r] = matrix[r][c];
        }
    }
    return transposed;
}

function createTableVisualization(matrix, title) {
    const visualContainer = document.getElementById('double-visual-container');
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    visualContainer.appendChild(titleElement);

    const table = document.createElement('table');
    matrix.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell || '';
            td.className = cell ? 'filled-cell' : 'empty-cell';
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    visualContainer.appendChild(table);
}
