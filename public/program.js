$("document").ready(function() {
  //Gathering Board Area
  var boardx = $(".board").offset().left;
  var boardy = $(".board").offset().top;
  var boardlimitx = $(".board").offset().left + $(".board").width();
  var boardlimity = $(".board").offset().top + $(".board").height();

  //Sortable Block Out Params
  var sortx = 0;
  var sorty = 0;
  var droppables = ["ifthen", "repeat"];

  function enableBlockDrag() {
    $(".board .block")
      .disableSelection()
      .draggable({
        containment: "parent",
        drag: function(event, ui) {
          dragHover($(this));
        },
        stop: function(event, ui) {
          let [blockType, x, y, centerx, centery] = returnBlockInfo($(this));
          let deleteBlock = dropit($(this), centerx, centery, x, y);
          if (deleteBlock) {
            $(this).remove();
          }
        }
      });
  }

  function enableDropAreaSort() {
    $(".drop-area")
      .sortable({
        over: function(event, ui) {
          $(".block").removeClass("block-out");
        },
        out: function(event, ui) {
          ui.item.addClass("block-out");
        },
        beforeStop: function(event, ui) {
          let sortBlock = $(".block-out");
          if (sortBlock.length > 0) {
            let [blockType, x, y, centerx, centery] = returnBlockInfo(
              sortBlock,
              sortx,
              sorty
            );
            let dropped = dropit(sortBlock, centerx, centery, x, y);
            if (dropped) {
              $(".block-out").remove();
            } else {
              $(".board").append(
                recreateBlock(sortBlock, sortx - boardx, sorty - boardy)
              );
              let blockParent = $(".block-out").parent(".drop-area");
              $(".block-out").remove();
              dropAreaPaddingFix(blockParent);
              enableBlockDrag();
              enableDropAreaSort();
            }
          }
        }
      })
      .disableSelection();
  }

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
            enableBlockDrag();
            enableDropAreaSort();
          }
        }
      }
    });

  $(".board").droppable({});

  $(".board").mousemove(function(e) {
    let sortBlock = $(".block-out");
    if (sortBlock.length > 0) {
      let sortParent = sortBlock.parent(".drop-area");
      sortx = sortBlock.offset().left;
      sorty = sortBlock.offset().top;
    }
  });
});
