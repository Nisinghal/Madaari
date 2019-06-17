var blockNamesThen = ["delay", "motor", "move"];
var blockNamesIf = ["keyword", "music", "expression"];
var allBlockNames = [
  "delay",
  "motor",
  "move",
  "keyword",
  "music",
  "expression",
  "ifthen"
];

function getType(arr) {
  let type;
  for (i = 0; i < arr.length; i++) {
    let ind = allBlockNames.indexOf(arr[i]);
    if (ind > -1) {
      type = allBlockNames[ind];
      return type;
    }
  }
}

function findNearest(x, y, h, w, blockType) {
  var foundFix = 0;
  centerX = x + w / 2;
  centerY = y + h / 2;
  $(".board")
    .children(".block")
    .each(function(i) {
      let thisBlockArray = $(this)
        .attr("class")
        .split(" ");
      let thisBlockType = getType(thisBlockArray);
      let thisx = $(this).position().left;
      let thisy = $(this).position().top;
      let thish = $(this).height();
      let thisw = $(this).width();
      let thisCenterX = thisx + thisw / 2;
      let thisCenterY = thisy + thish / 2;
      let dist = Math.sqrt(
        Math.pow(centerX - thisCenterX, 2) + Math.pow(centerY - thisCenterY, 2)
      );
      if (dist != 0) {
        if (
          thisx < centerX &&
          centerX < thisx + thisw &&
          thisy < centerY &&
          centerY < thisy + thish
        ) {
          if (
            thisBlockType == "ifthen" &&
            blockNamesIf.indexOf(blockType) > -1
          ) {
            $(this)
              .children(".if-drop")
              .append(generateBlock(blockType, 0, 0, "position: relative;"));
            $(this)
              .children(".if-drop")
              .addClass("min-padding");
            foundFix = 1;
          } else if (
            thisBlockType == "ifthen" &&
            blockNamesThen.indexOf(blockType) > -1
          ) {
            $(this)
              .children(".then-drop")
              .append(generateBlock(blockType, 0, 0, "position: relative;"));
            $(this)
              .children(".then-drop")
              .addClass("min-padding");
            foundFix = 1;
          }
        }
      }
    });

  if (foundFix == 0) return 1;
  else return 0;
}
