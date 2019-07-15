var readCues;
var readActions;

function decodeExecution(obj) {
  if (obj.type == "Animation") {
    let avatar = obj.params[0];
    let action = obj.params[1];
    setTimeout(function() {
      selectAction(avatar, action);
    }, obj.delay);
  } else if (obj.type == "Motor") {
    let motor = obj.params[0];
    let speed = obj.params[1];
    let rotation = obj.params[2];
    setTimeout(function() {
      moveMotor(motor, speed, rotation);
    }, obj.delay);
  } else if (obj.type == "Audio") {
    let source = obj.params[0];
    let start = obj.params[1];
    let stop = obj.params[2];
    setTimeout(function() {
      playMusic(source, start, stop);
    }, obj.delay);
  } else if (obj.type == "Repeat") {
    let events = obj.repeatEvents;
    setTimeout(function() {
      for (let e = 0; e < events.length; e++) {
        decodeExecution(events[e]);
      }
    }, obj.delay);
  }
}

function triggerAction(action) {
  let executeActions = JSON.parse(action);
  for (let i = 0; i < executeActions.length; i++) {
    decodeExecution(executeActions[i]);
  }
}
