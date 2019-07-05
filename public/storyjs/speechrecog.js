try {
  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
} catch (e) {
  console.error(e);
  alert("Error: Check browser support for Speech Recognition");
}
recognition.onstart = function() {};

recognition.onspeechend = function() {};

recognition.onerror = function(event) {
  if (event.error == "no-speech") {
  }
};

recognition.onresult = function(event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  $(".type-story").val(currentStory + " " + transcript);
  $(".story-load-actions .narrate").removeClass("listening");
};
