// Your existing JavaScript code goes here
// ...

// Example function to update the reader text content
function updateReaderText(text) {
  const readerTextElement = document.getElementById('readerText');
  readerTextElement.textContent = text;
}

// Function to read the text
function readTextFunc(text) {
  // Your existing readTextFunc implementation goes here
  // ...

  // Use the updated text and call the function to read it
  readTextFunc(text);
}

// Function to show the popover
function showPopover() {
  const popover = document.getElementById('optionPopover');
  popover.style.display = 'block';
}

// Function to hide the popover
function hidePopover() {
  const popover = document.getElementById('optionPopover');
  popover.style.display = 'none';
}

// Event listener to show the popover when the button is clicked
const readerButton = document.getElementById('readButton');
readerButton.addEventListener('click', () => {
  showPopover();
});

// Event listener to hide the popover when the reader text is clicked
const readerTextElement = document.getElementById('readerText');
readerTextElement.addEventListener('click', () => {
  hidePopover();
});

// Additional event listeners and functionality can be added based on your requirements
