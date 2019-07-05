var cues = [];
var actions = [];

function executeEvents(events) {
  for (let i = 0; i < events.length; i++) {
    if (events[i].type == "Repeat") {
      events[i].execute(events[i].delay, events[i].repeatEvents);
    } else {
      events[i].execute(events[i].delay);
    }
  }
}
