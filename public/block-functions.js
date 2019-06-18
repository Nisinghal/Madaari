var blockNamesThen = ["delay", "motor", "animation", "repeat"];
var blockNamesIf = ["keyword", "music", "expression"];
var droppables = ["ifthen", "repeat", "trash"];

//Gathering Board Area
var boardx = $(".board").offset().left;
var boardy = $(".board").offset().top;
var boardlimitx = $(".board").offset().left + $(".board").width();
var boardlimity = $(".board").offset().top + $(".board").height();

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function returnBlockInfo(block, x = null, y = null) {
  let blockType = block.attr("aria-label");
  if (x == null) {
    x = block.offset().left;
  }
  if (y == null) {
    y = block.offset().top;
  }
  let blockHeight = block.innerHeight();
  let blockWidth = block.innerWidth();
  let centerx = x + blockWidth / 2 - boardx;
  let centery = y + blockHeight / 2 - boardy;
  return [blockType, x, y, centerx, centery];
}

function findOverlap(centerX, centerY, x, y) {
  let result = "nothing";
  let domElement;
  $(".board")
    .children(".block")
    .each(function(i) {
      let [
        thisBlockType,
        thisx,
        thisy,
        thisCenterX,
        thisCenterY
      ] = returnBlockInfo($(this));
      let dist = distance(centerX, centerY, thisCenterX, thisCenterY);
      let blockArea = distance(centerX, centerY, x, y);
      if (0 < dist && dist < blockArea) {
        domElement = $(this);
        result = "overlap";
        return;
      }
    });

  return [result, domElement];
}

function removeHoverProperties() {
  $(".board .block").css("box-shadow", "0px 0px 0px 0rem #FFF");
  $(".board .block .drop-area").removeClass("more-padding");
  $(".block.trash").removeClass("trash-open");
}

function dropAreaPaddingFix(dropArea) {
  $(".board")
    .find(".drop-area")
    .each(function(i) {
      if ($(this).find(".block").length > 0) {
        $(this).addClass("no-padding");
      } else {
        $(this).removeClass("no-padding");
      }
    });
  if (dropArea.find(".block").length > 1) {
    dropArea.addClass("no-padding");
  } else {
    dropArea.removeClass("no-padding");
  }
}

function dragHover(dragged) {
  let [blockType, x, y, centerx, centery] = returnBlockInfo(dragged);
  let [action, element] = findOverlap(centerx, centery, x, y);
  if (action == "overlap") {
    let droppedType = element.attr("aria-label");
    if (droppables.indexOf(droppedType) > -1) {
      if (droppedType == "trash") {
        $(".block.trash").addClass("trash-open");
        return;
      }
      if (droppedType == "ifthen") {
        element.css("box-shadow", "0px 0px 0px 0.25rem rgba(52, 152, 219,.25)");
        if (blockNamesIf.indexOf(blockType) > -1) {
          element.children(".if-drop").addClass("more-padding");
        } else if (blockNamesThen.indexOf(blockType) > -1) {
          element.children(".then-drop").addClass("more-padding");
        }
      } else if (droppedType == "repeat") {
        if (blockNamesThen.indexOf(blockType) > -1 && blockType != "repeat") {
          element.css(
            "box-shadow",
            "0px 0px 0px 0.25rem rgba(52, 152, 219,.25)"
          );
          element.children(".drop-area").addClass("more-padding");
        }
      }
    }
  } else {
    removeHoverProperties();
  }
}

function dropit(block, centerx, centery, x, y) {
  let elementDrop = false;
  removeHoverProperties();
  let blockType = block.attr("aria-label");
  let [action, element] = findOverlap(centerx, centery, x, y);
  if (action == "overlap") {
    let droppedType = element.attr("aria-label");
    if (droppedType == "trash") {
      if (block.parent().hasClass("blocks-container")) {
        elementDrop = true;
      } else {
        block.css("transition", ".4s ease");
        block.css("transform", "scale(0) translate(-100%,-100%)");
        setTimeout(function() {
          block.remove();
        }, 400);
      }
    } else if (droppedType == "ifthen") {
      if (blockNamesIf.indexOf(blockType) > -1) {
        element
          .children(".if-drop")
          .append(recreateBlock(block, 0, 0, "position: relative;"))
          .addClass("no-padding");
        elementDrop = true;
      } else if (blockNamesThen.indexOf(blockType) > -1) {
        element
          .children(".then-drop")
          .append(recreateBlock(block, 0, 0, "position: relative;"))
          .addClass("no-padding");
        elementDrop = true;
        element.find(".repeat .drop-area").addClass("no-padding");
      }
    } else if (droppedType == "repeat") {
      if (blockNamesThen.indexOf(blockType) > -1 && blockType != "repeat") {
        element
          .children(".drop-area")
          .append(recreateBlock(block, 0, 0, "position: relative;"))
          .addClass("no-padding");
        elementDrop = true;
      }
    }
  }
  return elementDrop;
}
