// Function to save the document to local storage
function saveDocumentToLocalStorage() {
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
