$(document).ready(function() {
  $(".blocks-title.cues").click(function() {
    $(".blocks-title").removeClass("open");
    $(".blocks-container").removeClass("open");
    $(".cue-container").addClass("open");
    $(".cues").addClass("open");
  });
  $(".blocks-title.actions-tab").click(function() {
    $(".blocks-title").removeClass("open");
    $(".blocks-container").removeClass("open");
    $(".action-container").addClass("open");
    $(".actions-tab").addClass("open");
  });
  $(".blocks-title.control").click(function() {
    $(".blocks-title").removeClass("open");
    $(".blocks-container").removeClass("open");
    $(".control-container").addClass("open");
    $(".control").addClass("open");
  });

  /* Story, console panel switching */

  $(".access-story").click(function() {
    if ($(this).hasClass("collapse")) {
      $(".access-panel").addClass("collapse");
      $(".access-story").removeClass("collapse");
      $(".access-story").css("width", "calc(350px - 7.5px)");
      $(".consoles").css("width", "calc(50px - 10px)");
      $(".console").css("height", "calc(33.3% - 5px)");
    }
  });

  $(".music-console.collapse").click(function() {
    $(".access-panel").addClass("collapse");
    $(".music-console").removeClass("collapse");
    $(".access-story").css("width", "calc(50px - 7.5px)");
    $(".consoles").css("width", "calc(350px - 10px)");
    $(".console").css("height", "calc(8% - 5px)");
    $(".music-console").css("height", "calc(84% - 5px)");
  });

  $(".animation-console.collapse").click(function() {
    $(".access-panel").addClass("collapse");
    $(".animation-console").removeClass("collapse");
    $(".access-story").css("width", "calc(50px - 7.5px)");
    $(".consoles").css("width", "calc(350px - 10px)");
    $(".console").css("height", "calc(8% - 5px)");
    $(".animation-console").css("height", "calc(84% - 5px)");
  });

  $(".terminal-console.collapse").click(function() {
    $(".access-panel").addClass("collapse");
    $(".terminal-console").removeClass("collapse");
    $(".access-story").css("width", "calc(50px - 7.5px)");
    $(".consoles").css("width", "calc(350px - 10px)");
    $(".console").css("height", "calc(8% - 5px)");
    $(".terminal-console").css("height", "calc(84% - 5px)");
  });

  /* Keyword Select */
  function keywordSelected() {
    let selection = window.getSelection(),
      range = selection.getRangeAt(0),
      rect = range.getBoundingClientRect();
    let keywordSelection = $(".selected-text");
    if (keywordSelected) {
      keywordSelection.remove();
      $(".generate-keyword-button").css("top", "0px");
      $(".generate-keyword-button").css("opacity", "0");
    }
    if (rect.width > 0) {
      $(".access-story .content-wrapper").append(
        '<div class="selected-text"><div class="generate-keyword-button">Generate Cue Block</div></div>'
      );
      let panel = $(".access-story").offset();
      $(".selected-text").css("top", rect.top - panel.top + "px");
      $(".selected-text").css("left", rect.left - panel.left + "px");
      $(".selected-text").css("height", rect.height + "px");
      $(".selected-text").css("width", rect.width + "px");
      $(".generate-keyword-button").css("top", "-10px");
      $(".generate-keyword-button").css("opacity", "1");
    }
  }

  $("p.story").mouseup(function() {
    keywordSelected();
  });

  $("p.story").mousedown(function() {
    let keywordSelection = $(".selected-text");
    if (keywordSelected) {
      keywordSelection.remove();
      $(".generate-keyword-button").css("top", "0px");
      $(".generate-keyword-button").css("opacity", "0");
    }
  });

  $(".access-story").on("click", ".generate-keyword-button", function(e) {
    $(".blocks-title").removeClass("open");
    $(".blocks-container").removeClass("open");
    $(".cue-container").addClass("open");
    $(".cues").addClass("open");
    let text = window.getSelection().toString();
    $(".panel .block.keyword input.word").val(text);
    $(".panel .block.keyword").addClass("generate");
    setTimeout(function() {
      $(".panel .block.keyword").removeClass("generate");
    }, 500);
    e.stopPropagation();
  });

  //Default Action on load setup //Comment this
  // $(".access-panel").addClass("collapse");
  // $(".animation-console").removeClass("collapse");
  // $(".access-story").css("width", "calc(50px - 7.5px)");
  // $(".consoles").css("width", "calc(350px - 10px)");
  // $(".console").css("height", "calc(8% - 5px)");
  // $(".animation-console").css("height", "calc(84% - 5px)");
});
