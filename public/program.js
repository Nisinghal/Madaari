$("document").ready(function() {
  //Gathering Board Area
  var boardx = $(".board").offset().left;
  var boardy = $(".board").offset().top;
  var boardlimitx = $(".board").offset().left + $(".board").width();
  var boardlimity = $(".board").offset().top + $(".board").height();

  $(".panel .block")
    .disableSelection()
    .draggable({
      containment: "window",
      drag: function(event, ui) {
        dragHover($(this));
      },
      stop: function(event, ui) {
        let [blockType, x, y, centerx, centery] = returnBlockInfo($(this));
        //Reset Panel Block
        $(this).css("top", "0px");
        $(this).css("left", "0px");
        removeHoverProperties();
        //Check Bounding Area for New Block
        if (
          boardx < x &&
          x + $(".block").width() < boardlimitx &&
          boardy < y &&
          y + $(".block").height() < boardlimity
        ) {
          let createNew = !dropit($(this), centerx, centery, x, y);
          if (createNew) {
            $(".board").append(recreateBlock($(this), x - boardx, y - boardy));
            $(".board .block")
              .disableSelection()
              .draggable({
                containment: "parent",
                drag: function(event, ui) {
                  dragHover($(this));
                },
                stop: function(event, ui) {
                  let [blockType, x, y, centerx, centery] = returnBlockInfo(
                    $(this)
                  );
                  let deleteBlock = dropit($(this), centerx, centery, x, y);
                  if (deleteBlock) {
                    $(this).remove();
                  }
                }
              });
            $(".drop-area")
              .sortable({
                out: function(event, ui) {
                  console.log("I'm out!");
                  dragHover($(this));
                },
                beforeStop: function(event, ui) {
                  console.log("Stopping");
                  let [blockType, x, y, centerx, centery] = returnBlockInfo(
                    ui.item
                  );
                  console.log(x, y);
                  let dropped = dropit(ui.item, centerx, centery, x, y);
                  if (dropped) {
                    ui.item.remove();
                  } else {
                    $(".board").append(
                      recreateBlock(ui.item, x - boardx, y - boardy)
                    );
                    ui.item.remove();
                  }
                }
              })
              .disableSelection();
          }
        }
      }
    });

  $(".board").droppable({});
});
