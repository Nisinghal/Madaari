function repeatBlockParse(block) {
  let repeatDelay = 0;
  let repeatFunctions = [];
  let repeat = block.children("input.repeatVal").val();
  while (repeat > 0) {
    block
      .children(".drop-area")
      .children(".block")
      .each(function(i) {
        let objectForExecution = returnToPerform($(this), repeatDelay);
        if (typeof objectForExecution == "object") {
          repeatFunctions.push(objectForExecution);
        } else if (typeof objectForExecution == "number") {
          repeatDelay = objectForExecution;
        }
      });
    repeatDelay += 500;
    repeat--;
  }
  return { functions: repeatFunctions, totalTime: repeatDelay };
}

function returnToPerform(block, delayValue = 0) {
  let blockType = block.attr("aria-label");
  if (blockType == "delay") {
    delayValue += block.find("input").val() * 1000;
    return delayValue;
  } else if (blockType == "animation") {
    let avatar = block.find("input.avatar").val();
    let action = block.find("input.action").val();
    return {
      execute: function(delay) {
        setTimeout(function() {
          selectAction(avatar, action);
        }, delay);
      },
      delay: delayValue,
      params: [avatar, action],
      type: "Animation"
    };
  } else if (blockType == "repeat") {
    let parseResult = repeatBlockParse(block);
    let repeatFunctions = parseResult.functions;
    return {
      execute: function(delay, events) {
        setTimeout(function() {
          for (let i = 0; i < events.length; i++) {
            events[i].execute(events[i].delay);
          }
        }, delay);
      },
      delay: delayValue,
      repeatEvents: repeatFunctions,
      totalTime: parseResult.totalTime,
      type: "Repeat"
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

function actionBlocksParsing(block) {
  let blockDelay = 0;
  let repeatBlockTime = 0;
  let functions = [];
  block
    .children(".drop-area.then-drop")
    .children(".block")
    .each(function(i) {
      let objectForExecution = returnToPerform($(this), blockDelay);
      if (typeof objectForExecution == "object") {
        functions.push(objectForExecution);
        if (objectForExecution.type == "Repeat") {
          repeatBlockTime = objectForExecution.totalTime;
        }
      } else if (typeof objectForExecution == "number") {
        blockDelay = objectForExecution + repeatBlockTime;
        repeatBlockTime = 0;
      }
    });
  return functions;
}

function executeEvents(events) {
  for (let i = 0; i < events.length; i++) {
    if (events[i].type == "Repeat") {
      events[i].execute(events[i].delay, events[i].repeatEvents);
    } else {
      events[i].execute(events[i].delay);
    }
  }
}

$(document).ready(function() {
  $(".board").on("click", ".block.repeat", function() {
    let e = repeatBlockParse($(this)).functions;
    executeEvents(e);
  });

  $(".board").on("click", ".block.ifthen", function() {
    let e = actionBlocksParsing($(this));
    executeEvents(e);
  });

  $(".program.upload").click(function() {
    let cues = [];
    let actions = [];
  });
});
