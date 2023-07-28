// Define isAudioEnabled and other necessary variables
var isAudioEnabled = true;
var blinkInterval;
var utterance = new SpeechSynthesisUtterance();
var isSpeaking = false;

/*

#1 can you make the chunk size dynamic let it read a paragraph then get another chunk.
 #2 want to highlight what is being read. 
#3 add a start pause and stop button.
#4 i want the user to be able to click a word and start at that point also.

use your logic to make this work like a mainstream reader and even better.

*/



var currentWordIndex = 0; // Keep track of the current word being read
var isReadingPaused = false; // Track if the reading is paused
var isReadingStopped = false; // Track if the reading is stopped

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
      let textToRead = replacedQuestion2.replace(blankPattern2, '');

      // Split the text into chunks
      var chunkSize = 200; // Adjust the chunk size as needed
      var chunks = [];
      var words = textToRead.split(' ');

      for (var i = 0; i < words.length; i += chunkSize) {
        var chunk = words.slice(i, i + chunkSize).join(' ');
        chunks.push(chunk);
      }

      // Function to speak the chunks sequentially
      function speakChunks(index) {
        if (isReadingStopped) {
          // If reading is stopped, return and reset the state
          isReadingStopped = false;
          currentWordIndex = 0;
          isSpeaking = false;
          return;
        }

        if (index < chunks.length) {
          utterance.text = chunks[index];
          synthesis.speak(utterance);
          utterance.onstart = function () {
            isReadingPaused = false;
            isSpeaking = true;
            highlightWord(index); // Highlight the current word being read
          };
          utterance.onend = function () {
            if (!isReadingPaused) {
              speakChunks(index + 1);
            }
          };
        } else {
          // If reading is completed, reset the state
          currentWordIndex = 0;
          isSpeaking = false;
          stopBlinking();
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
        stopBlinking();
      };
      startBlinking();

      // Start speaking
      isReadingPaused = false;
      speakChunks(currentWordIndex);
    } else {
      console.log('Text-to-speech is not supported in this browser.');
    }
  }
}



// Function to highlight the current word being read
function highlightWord(index) {
  const readerTextElement = document.getElementById('readerText');
  const words = readerTextElement.textContent.split(' ');
  const currentWord = words[index];
  readerTextElement.innerHTML = words
    .map((word, i) =>
      i === index
        ? `<span class="highlighted-word">${word}</span>`
        : `<span>${word}</span>`
    )
    .join(' ');
}

// Function to pause the reading
function pauseReading() {
  if (isSpeaking) {
    isReadingPaused = true;
    stopSpeaking();
  }
}

// Function to stop the reading
function stopReading() {
  if (isSpeaking) {
    isReadingStopped = true;
    stopSpeaking();
  }
}

// Function to stop the ongoing speech
function stopSpeaking() {
  if ('speechSynthesis' in window) {
    const synthesis = window.speechSynthesis;
    synthesis.cancel();
  }
  isSpeaking = false;
  document.getElementById('readButton').innerHTML =
    "<div>🔈</div><span>Read</span>";
  stopBlinking();

  if (isReadingStopped) {
    // Clear the saved current reader spot
    clearCurrentReaderSpot();
  }
}

// Function to clear the saved current reader spot
function clearCurrentReaderSpot() {
  // Your implementation goes here...
}

// Event listener for start/pause button
const readButton = document.getElementById('audioButton');
readButton.addEventListener('click', () => {
  const readerTextElement = document.getElementById('readerText');
  const content = readerTextElement.textContent;

  // Reset reading status
  isReadingPaused = false;
  isReadingStopped = false;

  // Start or pause reading based on current status
  if (isSpeaking) {
    if (isReadingPaused) {
      // Continue reading from the current spot
      startBlinking();
      isSpeaking = true;
      isReadingPaused = false;
    } else {
      // Pause the reading
      pauseReading();
    }
  } else {
    // Start reading from the beginning
    readTextWithBlinking(content);
  }
});


// Event listener for pause button
const pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', pauseReading);

// Event listener for stop button
const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', stopReading);






// Function to show the popover
function showOptionsPopover() {
  const popover = document.getElementById('optionPopover');
  popover.style.display = 'block';
}

// Function to hide the popover
function hideOptionsPopover() {
  const popover = document.getElementById('optionPopover');
  popover.style.display = 'none';
}

