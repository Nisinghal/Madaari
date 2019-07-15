var ref = firebase.database().ref();

$(document).ready(function() {
  var savedStory;
  ref.child("projection").set(["None", "None"]);
  ref.on("value", function(data) {
    readActions = data.val().actions;
    if (readActions) {
      $(".read.trigger").css("display", "block");
      populateTriggerMenu();
    }
    console.log(data.val().cues);
    readCues = parseCues(data.val().cues);
    allKeywords = getCueParameter(readCues, "keyword");
    savedStory = data.val().story;
    if (savedStory.length > 0) {
      let paras = savedStory.split("\n");
      $(".story-read p.story-paragraph").remove();
      for (let i = 0; i < paras.length; i++) {
        let paragraph = [];
        let words = paras[i].split(" ");
        for (let j = 0; j < words.length; j++) {
          keywordInd = allKeywords.indexOf(
            words[j].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase()
          );
          if (keywordInd > -1) {
            paragraph.push(
              `<span class="keyword ${allKeywords[keywordInd]}">${
                words[j]
              }</span>`
            );
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

    let actionInd = checkForStartEvent(readCues);
    if (actionInd > -1) {
      triggerAction(readActions[actionInd]);
    }
  });
});
