function toggleDropdown(id) {
    document.querySelectorAll('.dropdown').forEach(drop => drop.style.display = 'none');
    let dropdown = document.getElementById('dropdown' + id);
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
}

document.addEventListener('click', function(event) {
    if (!event.target.matches('.button')) {
        document.querySelectorAll('.dropdown').forEach(drop => drop.style.display = 'none');
    }
});

// Text animation code
const container = document.getElementById('text-container');
const text = "床前明月光 / 疑是地上霜 / 举头望明月 / 低头思故乡。(There is moonlight before my bed / Perhaps it is frost on the ground / I lift my head and see the moon / I lower my head and think of my hometown.)";

let currentText = "";
let charIndex = 0;

function calculateCharsPerScreen() {
    // Get container dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Estimate character dimensions (for monospace font)
    const testElement = document.createElement('span');
    testElement.style.visibility = 'hidden';
    testElement.textContent = 'X';
    container.appendChild(testElement);
    const charWidth = testElement.offsetWidth;
    const charHeight = testElement.offsetHeight;
    container.removeChild(testElement);
    
    // Calculate chars per row and total rows
    const charsPerRow = Math.floor(width / charWidth);
    const totalRows = Math.floor(height / charHeight);
    
    return charsPerRow * totalRows;
}

function addNextChar() {
    // Add next character
    currentText += text[charIndex];
    container.textContent = currentText;
    
    // Move to next character in source text, looping if needed
    charIndex = (charIndex + 1) % text.length;
    
    // If we've filled the screen, start removing characters from the beginning
    const maxChars = calculateCharsPerScreen();
    if (currentText.length > maxChars) {
        currentText = currentText.substring(1);
    }
    
    // Schedule next character
    setTimeout(addNextChar, 50); // Adjust speed here (lower = faster)
}

// Start the animation when the page loads
window.addEventListener('load', function() {
    addNextChar();
});