$(document).ready(function() {
  var savedStory;
  var ref = firebase.database().ref();
  ref.on("value", function(data) {
    savedStory = data.val().story;
    if (savedStory.length > 0) {
      let paras = savedStory.split("\n");
      $(".story-read p.story-paragraph").remove();
      for (let i = 0; i < paras.length; i++) {
        $(".story-read").append(`<p class="story-paragraph">${paras[i]}</p>`);
      }
    } else {
      $("p.story-paragraph").text("No story in database");
    }
  });
});
