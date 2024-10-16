// Shift Cipher Functions
// Ensure Shift Tab is visible by default
document.addEventListener('DOMContentLoaded', () => {
    showTab('shift');
});

const arabicAlphabet = 'ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىي';
const alphabetLen = arabicAlphabet.length;
function encryptShift() {
    const text = document.getElementById('shift-input').value;
    const key = parseInt(document.getElementById('shift-key').value);
    if (isNaN(key)) {
        alert('يرجى إدخال مفتاح صالح (رقم).');
        return;
    }
    document.getElementById('shift-result').value = shiftCipherEncrypt(text, key);
}

function decryptShift() {
    const text = document.getElementById('shift-input').value;
    const key = parseInt(document.getElementById('shift-key').value);
    if (isNaN(key)) {
        alert('يرجى إدخال مفتاح صالح (رقم).');
        return;
    }
    document.getElementById('shift-result').value = shiftCipherDecrypt(text, key);
}

function shiftCipherEncrypt(text, key) {
    return [...text].map(char => {
        const idx = arabicAlphabet.indexOf(char);
        return idx !== -1 ? arabicAlphabet[(idx + key) % alphabetLen] : char;
    }).join('');
}
document.getElementById('shift-transform-button').addEventListener('click', showShiftTransformations);


function shiftCipherDecrypt(text, key) {
    return [...text].map(char => {
        const idx = arabicAlphabet.indexOf(char);
        return idx !== -1 ? arabicAlphabet[(idx - key + alphabetLen) % alphabetLen] : char;
    }).join('');
}

function showShiftTransformations() {
    const text = document.getElementById('shift-input').value;
    const key = parseInt(document.getElementById('shift-key').value);

    if (isNaN(key) || key < 1) {
        alert('يرجى إدخال مفتاح صالح (رقم أكبر من 0).');
        return;
    }

    const container = document.getElementById('shift-transformations-container');
    container.innerHTML = ''; // Clear previous transformations

    // Generate and display shifts from 1 to the entered key
    
    for (let i = 1; i <= key%36; i++) {
        const shiftedText = shiftCipherEncrypt(text, i);
        const row = document.createElement('div');
        row.classList.add('vector-row');

        row.innerHTML = `<span class="shift-label">Shift ${i}:</span> 
                         <span class="shifted-text">${shiftedText}</span>`;

        container.appendChild(row);
    }
}