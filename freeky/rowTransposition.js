
function visualizeRowTranspositionEncrypt() {
    let text = document.getElementById('row-input').value.replace(/\s+/g, ''); // Remove spaces
    const numColumns = parseInt(document.getElementById('row-key').value);

    if (isNaN(numColumns) || numColumns < 2) {
        alert('يرجى إدخال عدد صحيح للأعمدة (على الأقل 2).');
        return;
    }

    const numRows = Math.ceil(text.length / numColumns);
    const matrix = Array.from({ length: numRows }, () => Array(numColumns).fill(''));

    // Fill the matrix row by row
    let index = 0;
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numColumns; c++) {
            if (index < text.length) {
                matrix[r][c] = text[index++];
            }
        }
    }

    createRowTranspositionTable(matrix);

    // Read columns to generate encrypted text
    let encryptedText = '';
    for (let c = 0; c < numColumns; c++) {
        for (let r = 0; r < numRows; r++) {
            if (matrix[r][c]) {
                encryptedText += matrix[r][c];
            }
        }
    }

    document.getElementById('row-result').value = encryptedText;
}


function visualizeRowTranspositionDecrypt() {
    let encryptedText = document.getElementById('row-input').value.replace(/\s+/g, '');
    const numColumns = parseInt(document.getElementById('row-key').value);

    if (isNaN(numColumns) || numColumns < 2) {
        alert('يرجى إدخال عدد صحيح للأعمدة (على الأقل 2).');
        return;
    }

    const numRows = Math.ceil(encryptedText.length / numColumns);
    const matrix = Array.from({ length: numRows }, () => Array(numColumns).fill(''));

    // Fill the matrix column by column
    let index = 0;
    for (let c = 0; c < numColumns; c++) {
        for (let r = 0; r < numRows; r++) {
            if (index < encryptedText.length) {
                matrix[r][c] = encryptedText[index++];
            }
        }
    }

    createRowTranspositionTable(matrix);

    // Read rows to generate decrypted text
    let decryptedText = '';
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numColumns; c++) {
            if (matrix[r][c]) {
                decryptedText += matrix[r][c];
            }
        }
    }

    document.getElementById('row-result').value = decryptedText;
}


// Helper to create the transposition table
function createRowTranspositionTable(matrix) {
    const visualContainer = document.getElementById('row-visual-container');
    visualContainer.innerHTML = ''; // Clear previous visualization

    const table = document.createElement('table');
    matrix.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell || ''; // Display empty cells clearly
            td.className = cell ? 'filled-cell' : 'empty-cell';
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    visualContainer.appendChild(table);
}
