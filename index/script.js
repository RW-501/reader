// Function to read the text
function readTextFunc(text) {
  // Your existing readTextFunc implementation goes here
  // ... (existing code)

  // Use the updated text and call the function to read it
  readTextWithBlinking(text);
}

// Function to read the text with blinking effect
function readTextWithBlinking(text) {
  if (isAudioEnabled === true) {
    if (isSpeaking) {
      // Stop the ongoing speech
      stopSpeaking();
      return;
    }

    if ('speechSynthesis' in window) {
      var synthesis = window.speechSynthesis;

      let blankPattern = /_{1,}/; // Pattern for one or more underscores
      let replacedQuestion2 = text.replace(blankPattern, ' blank ');

      let blankPattern2 = 'True or False:'; // Pattern for one or more underscores
      let replacedQuestion = replacedQuestion2.replace(blankPattern2, '');

      // Split the text into chunks
      var chunkSize = 200; // Adjust the chunk size as needed
      var chunks = [];
      var words = replacedQuestion.split(' ');

      for (var i = 0; i < words.length; i += chunkSize) {
        var chunk = words.slice(i, i + chunkSize).join(' ');
        chunks.push(chunk);
      }

      // Function to speak the chunks sequentially
      function speakChunks(index) {
        if (index < chunks.length) {
          utterance.text = chunks[index];
          synthesis.speak(utterance);
          utterance.onend = function () {
            speakChunks(index + 1);
          };
        }
      }

      // Load voice settings from local storage
      var voiceSettings = JSON.parse(localStorage.getItem('voiceSettings'));
      if (voiceSettings) {
        var voice = getMatchingVoice(voiceSettings.voice);
        if (voice) {
          utterance.voice = voice;
        }
        utterance.rate = voiceSettings.rate;
      }

      // Event listener for the end of speech
      utterance.onend = function () {
        isSpeaking = false;
        document.getElementById('readButton').innerHTML =
          "<div>🔈</div><span>Read</span>";
        stopBlinking();
      };
      startBlinking();

      // Start speaking
      document.getElementById('readButton').innerHTML =
        "<div>🔈</div><span>Reading</span>";
      isSpeaking = true;
      speakChunks(0);
    } else {
      console.log('Text-to-speech is not supported in this browser.');
    }
  }
}






// Example function to update the reader text content
function updateReaderText(text) {
  const readerTextElement = document.getElementById('readerText');
  readerTextElement.textContent = text;
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
  const readers = getDocumentsFromLocalStorage(); // Use the getDocumentsFromLocalStorage function to get documents
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
// Function to save a reader story as a document to local storage
function saveReaderToLocalStorage(title, content) {
  const documents = getDocumentsFromLocalStorage();
  documents.push({ title, content });
  localStorage.setItem('documents', JSON.stringify(documents));
}



// Function to get documents from local storage
function getDocumentsFromLocalStorage() {
  console.log("getDocumentsFromLocalStorage() called");
  const documentsJSON = localStorage.getItem('documents');
  const documents = documentsJSON ? JSON.parse(documentsJSON) : [];
  console.log("Documents retrieved from local storage:", documents);
  return documents;
}

// Function to populate the reader screen with the selected story
function populateReaderScreen(content) {
  console.log("populateReaderScreen() called with content:", content);
  const readerTextElement = document.getElementById('readerText');
  readerTextElement.textContent = content;
}







// ... (existing JavaScript code) ...

// Function to show the options popup
function showOptionsPopup() {
  const optionsPopup = document.getElementById('optionsPopup');
  optionsPopup.style.display = 'block';

  // Load voice settings from local storage
  loadVoiceSettings();
  populateVoiceDropdown();
}

// Function to hide the options popup
function hideOptionsPopup() {
  const optionsPopup = document.getElementById('optionsPopup');
  optionsPopup.style.display = 'none';
}

// Function to start the blinking effect
function startBlinking() {
  blinkInterval = setInterval(function() {
    blinkDiv.classList.toggle('blink');
  }, 500);
}

// Function to stop the blinking effect
function stopBlinking() {
  clearInterval(blinkInterval);
  blinkDiv.classList.remove('blink');
}

// Event listener for the read button to show the options popup
var blinkDiv = document.getElementById('readButton');
var blinkInterval;

blinkDiv.addEventListener('click', function() {
  showOptionsPopup();
  startBlinking();
});

// ... (existing JavaScript code) ...





