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


// Function to show the reader list popup
function showReaderList() {
  const readerListPopup = document.getElementById('readerListPopup');
  readerListPopup.style.display = 'block';

  // Populate the reader list from local storage
  const readerList = document.getElementById('readerList');
  readerList.innerHTML = '';
  const readers = getReadersFromLocalStorage();
  readers.forEach((reader) => {
    const listItem = document.createElement('li');
    listItem.textContent = reader.title;
    listItem.addEventListener('click', () => {
      populateReaderScreen(reader.content);
      hideReaderList();
    });
    readerList.appendChild(listItem);
  });
}

// Function to hide the reader list popup
function hideReaderList() {
  const readerListPopup = document.getElementById('readerListPopup');
  readerListPopup.style.display = 'none';
}

// Function to save a reader story to local storage
function saveReaderToLocalStorage(title, content) {
  const readers = getReadersFromLocalStorage();
  readers.push({ title, content });
  localStorage.setItem('readers', JSON.stringify(readers));
}

// Function to get reader stories from local storage
function getReadersFromLocalStorage() {
  const readersJSON = localStorage.getItem('readers');
  return readersJSON ? JSON.parse(readersJSON) : [];
}

// Function to populate the reader screen with the selected story
function populateReaderScreen(content) {
  const readerTextElement = document.getElementById('readerText');
  readerTextElement.textContent = content;
}