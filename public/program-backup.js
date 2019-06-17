$("document").ready(function() {
  //Gathering Board Area
  var boardx = $(".board").offset().left;
  var boardy = $(".board").offset().top;
  var boardlimitx = $(".board").offset().left + $(".board").width();
  var boardlimity = $(".board").offset().top + $(".board").height();

  $(".panel .block").draggable({
    drag: function(event, ui) {},
    stop: function(event, ui) {
      //Identifying block
      let blockType = $(this)
        .find("p.name")
        .text();
      let x = $(this).offset().left;
      let y = $(this).offset().top;
      let blockHeight = $(this).height();
      let blockWidth = $(this).width();
      //Reset Panel Block
      $(this).css("top", "0px");
      $(this).css("left", "0px");
      //Check Bounding Area for New Block
      if (
        boardx < x &&
        x + $(".block").width() < boardlimitx &&
        boardy < y &&
        y + $(".block").height() < boardlimity
      ) {
        let action = findNearest(
          x - boardx,
          y - boardy,
          blockHeight,
          blockWidth,
          blockType
        );

        //Insert New Block in the Area
        if (action == 1) {
          $(".board").append(generateBlock(blockType, x - boardx, y - boardy));
          $(".board .block").draggable({
            containment: "parent",
            stop: function(event, ui) {
              let x = $(this).offset().left;
              let y = $(this).offset().top;
              let blockHeight = $(this).height();
              let blockWidth = $(this).width();
              // findNearest(
              //   x - boardx,
              //   y - boardy,
              //   blockHeight,
              //   blockWidth,
              //   blockType
              // );
            }
          });
        }

        if (blockType == "ifthen") {
          $(".block .drop-area").sortable();
        }
      }
    }
  });

  $(".board").droppable({
    drop: function(event, ui) {}
  });
});
