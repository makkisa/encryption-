// utils.js

// Arabic Alphabet for Encryption
const arabicAlphabet = 'ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىي';
const alphabetLen = arabicAlphabet.length;

// Tab Switching Logic
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';  // Hide all tabs
    });
    document.getElementById(tabName).style.display = 'block';  // Show selected tab
}

// Ensure Shift Tab is visible by default
document.addEventListener('DOMContentLoaded', () => {
    showTab('shift');
});

// Error Handling
function showError(message) {
    const errorDiv = document.getElementById('playfair-error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Validate Arabic Characters
function isValidArabic(text) {
    const arabicRegex = /^[\u0600-\u06FF\s]+$/;
    return arabicRegex.test(text);
}
