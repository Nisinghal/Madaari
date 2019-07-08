var ref = firebase.database().ref();

function uploadProgram(cues, actions) {
  ref.child("actions").set(actions);
  ref.child("cues").set(cues);
  $(".program.upload").html('<i class="fas fa-check"></i> Uploaded');
  setTimeout(function() {
    $(".program.upload").html('<i class="fas fa-cloud-upload-alt"></i> Upload');
  }, 2000);
}

$(document).ready(function() {
  var savedStory;
  ref.on("value", function(data) {
    savedStory = data.val().story;
    if (savedStory.length > 0) {
      let paras = savedStory.split("\n");
      $(".access-story .content-wrapper p.story").remove();
      for (let i = 0; i < paras.length; i++) {
        $(".access-story .content-wrapper").append(
          `<p class="story">${paras[i]}</p>`
        );
      }
    } else {
      $("p.story").text("No story in database");
    }
  });
});
