var readCues;
var readActions;

function populateTriggerMenu() {
  let nTriggers = readActions.length;
  for (let i = 0; i < nTriggers; i++) {
    $(".trigger-menu").append(
      `<div class="trigger-item" aria-label="${i}"><p class="trigger">Trigger ${i +
        1}</p></div>`
    );
  }
}

function postMessage(message, icon = "fa-chevron-right") {
  let DOM = `<p class="message"><i class="fas ${icon}"></i> ${message}</p>`;
  $(".monitor-display").append(DOM);
  let scrollTo = $(".monitor-display").get(0).scrollHeight;
  $(".monitor-display").animate({ scrollTop: scrollTo + "px" }, 1000);
}

$(document).ready(function() {
  postMessage("Setting up reading environment");
  /* Speech Control */
  recognition.start();
  /* Trigger Button Manipulation */
  let menuOpen = false;
  $(".read.trigger").click(function(e) {
    if (!menuOpen) {
      $(".trigger-menu").css("display", "block");
      menuOpen = true;
      e.stopPropagation();
    } else {
    }
  });
  $(window).click(function() {
    $(".trigger-menu").css("display", "none");
    menuOpen = false;
  });
  $(".trigger-menu").on("click", ".trigger-item", function() {
    let selectedAction = parseInt($(this).attr("aria-label"));
    triggerAction(readActions[selectedAction]);
  });
});
