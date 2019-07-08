var avatars = ["Expression", "Stick Figure"];
var actions = [["Happy", "Sad", "Surprised", "Angry"], ["Walk", "Run", "Jump"]];

function initiateAnimationControls() {
  $(".select.avatar .selected").html(avatars[0]);
  let avatarOptions = "";
  avatars.forEach(function(a) {
    avatarOptions += `<div class="option">${a}</div>`;
  });
  $(".select.avatar .options").html(avatarOptions);

  $(".select.actions .selected").html(actions[0][0]);
  let actionOptions = "";
  actions[0].forEach(function(a) {
    actionOptions += `<div class="option">${a}</div>`;
  });
  $(".select.actions .options").html(actionOptions);
}

/* Expression */
var mouth = Snap("#mouth");
var mouthPath = mouth.path("M 0 0 q 30 00 60 0");
mouthPath.attr({
  fill: "#FFF",
  stroke: "#FFF",
  strokeWidth: 0
});

function expressionHappy() {
  mouthPath.animate({ d: "M 0 0 q 30 40 60 0" }, 500);
  $(".brow-left").css("top", "8%");
  $(".brow-left").css("transform", "rotate(-10deg)");
  $(".brow-right").css("top", "8%");
  $(".brow-right").css("transform", "rotate(10deg)");
}

function expressionSad() {
  mouthPath.animate({ d: "M 0 20 q 30 -40 60 0" }, 500);
  $(".brow-left").css("top", "10%");
  $(".brow-left").css("transform", "rotate(-10deg)");
  $(".brow-right").css("top", "10%");
  $(".brow-right").css("transform", "rotate(10deg)");
}

function expressionSurprise() {
  mouthPath.animate({ d: "M 10 0 q 20 60 40 0" }, 500);
  $(".brow-left").css("top", "1%");
  $(".brow-left").css("transform", "rotate(-20deg)");
  $(".brow-right").css("top", "1%");
  $(".brow-right").css("transform", "rotate(20deg)");
}

function expressionAngry() {
  mouthPath.animate({ d: "M 0 20 q 30 -40 60 0" }, 500);
  $(".brow-left").css("top", "15%");
  $(".brow-left").css("transform", "rotate(15deg)");
  $(".brow-right").css("top", "15%");
  $(".brow-right").css("transform", "rotate(-15deg)");
}

function stickFigureWalk() {
  $(".stick-figure").css("display", "none");
  $(".walking").css("display", "block");
}

function stickFigureRun() {
  $(".stick-figure").css("display", "none");
  $(".running").css("display", "block");
}

function stickFigureJump() {
  $(".stick-figure").css("display", "none");
  $(".jumping").css("display", "block");
}

function selectAvatar(name) {
  let index = avatars.indexOf(name);
  if (index > -1) {
    $(".select.avatar .selected").html(avatars[index]);
    $(".select.actions .selected").html(actions[index][0]);
    let actionOptions = "";
    actions[index].forEach(function(a) {
      actionOptions += `<div class="option">${a}</div>`;
    });
    $(".actions .options").html(actionOptions);
    if (name == "Expression") {
      $(".animation-avatar").css("display", "none");
      $(".animation-expression").css("display", "block");
      expressionHappy();
    } else if (name == "Stick Figure") {
      $(".animation-avatar").css("display", "none");
      $(".animation-stick-figure").css("display", "block");
      stickFigureWalk();
    }
  }
}

function selectAction(avatar, action) {
  let index = avatars.indexOf(avatar);
  if (index > -1) {
    let actionInd = actions[index].indexOf(action);
    if (actionInd > -1) {
      selectAvatar(avatar);
      $(".avatar .selected").html(avatar);
      $(".actions .selected").html(action);
      if (avatar == "Expression") {
        if (action == "Happy") {
          expressionHappy();
        } else if (action == "Sad") {
          expressionSad();
        } else if (action == "Surprised") {
          expressionSurprise();
        } else if (action == "Angry") {
          expressionAngry();
        }
      } else if (avatar == "Stick Figure") {
        if (action == "Walk") {
          stickFigureWalk();
        } else if (action == "Run") {
          stickFigureRun();
        } else if (action == "Jump") {
          stickFigureJump();
        }
      }
    }
  }
}

$(document).ready(function() {
  initiateAnimationControls();
  expressionHappy();

  $(".select .selected").click(function() {
    let open = $(this)
      .parent()
      .hasClass("open");
    if (open) {
      $(this)
        .parent()
        .removeClass("open");
    } else {
      $(".select").removeClass("open");
      $(this)
        .parent()
        .addClass("open");
    }
  });

  $(".avatar .options .option").click(function() {
    let val = $(this).html();
    $(".select").removeClass("open");
    selectAvatar(val);
  });

  $(".actions").on("click", ".option", function() {
    let avatar = $(".avatar .selected").html();
    let val = $(this).html();
    $(".select").removeClass("open");
    selectAction(avatar, val);
  });

  $("button.generate-animation").click(function() {
    let avatar = $(".avatar .selected").html();
    let action = $(".actions .selected").html();
    openActionsTab();
    $(".panel .block.animation input.avatar").val(avatar);
    $(".panel .block.animation input.action").val(action);
    $(".panel .block.animation").addClass("generate");
    setTimeout(function() {
      $(".panel .block.animation").removeClass("generate");
    }, 500);
  });

  $(".board").on("click", ".block.animation", function(e) {
    openAnimationPanel();
    let avatar = $(this)
      .find("input.avatar")
      .val();
    let action = $(this)
      .find("input.action")
      .val();
    selectAction(avatar, action);
    e.stopPropagation();
  });
});
