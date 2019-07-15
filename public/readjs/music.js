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
