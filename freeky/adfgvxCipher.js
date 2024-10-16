// ADFGVX Cipher Variables
const polybiusSquare = [
    ['ء', 'آ', 'أ', 'ؤ', 'إ', 'ئ'],
    ['ا', 'ب', 'ة', 'ت', 'ث', 'ج'],
    ['ح', 'خ', 'د', 'ذ', 'ر', 'ز'],
    ['س', 'ش', 'ص', 'ض', 'ط', 'ظ'],
    ['ع', 'غ', 'ف', 'ق', 'ك', 'ل'],
    ['م', 'ن', 'ه', 'و', 'ي', 'ى']
];
const headers = ['A', 'D', 'F', 'G', 'V', 'X'];

function displayPolybiusSquare() {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th')); // Empty corner

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    polybiusSquare.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        const rowHeader = document.createElement('th');
        rowHeader.textContent = headers[rowIndex];
        tr.appendChild(rowHeader);

        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    document.getElementById('polybius-visual').innerHTML = '';
    document.getElementById('polybius-visual').appendChild(table);
}
function encryptADFGVXHandler() {
    let text = document.getElementById('adfgvx-input').value.trim().replace(/\s+/g, ''); // Remove spaces
    let key = document.getElementById('adfgvx-key').value.trim().toUpperCase();

    if (!key) {
        alert('يرجى إدخال مفتاح صالح.');
        return;
    }

    key = removeDuplicateChars(key); // Ensure no duplicate chars in key

    const coordinates = mapTextToCoordinates(text);
    document.getElementById('coordinates-output').textContent = `Coordinates: ${coordinates}`;

    const ciphertext = transposeAndEncrypt(coordinates, key);
    document.getElementById('adfgvx-result').value = ciphertext;
}

function decryptADFGVXHandler() {
    let text = document.getElementById('adfgvx-input').value.trim().replace(/\s+/g, ''); // Remove spaces
    let key = document.getElementById('adfgvx-key').value.trim().toUpperCase();

    if (!key) {
        alert('يرجى إدخال مفتاح صالح.');
        return;
    }

    key = removeDuplicateChars(key); // Ensure no duplicate chars in key

    const decryptedCoordinates = transposeAndDecrypt(text, key);
    const plaintext = mapCoordinatesToText(decryptedCoordinates);
    document.getElementById('adfgvx-result').value = plaintext;
}



function removeDuplicateChars(str) {
    return [...new Set(str)].join('');
}

function mapTextToCoordinates(text) {
    return text.split('').map(char => findCoordinates(char)).join(' ');
}

function findCoordinates(char) {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 6; col++) {
            if (polybiusSquare[row][col] === char) {
                return headers[row] + headers[col];
            }
        }
    }
    return '??';
}

function transposeAndEncrypt(coordinates, key) {
    const elements = coordinates.split(' ');
    const matrix = createMatrix(elements, key.length);
    const sortedKey = [...key].sort();

    console.log('Original Matrix:', matrix);  // Debug log to confirm matrix structure
    console.log('Sorted Key:', sortedKey);  // Debug the sorted key

    const transposedMatrix = sortedKey.map(k => {
        const colIndex = key.indexOf(k);
        console.log(`Column ${k} (index: ${colIndex})`);  // Track each column being transposed
        return matrix.map(row => row[colIndex] || '-');
    });

    console.log('Transposed Matrix:', transposedMatrix);  // Log final matrix before rendering

    displayTranspositionMatrix(transposedMatrix, sortedKey);
    return transposedMatrix.flat().join('');
}
function displayTranspositionMatrix(matrix, headers) {
    const table = generateMatrixTable(matrix, headers);
    const visualContainer = document.getElementById('transposition-visual');

    if (!visualContainer) {
        console.error('Transposition visual container not found!');
        return;
    }

    visualContainer.innerHTML = '';  // Clear any previous content
    visualContainer.appendChild(table);
    console.log('Transposition Matrix rendered.');  // Log successful rendering
}
function generateMatrixTable(matrix, headers) {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    // Add headers
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Add matrix rows
    matrix[0].forEach((_, rowIndex) => {
        const tr = document.createElement('tr');
        matrix.forEach(col => {
            const td = document.createElement('td');
            td.textContent = col[rowIndex] || '-';
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    console.log('Generated Matrix Table:', table);  // Log the generated table element
    return table;
} 

function transposeAndDecrypt(text, key) {
    const columns = key.length;
    const rows = Math.ceil(text.length / columns);
    const matrix = Array.from({ length: rows }, () => Array(columns).fill(''));

    let index = 0;
    [...key].sort().forEach((k, sortedIndex) => {
        const originalIndex = key.indexOf(k);
        for (let row = 0; row < rows; row++) {
            matrix[row][originalIndex] = text[index++] || '-';
        }
    });

    return matrix.flat().join(' ');
}

function mapCoordinatesToText(coordinates) {
    return coordinates.split(' ').map(coord => {
        const row = headers.indexOf(coord[0]);
        const col = headers.indexOf(coord[1]);
        return polybiusSquare[row][col];
    }).join('');
}

function createMatrix(elements, columns) {
    const rows = Math.ceil(elements.length / columns);
    const matrix = Array.from({ length: rows }, () => Array(columns).fill('-'));

    let index = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (index < elements.length) {
                matrix[r][c] = elements[index++];
            }
        }
    }
    return matrix;
}

// Display Polybius Square on Page Load
document.addEventListener('DOMContentLoaded', () => {
    displayPolybiusSquare();
});
