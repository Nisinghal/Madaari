var readCues;
var readActions;

var dark = false;

var step = 2;
var delay = 10;

function autoscroll() {
  let top = $(".story-read").scrollTop();
  $(".story-read").animate({ scrollTop: top + step * 8 + "px" }, 500);
}

function populateTriggerMenu() {
  $(".trigger-menu").html("");
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

function monitoringCollapse() {
  $(".collapsable-items").css("opacity", "0");
  setTimeout(function() {
    $(".collapsable-items").css("display", "none");
    $(".collapse-button").addClass("uncollapse");
    $(".monitoring-tabs").css("width", "0px");
    $(".story-reading").css("width", "calc(100% - 32px - 20px)");
  }, 250);
}

function monitoringUncollapse() {
  $(".collapse-button").removeClass("uncollapse");
  $(".monitoring-tabs").css("width", "calc(25% - 20px)");
  $(".story-reading").css("width", "calc(75% - 20px)");
  setTimeout(function() {
    $(".collapsable-items").css("display", "block");
  }, 500);
  setTimeout(function() {
    $(".collapsable-items").css("opacity", "1");
  }, 501);
}

function darkMode(set) {
  if (set) {
    $("header").addClass("dark-mode");
    $(".workspace").addClass("dark-mode");
    $(".dark-switch").addClass("dark-mode");
    $(".logo img").attr("src", "img/LogoWhite.png");
    $(".dark-switch .toggler").css("left", "calc(45px - 4px - 22px)");
  } else {
    $("header").removeClass("dark-mode");
    $(".workspace").removeClass("dark-mode");
    $(".dark-switch").removeClass("dark-mode");
    $(".logo img").attr("src", "img/Logo.png");
    $(".dark-switch .toggler").css("left", "4px");
  }
  return set;
}

$(document).ready(function() {
  let collapseStatus = false;
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
  $(".collapse-button").click(function() {
    if (collapseStatus) {
      monitoringUncollapse();
      collapseStatus = false;
    } else {
      monitoringCollapse();
      collapseStatus = true;
    }
  });

  $(".dark-switch").click(function() {
    if (dark) {
      dark = darkMode(false);
    } else {
      dark = darkMode(true);
    }
  });

  setTimeout(function() {
    var autoscrollInterval = setInterval(function() {
      autoscroll();
    }, 5000);
  }, delay * 1000);

  $(".autoscroll i.fa-plus").click(function() {
    step += 1;
    $(".autoscroll span.value").html(step);
  });

  $(".autoscroll i.fa-minus").click(function() {
    step -= 1;
    $(".autoscroll span.value").html(step);
  });

  $(window).keyup(function(e) {
    if (e.keyCode == 39) {
      step += 1;
      $(".autoscroll span.value").html(step);
    } else if (e.keyCode == 37) {
      step -= 1;
      $(".autoscroll span.value").html(step);
    }
  });
});
