var readCues;
var readActions;

function decodeExecution(obj) {
  if (obj.type == "Animation") {
    let avatar = obj.params[0];
    let action = obj.params[1];
    setTimeout(function() {
      selectAction(avatar, action);
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
