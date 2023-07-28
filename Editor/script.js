// ... (previous functions remain the same) ...

// Function to clear the text in the editor
function clearText() {
  const editorTextElement = document.getElementById('editorText');
  editorTextElement.innerHTML = '';
}

// Event listener to handle clearing the text in the editor
const clearTextButton = document.getElementById('clearTextButton');
clearTextButton.addEventListener('click', clearText);

// ... (rest of the code remains the same) ...




// Function to save the document to local storage
function saveDocumentToLocalStorage() {
  hideDocumentSelectionPopup();
  const title = prompt('Enter the title for the document:');
  if (title !== null && title.trim() !== '') {
    const editorTextElement = document.getElementById('editorText');
    const content = editorTextElement.innerHTML;
    saveDocument(title, content);
    alert('Document saved successfully!');
  } else {
    alert('Please enter a valid title.');
  }
}

// Function to save the document to local storage
function saveDocument(title, content) {
  const documents = getDocumentsFromLocalStorage();
  documents.push({ title, content });
  localStorage.setItem('documents', JSON.stringify(documents));
}

// Function to get documents from local storage
function getDocumentsFromLocalStorage() {
  const documentsJSON = localStorage.getItem('documents');
  return documentsJSON ? JSON.parse(documentsJSON) : [];
}

// Event listener to handle saving the document
const saveTextButton = document.getElementById('saveTextButton');
saveTextButton.addEventListener('click', saveDocumentToLocalStorage);

// Function to show the document selection pop-up
// ... (previous functions remain the same) ...

// Function to show the document selection pop-up
function showDocumentSelectionPopup() {
  const documentSelectionPopup = document.getElementById('documentSelectionPopup');
  documentSelectionPopup.style.display = 'block';

  // Populate the document list from local storage
  const documentList = document.getElementById('documentList');
  documentList.innerHTML = '';
  const documents = getDocumentsFromLocalStorage();
  documents.forEach((documentItem) => {
    const listItem = document.createElement('li');
    listItem.textContent = documentItem.title;
    listItem.addEventListener('click', () => {
      selectDocumentFromList(documentItem); // Change the function name here
      hideDocumentSelectionPopup();
    });
    documentList.appendChild(listItem);
  });
}

// Function to select a document and populate the editor with its content
function selectDocumentFromList(documentItem) { // Change the parameter name here
  const editorTextElement = document.getElementById('editorText');
  editorTextElement.innerHTML = documentItem.content;
}

// Event listener to handle opening the document selection pop-up
const openDocumentButton = document.getElementById('openDocumentButton');
openDocumentButton.addEventListener('click', showDocumentSelectionPopup);

// Event listener to handle closing the document selection pop-up
const closePopupButton = document.getElementById('closePopupButton');
closePopupButton.addEventListener('click', hideDocumentSelectionPopup);


// Function to hide the document selection pop-up
function hideDocumentSelectionPopup() {
  const documentSelectionPopup = document.getElementById('documentSelectionPopup');
  documentSelectionPopup.style.display = 'none';
}
