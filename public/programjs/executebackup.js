var repeatFunctions = [];
var delayValue = 0;
var repeatTime = 0;

var eventFunctions = [];
var totalTime = 0;

function returnToPerform(block) {
  let blockType = block.attr("aria-label");
  if (blockType == "delay") {
    delayValue += block.find("input").val() * 1000;
    repeatTime += block.find("input").val() * 1000;
    totalTime += block.find("input").val() * 1000;
  } else if (blockType == "animation") {
    let avatar = block.find("input.avatar").val();
    let action = block.find("input.action").val();
    repeatTime += 500;
    totalTime += 500;
    return {
      execute: function(delay) {
        setTimeout(function() {
          selectAction(avatar, action);
        }, delay);
      },
      delay: delayValue,
      type: "Animation"
    };
  } else if (blockType == "repeat") {
    return {
      execute: function(delay) {}
    };
  } else {
    return {
      execute: function(delay) {
        setTimeout(function() {
          nothing();
        }, delay);
      },
      delay: delayValue,
      type: "Nothing"
    };
  }
}

function repeatEventsPerform() {
  for (let i = 0; i < repeatFunctions.length; i++) {
    repeatFunctions[i].execute(repeatFunctions[i].delay);
  }
}

function performRepeatBlock(block, initDelay = 0) {
  clearInterval(interval);
  repeatFunctions = [];
  delayValue = initDelay;
  repeatTime = initDelay;
  let repeat = block.children("input.repeatVal").val();
  if (!repeat) {
    repeat = 0;
  }
  $(".repeat-counter")
    .text(repeat)
    .show();
  block
    .children(".drop-area")
    .children(".block")
    .each(function(i) {
      let objectForExecution = returnToPerform($(this));
      if (objectForExecution) {
        repeatFunctions.push(objectForExecution);
      }
    });
  if (repeat > 0) {
    repeatEventsPerform();
    repeat--;
  }
  if (repeat > 0) {
    var interval = setInterval(function() {
      repeatEventsPerform();
      $(".repeat-counter").text(repeat);
      repeat--;
      if (repeat <= 0) {
        clearInterval(interval);
        repeatFunctions = [];
        delayValue = 0;
        repeatTime = 0;
      }
    }, repeatTime);
  }
  setTimeout(function() {
    $(".repeat-counter").hide();
  }, repeatTime * (repeat + 1));
}

// performAllEvents(){
//   for (let i = 0; i < eventFunctions.length; i++) {
//     if(eventFunctions[i].type == 'repeat'){

//     } else {
//     eventFunctions[i].execute(eventFunctions[i].delay);
//     }
//   }
// }

$(document).ready(function() {
  $(".board").on("click", ".block.repeat", function() {
    performRepeatBlock($(this));
  });
});