// Event listener to show the popover when the button is clicked
const readerButton = document.getElementById('optionsButton');
readerButton.addEventListener('click', () => {
  showOptionsPopover();
});

// Event listener to hide the popover when the reader text is clicked
const readerTextElement = document.getElementById('optionsButton');
readerTextElement.addEventListener('click', () => {
  hideOptionsPopover();
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
      populateReaderScreen(reader.content,reader.title);
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




// Function to get documents from local storage
function getDocumentsFromLocalStorage() {
  console.log("getDocumentsFromLocalStorage() called");
  const documentsJSON = localStorage.getItem('documents');
  const documents = documentsJSON ? JSON.parse(documentsJSON) : [];
  console.log("Documents retrieved from local storage:", documents);
  return documents;
}

// Function to populate the reader screen with the selected story
function populateReaderScreen(content, title) {  
  //console.log("populateReaderScreen() called with content:", content);
  const readerTextElement = document.getElementById('readerText');
  readerTextElement.innerHTML = content;
    const mainTitleElement = document.getElementById('mainTitle');
  mainTitleElement.innerHTML = title;

  
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




const blinkDiv = document.getElementById('audioButton');

// Function to start the blinking effect
function startBlinking() {
  blinkInterval = setInterval(function () {
    blinkDiv.classList.toggle('blink');
  }, 500);
}

// Function to stop the blinking effect
function stopBlinking() {
  clearInterval(blinkInterval);
  blinkDiv.classList.remove('blink');
}

// Function to toggle audio
function toggleAudio() {
  isAudioEnabled = !isAudioEnabled;
  updateAudioButton();
}

// Function to update the audio button text
function updateAudioButton() {
  audioButton.textContent = ` ${isAudioEnabled ? 'On' : 'Off'}`;
}

// Load audio settings from local storage
function loadAudioSettings() {
  const settings = getSettings();
  isAudioEnabled = settings.audioEnabled !== undefined ? settings.audioEnabled : true;
  updateAudioButton();
}

// Event listener for the audio button
audioButton.addEventListener('click', toggleAudio);
loadAudioSettings();

// Function to get the matching voice
function getMatchingVoice(voiceName) {
  if ('speechSynthesis' in window) {
    var synthesis = window.speechSynthesis;
    var voices = synthesis.getVoices();
    var matchedVoice = voices.find(function (voice) {
      return voice.name === voiceName;
    });
    return matchedVoice;
  } else {
    console.log('Text-to-speech is not supported in this browser.');
    return null;
  }
}

// Function to get the user's operating system
function getUserOperatingSystem() {
  const userAgentString = navigator.userAgent;

  if (userAgentString.includes('Windows')) {
    return 'Windows';
  } else if (userAgentString.includes('Macintosh')) {
    return 'Mac';
  } else if (userAgentString.includes('Linux')) {
    return 'Linux';
  } else if (userAgentString.includes('Android')) {
    return 'Android';
  } else if (userAgentString.includes('iOS')) {
    return 'iOS';
  } else {
    return 'Unknown';
  }
}

// Function to populate the voice dropdown
function populateVoiceDropdown() {
  var voiceDropdown = document.getElementById('voiceDropdown');

  // Wait for the 'voiceschanged' event
  speechSynthesis.addEventListener('voiceschanged', function () {
    var voices = speechSynthesis.getVoices();

    voices.forEach(function (voice) {
      var option = document.createElement('option');
      option.value = voice.voiceURI;
      option.textContent = voice.name;
      voiceDropdown.appendChild(option);
    });
  });
}

// Function to save voice settings to local storage
function saveVoiceSettings() {
  var rateSlider = document.getElementById('rateSlider');
  var voiceDropdown = document.getElementById('voiceDropdown');

  var voiceSettings = {
    rate: parseFloat(rateSlider.value),
    voice: voiceDropdown.value,
  };
  saveSettings('voiceSettings', voiceSettings);
}

// Function to load voice settings from local storage
function loadVoiceSettings() {
  var voiceSettings = JSON.parse(localStorage.getItem('voiceSettings'));
  if (voiceSettings) {
    var rateSlider = document.getElementById('rateSlider');
    var voiceDropdown = document.getElementById('voiceDropdown');

    rateSlider.value = voiceSettings.rate;
    voiceDropdown.value = voiceSettings.voice;
  }
}




