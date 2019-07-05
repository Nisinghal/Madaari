var ref = firebase.database().ref();

function uploadProgram(cues, actions) {
  ref.child("actions").set(actions);
  ref.child("cues").set(cues);
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
