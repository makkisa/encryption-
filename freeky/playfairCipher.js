// Encrypt Playfair Cipher
function encryptPlayfair() {
    const text = preprocessText(document.getElementById('playfair-input').value);
    const key = document.getElementById('playfair-key').value;

    if (!validateKey(key) || !text) return;

    const matrix = generatePlayfairMatrix(key);
    const result = processPlayfair(text, matrix, 'encrypt');
    document.getElementById('playfair-result').value = result;
}

// Decrypt Playfair Cipher
function decryptPlayfair() {
    const text = preprocessText(document.getElementById('playfair-input').value);
    const key = document.getElementById('playfair-key').value;

    if (!validateKey(key) || !text) return;

    const matrix = generatePlayfairMatrix(key);
    const result = processPlayfair(text, matrix, 'decrypt');
    document.getElementById('playfair-result').value = result;
}
function generatePlayfairMatrix(key) {
    key = [...new Set(key)].join(''); // Remove duplicate characters from key
    const matrixChars = key + [...arabicAlphabet].filter(char => !key.includes(char)).join('');

    // Create the 6x6 matrix
    return Array.from({ length: 6 }, (_, i) => matrixChars.slice(i * 6, i * 6 + 6).split(''));
}


function showMatrix(matrix, highlight = []) {
    let html = '<table class="playfair-matrix">';
    for (let row = 0; row < 6; row++) {
        html += '<tr>';
        for (let col = 0; col < 6; col++) {
            const char = matrix[row][col];
            const isHighlighted = highlight.some(([r, c]) => r === row && c === col);
            html += `<td class="${isHighlighted ? 'highlight' : ''}">${char}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';

    document.getElementById('playfair-steps').innerHTML += html;
}


function processPlayfair(text, matrix, mode) {
    let result = '';
    const stepsContainer = document.getElementById('playfair-steps');
    stepsContainer.innerHTML = ''; // Clear previous steps

    for (let i = 0; i < text.length; i += 2) {
        const [a, b] = [text[i], text[i + 1]];
        const [rowA, colA] = findPosition(matrix, a);
        const [rowB, colB] = findPosition(matrix, b);

        // Display the current matrix with highlights for the current pair
        showMatrix(matrix, [[rowA, colA], [rowB, colB]]);

        // Log the current step
        let stepHtml = `<p>زوج الحروف: <strong>(${a}, ${b})</strong></p>`;
        if (rowA === rowB) {
            const newA = matrix[rowA][(colA + (mode === 'encrypt' ? 1 : -1) + 6) % 6];
            const newB = matrix[rowB][(colB + (mode === 'encrypt' ? 1 : -1) + 6) % 6];
            result += newA + newB;
            stepHtml += `<p>نفس الصف: ${a} → ${newA}, ${b} → ${newB}</p>`;
        } else if (colA === colB) {
            const newA = matrix[(rowA + (mode === 'encrypt' ? 1 : -1) + 6) % 6][colA];
            const newB = matrix[(rowB + (mode === 'encrypt' ? 1 : -1) + 6) % 6][colB];
            result += newA + newB;
            stepHtml += `<p>نفس العمود: ${a} → ${newA}, ${b} → ${newB}</p>`;
        } else {
            const newA = matrix[rowA][colB];
            const newB = matrix[rowB][colA];
            result += newA + newB;
            stepHtml += `<p>تبادل المستطيل: ${a}, ${b} → ${newA}, ${newB}</p>`;
        }

        stepsContainer.innerHTML += stepHtml;
    }

    return result;
}

// Validate the key input
function validateKey(key) {
    if (!key) {
        showError('يرجى إدخال مفتاح.');
        return false;
    }

    if (key.length < 5 || key.length > 36) {
        showError('يجب أن يكون طول المفتاح بين 5 و 36 حرفًا.');
        return false;
    }

    if (!isValidArabic(key)) {
        showError('المفتاح يحتوي على أحرف غير عربية.');
        return false;
    }

    return true;
}


// Find a character's position in the matrix
function findPosition(matrix, char) {
    for (let row = 0; row < 6; row++) {
        const col = matrix[row].indexOf(char);
        if (col !== -1) return [row, col];
    }
    return [-1, -1]; // Return safe default
}

// Preprocess the input text: Remove spaces and ensure even length
function preprocessText(text) {
    if (!text) {
        showError('يرجى إدخال نص.');
        return '';
    }

    if (!isValidArabic(text)) {
        showError('النص يحتوي على أحرف غير عربية أو رموز غير مسموح بها.');
        return '';
    }

    text = text.replace(/\s+/g, ''); // Remove spaces
    let processed = '';
    let errors = [];

    // Detect and handle consecutive duplicate characters
    for (let i = 0; i < text.length; i++) {
        processed += text[i];
        if (text[i] === text[i + 1]) {
            processed += 'ا'; // Insert filler character
            errors.push(`تم إدخال حرف مكرر عند الموضع ${i + 1}: '${text[i]}'`);
        }
    }

    // Check if the length is odd and add a filler if necessary
    if (processed.length % 2 !== 0) {
        processed += 'ا'; // Add filler
        errors.push('تمت إضافة حرف تكميلي في نهاية النص لجعله زوجي الطول.');
    }

    if (errors.length > 0) {
        showError(errors.join(' | '));
    }

    return processed;
}

