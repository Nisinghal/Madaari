$(document).ready(function() {
  $(".blocks-title.cues").click(function() {
    $(".blocks-title").removeClass("open");
    $(".blocks-container").removeClass("open");
    $(".cue-container").addClass("open");
    $(".cues").addClass("open");
  });
  $(".blocks-title.actions").click(function() {
    $(".blocks-title").removeClass("open");
    $(".blocks-container").removeClass("open");
    $(".action-container").addClass("open");
    $(".actions").addClass("open");
  });
  $(".blocks-title.control").click(function() {
    $(".blocks-title").removeClass("open");
    $(".blocks-container").removeClass("open");
    $(".control-container").addClass("open");
    $(".control").addClass("open");
  });
});
