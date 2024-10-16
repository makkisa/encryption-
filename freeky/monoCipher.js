const arabicAlphabet = 'ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىي';
const alphabetLen = arabicAlphabet.length;

function generateAndShowMonoKey() {
    const key = [...arabicAlphabet].sort(() => Math.random() - 0.5).join('');
    document.getElementById('mono-key').value = key;
    showMonoKeyMapping(key); // Display the key mapping visually
}

// Display two horizontal rows: one for the plain alphabet and one for the key
function showMonoKeyMapping(key) {
    const mappingContainer = document.getElementById('mono-mapping-container');
    mappingContainer.innerHTML = ''; // Clear previous mappings

    // Create two rows: one for the alphabet, one for the key
    const alphabetRow = document.createElement('div');
    const keyRow = document.createElement('div');

    alphabetRow.classList.add('vector-row');
    keyRow.classList.add('vector-row');

    // Populate the rows with letters
    arabicAlphabet.split('').forEach((char, index) => {
        const alphabetCell = document.createElement('span');
        alphabetCell.classList.add('cell');
        alphabetCell.textContent = char;

        const keyCell = document.createElement('span');
        keyCell.classList.add('cell');
        keyCell.textContent = key[index];

        alphabetRow.appendChild(alphabetCell);
        keyRow.appendChild(keyCell);
    });

    // Append both rows to the container
    mappingContainer.appendChild(alphabetRow);
    mappingContainer.appendChild(keyRow);
}


// Monoalphabetic encryption logic
function encryptMono() {
    const text = document.getElementById('mono-input').value;
    const key = document.getElementById('mono-key').value;

    if (!key) {
        alert('يرجى إدخال مفتاح أو توليد واحد.');
        return;
    }

    document.getElementById('mono-result').value = monoalphabeticCipherEncrypt(text, key);
}


// Monoalphabetic decryption logic
function decryptMono() {
    const text = document.getElementById('mono-input').value;
    const key = document.getElementById('mono-key').value;

    if (!key) {
        alert('يرجى إدخال مفتاح أو توليد واحد.');
        return;
    }

    document.getElementById('mono-result').value = monoalphabeticCipherDecrypt(text, key);
}

// Monoalphabetic encryption function
function monoalphabeticCipherEncrypt(text, key) {
    return [...text].map(char => key[arabicAlphabet.indexOf(char)] || char).join('');
}

// Monoalphabetic decryption function
function monoalphabeticCipherDecrypt(text, key) {
    return [...text].map(char => arabicAlphabet[key.indexOf(char)] || char).join('');
}
