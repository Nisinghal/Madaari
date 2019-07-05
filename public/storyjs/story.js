var currentStory = "";

$(document).ready(function() {
  //$(".type-story").focus();
  $(".story-load-actions .narrate").click(function() {
    currentStory = $(".type-story").val();
    recognition.start();
    $(".story-load-actions .narrate").addClass("listening");
  });
});
