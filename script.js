const themeToggle = document.getElementById('themeToggle');
const result = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Kalkulator logic
let currentInput = '';
let isOperatorUsed = false;

function appendValue(value) {
  if (value === 'C') {
    currentInput = '';
    result.value = '';
  } else if (value === '=') {
    try {
      currentInput = eval(currentInput).toString();
      result.value = currentInput;
    } catch {
      result.value = 'Error';
      currentInput = '';
    }
  } else {
    if (['+', '-', '*', '/'].includes(value) && isOperatorUsed) return;
    isOperatorUsed = ['+', '-', '*', '/'].includes(value);
    currentInput += value;
    result.value = currentInput;
  }
}

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-key');
    appendValue(value);
  });
});

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  const validKeys = '0123456789+-*/.=C';
  if (validKeys.includes(e.key)) {
    appendValue(e.key === 'Enter' ? '=' : e.key);
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    result.value = currentInput;
  }
});

// Default theme
document.body.classList.add('light');