var ref = firebase.database().ref();
var initialize = false;

function saveProgram() {
  $(".board")
    .find(".block")
    .each(function(i) {
      let blockType = $(this).attr("aria-label");
      $(this)
        .find("input")
        .each(function(j) {
          let value = $(this).val();
          $(this).attr("value", value);
        });

      $(this)
        .find("select")
        .each(function(j) {
          let value = $(this).val();
          $(this)
            .find("option")
            .each(function(k) {
              if ($(this).html() == value) {
                $(this).attr("selected", "selected");
              }
            });
        });
    });
  let programSave = $(".board").html();
  ref.child("program").set(programSave);
  $(".save-code").html('<i class="fas fa-check"></i>');
  setTimeout(function() {
    $(".save-code").html('<i class="fas fa-save"></i>');
  }, 1000);
}

function uploadProgram(cues, actions) {
  if (compileCheck()) {
    compileShow();
    saveProgram();
    ref.child("actions").set(actions);
    ref.child("cues").set(cues);
    $(".program.upload").html('<i class="fas fa-check"></i> Uploaded');
    setTimeout(function() {
      $(".program.upload").html(
        '<i class="fas fa-cloud-upload-alt"></i> Upload'
      );
    }, 2000);
  } else {
    compileShow();
    $(".program.upload").html('<i class="fas fa-times"></i> Error');
    $(".program.upload").css("background", "#e62b4a");
    setTimeout(function() {
      $(".program.upload").html(
        '<i class="fas fa-cloud-upload-alt"></i> Upload'
      );
      $(".program.upload").css("background", "#57bd92");
    }, 2000);
  }
}

$(document).ready(function() {
  var savedStory;
  ref.on("value", function(data) {
    if (!initialize) {
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

      savedProgram = data.val().program;
      if (savedProgram.length > 0) {
        $(".board").html(savedProgram);
        enableBlockDrag();
        enableDropAreaSort();
      }

      initialize = true;
    }
  });

  $(".save-code").click(function() {
    saveProgram();
  });
});
