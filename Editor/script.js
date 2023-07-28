// Function to show the document selection pop-up
function showDocumentSelectionPopup() {
  const documentSelectionPopup = document.getElementById('documentSelectionPopup');
  documentSelectionPopup.style.display = 'block';

  // Populate the document list from local storage
  const documentList = document.getElementById('documentList');
  documentList.innerHTML = '';
  const documents = getDocumentsFromLocalStorage();
  documents.forEach((document) => {
    const listItem = document.createElement('li');
    listItem.textContent = document.title;
    listItem.addEventListener('click', () => {
      selectDocument(document);
      hideDocumentSelectionPopup();
    });
    documentList.appendChild(listItem);
  });
}

// Function to hide the document selection pop-up
function hideDocumentSelectionPopup() {
  const documentSelectionPopup = document.getElementById('documentSelectionPopup');
  documentSelectionPopup.style.display = 'none';
}

// Function to select a document and populate the editor with its content
function selectDocument(document) {
  const editorTextElement = document.getElementById('editorText');
  editorTextElement.innerHTML = document.content;
}

// Event listener to handle opening the document selection pop-up
const openDocumentButton = document.getElementById('openDocumentButton');
openDocumentButton.addEventListener('click', showDocumentSelectionPopup);

// Event listener to handle closing the document selection pop-up
const closePopupButton = document.getElementById('closePopupButton');
closePopupButton.addEventListener('click', hideDocumentSelectionPopup);
