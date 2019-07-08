var ref = firebase.database().ref();

$(document).ready(function() {
  var savedStory;
  ref.on("value", function(data) {
    readActions = data.val().actions;
    if (readActions) {
      $(".read.trigger").css("display", "block");
      populateTriggerMenu();
    }

    readCues = data.val().cues;
    allKeywords = getCueParameter(readCues, "keyword");
    savedStory = data.val().story;
    if (savedStory.length > 0) {
      let paras = savedStory.split("\n");
      $(".story-read p.story-paragraph").remove();
      for (let i = 0; i < paras.length; i++) {
        let paragraph = [];
        let words = paras[i].split(" ");
        for (let j = 0; j < words.length; j++) {
          if (
            allKeywords.indexOf(
              words[j].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase()
            ) > -1
          ) {
            paragraph.push(`<span class="keyword">${words[j]}</span>`);
          } else {
            paragraph.push(words[j]);
          }
        }
        let storyPara = paragraph.join(" ");
        $(".story-read").append(`<p class="story-paragraph">${storyPara}</p>`);
      }
    } else {
      $("p.story-paragraph").text("No story in database");
    }
  });
});
