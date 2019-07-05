$(document).ready(function() {
  var savedStory;
  var ref = firebase.database().ref();
  ref.on("value", function(data) {
    savedStory = data.val().story;
    if (savedStory.length > 0) {
      $("textarea.type-story").text(savedStory);
    } else {
      $("textarea.type-story").attr(
        "placeholder",
        "Start typing or Paste your story"
      );
    }
  });
  $(".story.save-continue").click(function() {
    let typedStory = $("textarea.type-story").val();
    ref.child("story").set(typedStory);
    $(".story.save-continue").html('<i class="fas fa-check"></i> Saved');
  });

  $("textarea.type-story").keyup(function(e) {
    $(".story.save-continue").html('<i class="fas fa-save"></i> Save Story');
  });
});
