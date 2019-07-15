function postCompileMessage(type, icon, message) {
  let DOM = `<div class="compile-item">
    <p class="compile-title">
      <i class="fas ${icon} ${type}"></i> ${type}
    </p>
    <p class="compile-text">${message}</p>
  </div>`;
  $(".code-console").append(DOM);
}

function clearCompileConsole() {
  $(".code-console").html("");
}

function checkIfEmpty(block) {
  let empty = false;
  block.find("input").each(function(input) {
    if ($(this).val() == "") {
      empty = true;
      return true;
    }
  });
  block.find("select").each(function(select) {
    if ($(this).val() == null) {
      empty = true;
      return true;
    }
  });
  return empty;
}

function compileHide() {
  $(".code-console").css("top", "calc(100% - 5px)");
  $(".code-console").css("opacity", "0");
  setTimeout(function() {
    $(".code-console").css("display", "none");
  }, 500);
}

function compileShow() {
  $(".code-console").css("display", "block");
  setTimeout(function() {
    $(".code-console").css("opacity", "1");
    $(".code-console").css("top", "calc(100% + 5px)");
  }, 50);
}

function compileCheck() {
  let success = true;
  let ifthen = false;
  let outsideBlockWarning = false;
  clearCompileConsole();
  $(".board")
    .children(".block")
    .each(function(i) {
      let block = $(this);
      let blockType = block.attr("aria-label");

      if (blockType != "ifthen" && blockType != "trash") {
        if (!outsideBlockWarning) {
          postCompileMessage(
            "warn",
            "fa-question-circle",
            "The board contains blocks unpaired with if-then blocks"
          );
          outsideBlockWarning = true;
        }
      }
      if (blockType == "ifthen") {
        ifthen = true;
        if (block.find(".if-drop").children(".block").length > 0) {
          block
            .find(".if-drop")
            .children(".block")
            .each(function(innerBlocks) {
              let innerBlock = $(this);
              if (checkIfEmpty(innerBlock)) {
                success = false;
                postCompileMessage(
                  "error",
                  "fa-exclamation-triangle",
                  "All cue blocks must be filled with values"
                );
                return success;
              }

              if (innerBlock.attr("aria-label") == "start") {
                if (block.find(".if-drop").children(".block").length > 1) {
                  success = false;
                  postCompileMessage(
                    "error",
                    "fa-exclamation-triangle",
                    "Start block should be programmed individually without other cue blocks"
                  );
                  return success;
                }
              }

              if (innerBlock.attr("aria-label") == "keyword") {
                let keywordVal = innerBlock
                  .find("input")
                  .val()
                  .trim();
                if (keywordVal.indexOf(" ") > -1) {
                  success = false;
                  postCompileMessage(
                    "error",
                    "fa-exclamation-triangle",
                    "Keyword should be a single word"
                  );
                  return success;
                }
              }
            });
        } else {
          success = false;
          postCompileMessage(
            "error",
            "fa-exclamation-triangle",
            "Cues must be specified for each if block"
          );
          return success;
        }

        if (block.find(".then-drop").children(".block").length > 0) {
          block
            .find(".then-drop")
            .children(".block")
            .each(function(innerBlocks) {
              let innerBlock = $(this);
              if (checkIfEmpty(innerBlock)) {
                success = false;
                postCompileMessage(
                  "error",
                  "fa-exclamation-triangle",
                  "All action blocks must be filled with values"
                );
                return success;
              }

              if (innerBlock.attr("aria-label") == "repeat") {
                if (
                  innerBlock.find(".drop-area").children(".block").length < 1
                ) {
                  success = false;
                  postCompileMessage(
                    "error",
                    "fa-exclamation-triangle",
                    "Repeat block should not be empty"
                  );
                  return success;
                }
              }
            });
        } else {
          success = false;
          postCompileMessage(
            "error",
            "fa-exclamation-triangle",
            "Actions must be specified for each if block"
          );
          return success;
        }
      }
    });

  if (!ifthen) {
    success = false;
    postCompileMessage(
      "error",
      "fa-exclamation-triangle",
      "No if-then blocks used on the board"
    );
    return success;
  }

  if (success) {
    postCompileMessage(
      "success",
      "fa-check-circle",
      "No errors found in the program"
    );
  }

  return success;
}

$(document).ready(function() {
  $(window).click(function() {
    compileHide();
  });

  $("button.check-code").click(function(e) {
    compileCheck();
    compileShow();
    e.stopPropagation();
  });
});
