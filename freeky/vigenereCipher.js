function encryptVigenere() {
    const text = document.getElementById('vigenere-input').value;
    const key = document.getElementById('vigenere-key').value;
    const alignedKey = alignKeyWithText(key, text);
    const encryptedText = vigenereCipherEncrypt(text, alignedKey);
    document.getElementById('vigenere-result').value = encryptedText;
    visualizeVigenere(text, alignedKey, encryptedText);
}

function decryptVigenere() {
    const text = document.getElementById('vigenere-input').value;
    const key = document.getElementById('vigenere-key').value;
    const alignedKey = alignKeyWithText(key, text);
    const decryptedText = vigenereCipherDecrypt(text, alignedKey);
    document.getElementById('vigenere-result').value = decryptedText;
    visualizeVigenere(text, alignedKey, decryptedText);
}
function vigenereCipherEncrypt(text, key) {
    return [...text].map((char, i) => {
        const charIndex = arabicAlphabet.indexOf(char);
        const keyIndex = arabicAlphabet.indexOf(key[i]);
        if (charIndex === -1) return char; // Skip non-Arabic characters
        return arabicAlphabet[(charIndex + keyIndex) % alphabetLen];
    }).join('');
}
// Visualization of the Vigenère Cipher Steps
function visualizeVigenere(text, alignedKey, result) {
    const container = document.getElementById('diagram-container');
    container.innerHTML = ''; // Clear previous visualization

    // Create labeled arrays
    const inputArray = createLabeledArray(text, 'input-box', 'Plain Text');
    const keyArray = createLabeledArray(alignedKey, 'key-box', 'Key');
    const resultArray = createLabeledArray(result, 'result-box', 'Cipher Text');

    // Append arrays and arrows to the container
    container.appendChild(inputArray);
    createArrows(container, text.length); // Add arrows between elements
    container.appendChild(keyArray);
    container.appendChild(resultArray);
}

// Vigenère Decryption Logic
function vigenereCipherDecrypt(text, key) {
    return [...text].map((char, i) => {
        const charIndex = arabicAlphabet.indexOf(char);
        const keyIndex = arabicAlphabet.indexOf(key[i]);
        if (charIndex === -1) return char; // Skip non-Arabic characters
        return arabicAlphabet[(charIndex - keyIndex + alphabetLen) % alphabetLen];
    }).join('');
}
// Align the Key with the Input Text
function alignKeyWithText(key, text) {
    let alignedKey = '';
    for (let i = 0; i < text.length; i++) {
        alignedKey += key[i % key.length];
    }
    return alignedKey;
}


function showVigenereMapping(text, key, result) {
    const container = document.getElementById('vigenere-visual');
    container.innerHTML = ''; // Clear previous visualizations

    // Create rows for input text, key, and result
    const textRow = createRow('Input', text);
    const keyRow = createRow('Key', alignKeyWithText(key, text));
    const resultRow = createRow('Result', result);

    // Append all rows to the container
    container.appendChild(textRow);
    container.appendChild(keyRow);
    container.appendChild(resultRow);
}
// Helper to create a row for visualization
function createRow(label, content) {
    const row = document.createElement('div');
    row.classList.add('vector-row');
    row.innerHTML = `<span class="shift-label">${label}:</span> 
                     <span class="shifted-text">${content}</span>`;
    return row;
}

// Create Arrows between Elements
function createArrows(container, length) {
    const arrowContainer = document.createElement('div');
    arrowContainer.classList.add('array');
    for (let i = 0; i < length; i++) {
        const arrow = document.createElement('div');
        arrow.classList.add('arrow');
        arrowContainer.appendChild(arrow);
    }
    container.appendChild(arrowContainer);
}


// Helper to Create Labeled Array
function createLabeledArray(text, className, label) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('labeled-array');

    const array = createArray(text, className); // Create the array with boxes

    // Add the label above the array
    const labelElement = document.createElement('div');
    labelElement.classList.add('array-label');
    labelElement.textContent = label;

    // Append label and array to the wrapper
    wrapper.appendChild(labelElement);
    wrapper.appendChild(array);

    return wrapper;
}


// Create an Array of Boxes
function createArray(text, className) {
    const array = document.createElement('div');
    array.classList.add('array');
    for (const char of text) {
        const box = document.createElement('div');
        box.classList.add('box', className);
        box.textContent = char;
        array.appendChild(box);
    }
    return array;
}