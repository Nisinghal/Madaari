try {
  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
} catch (e) {
  console.error(e);
  alert("Error: Check browser support for Speech Recognition");
}

var speechRecog = true;
var speechInterval = true;

recognition.onstart = function() {
  $(".listening-active span").text("Listening");
  $(".listening-active .circle").css("display", "block");
  speechRecog = true;
};

recognition.onspeechend = function() {
  $(".listening-active span").text("Not Listening");
  $(".listening-active .circle").css("display", "none");
  speechRecog = false;
};

recognition.onerror = function(event) {
  if (event.error == "no-speech") {
    $(".listening-active span").text("No Speech");
    $(".listening-active .circle").css("display", "none");
    speechRecog = false;
  }
};

recognition.onresult = function(event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  console.log(transcript);
  let actionInd = checkForEvent(readCues, transcript, theExpression);
  if (actionInd > -1) {
    triggerAction(readActions[actionInd]);
  }
  speechRecog = false;
};

var checkSpeechAtInterval;

checkSpeechAtInterval = setInterval(function() {
  if (!speechRecog) {
    recognition.start();
  }
}, 1000);

$(document).ready(function() {
  $(".listening-active").click(function() {
    if (speechInterval) {
      speechInterval = false;
      $(".listening-active span").html(
        '<i class="fas fa-microphone"></i> Listen'
      );
      $(".listening-active .circle").css("display", "none");
      clearInterval(checkSpeechAtInterval);
      setTimeout(function() {
        speechRecog = false;
        recognition.stop();
      }, 1000);
    } else {
      speechInterval = true;
      $(".listening-active span").text("Listening");
      $(".listening-active .circle").css("display", "block");
      checkSpeechAtInterval = setInterval(function() {
        if (!speechRecog) {
          recognition.start();
        }
      }, 1000);
    }
  });
});
