function visualizeRailFenceEncrypt() {
    let text = document.getElementById('rail-input').value.replace(/\s+/g, ''); // Remove spaces
    const numRails = parseInt(document.getElementById('rail-key').value);

    if (isNaN(numRails) || numRails < 2) {
        alert('يرجى إدخال عدد صحيح للقضبان (على الأقل 2).');
        return;
    }

    const visualContainer = document.getElementById('visual-container');
    visualContainer.innerHTML = ''; // Clear previous visualization

    const railMatrix = Array.from({ length: numRails }, () => Array(text.length).fill(''));
    let directionDown = false;
    let row = 0;

    // Fill the matrix with characters in zigzag pattern
    for (let col = 0; col < text.length; col++) {
        railMatrix[row][col] = text[col];
        directionDown = (row === 0 || row === numRails - 1) ? !directionDown : directionDown;
        row += directionDown ? 1 : -1;
    }

    createRailFenceTable(railMatrix);

    // Generate encrypted text
    const encryptedText = railMatrix.flat().filter(char => char).join('');
    document.getElementById('rail-result').value = encryptedText;
}


function visualizeRailFenceDecrypt() {
    let encryptedText = document.getElementById('rail-input').value.replace(/\s+/g, '');
    const numRails = parseInt(document.getElementById('rail-key').value);

    if (isNaN(numRails) || numRails < 2) {
        alert('يرجى إدخال عدد صحيح للقضبان (على الأقل 2).');
        return;
    }

    const visualContainer = document.getElementById('visual-container');
    visualContainer.innerHTML = ''; // Clear previous visualization

    const railMatrix = Array.from({ length: numRails }, () => Array(encryptedText.length).fill(''));
    let directionDown = false;
    let row = 0;

    // Determine the zigzag positions for decryption
    for (let col = 0; col < encryptedText.length; col++) {
        railMatrix[row][col] = '*'; // Placeholder to mark zigzag positions
        directionDown = (row === 0 || row === numRails - 1) ? !directionDown : directionDown;
        row += directionDown ? 1 : -1;
    }

    // Fill the matrix with the encrypted text in zigzag order
    let index = 0;
    for (let r = 0; r < numRails; r++) {
        for (let c = 0; c < encryptedText.length; c++) {
            if (railMatrix[r][c] === '*' && index < encryptedText.length) {
                railMatrix[r][c] = encryptedText[index++];
            }
        }
    }

    createRailFenceTable(railMatrix);

    // Read the decrypted text in zigzag order
    let decryptedText = '';
    row = 0;
    directionDown = false;
    for (let col = 0; col < encryptedText.length; col++) {
        decryptedText += railMatrix[row][col];
        directionDown = (row === 0 || row === numRails - 1) ? !directionDown : directionDown;
        row += directionDown ? 1 : -1;
    }

    document.getElementById('rail-result').value = decryptedText;
}

// Helper function to create the rail fence table
function createRailFenceTable(railMatrix) {
    const visualContainer = document.getElementById('visual-container');
    const table = document.createElement('table');
    railMatrix.forEach(railRow => {
        const tr = document.createElement('tr');
        railRow.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell || ''; // Display empty cells clearly
            td.className = cell ? 'filled-cell' : 'empty-cell';
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    visualContainer.appendChild(table);
}


