function playTestMusic(source, start, stop) {
  var audioElement = document.createElement("audio");
  //'http://www.soundjay.com/misc/sounds/bell-ringing-01.mp3'
  audioElement.setAttribute("src", source);
  audioElement.currentTime = start;
  audioElement.addEventListener("canplay", function() {
    $(".source-box").text(source);
    $(".status-box").text("Loading");
    audioElement.play();
    $(".status-box").text("Playing");
    setTimeout(function() {
      audioElement.pause();
      $(".status-box").text("Paused");
    }, (stop - start) * 1000);
  });
  audioElement.addEventListener("timeupdate", function() {
    currentTime = Math.floor(audioElement.currentTime);
    duration = Math.floor(audioElement.duration);
    $(".time-box").text(`${currentTime} / ${duration}`);
  });
  $(".play-box").click(function() {
    audioElement.play();
  });
  $(".pause-box").click(function() {
    audioElement.pause();
  });
}

function playMusic(src, play, pause) {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", src);
  audioElement.currentTime = play;
  audioElement.addEventListener("canplay", function() {
    audioElement.play();
    setTimeout(function() {
      audioElement.pause();
    }, (pause - play) * 1000);
  });
}

$(document).ready(function() {
  $(".test-music-params").click(function() {
    let source = $("input.music-path").val();
    let start = $("input.start-point").val();
    let stop = $("input.stop-point").val();
    $(".jukebox").css("display", "flex");
    playTestMusic(source, parseInt(start), parseInt(stop));
  });

  $("button.generate-music-block").click(function() {
    let source = $("input.music-path").val();
    let start = $("input.start-point").val();
    let stop = $("input.stop-point").val();
    openActionsTab();
    $(".panel .block.audio input.audio-source").val(source);
    $(".panel .block.audio input.audio-play").val(start);
    $(".panel .block.audio input.audio-pause").val(stop);
    $(".panel .block.audio").addClass("generate");
    setTimeout(function() {
      $(".panel .block.audio").removeClass("generate");
    }, 500);
  });

  $(".board").on("click", ".block.audio", function(e) {
    let source = $(this)
      .find("input.audio-source")
      .val();
    let start = parseInt(
      $(this)
        .find("input.audio-play")
        .val()
    );
    let stop = parseInt(
      $(this)
        .find("input.audio-pause")
        .val()
    );
    playMusic(source, start, stop);
    e.stopPropagation();
  });
});
