function getCueParameter(cuesRead, param) {
  let allCuesForParam = [];
  for (let i = 0; i < cuesRead.length; i++) {
    //let objArr = JSON.parse(cuesRead[i]);
    for (let j = 0; j < cuesRead[i].length; j++) {
      if (cuesRead[i][j][param]) {
        allCuesForParam.push(
          cuesRead[i][j][param]
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .trim()
            .toLowerCase()
        );
      }
    }
  }
  return allCuesForParam;
}

function parseCues(cues) {
  let parsedCues = [];
  for (let i = 0; i < cues.length; i++) {
    let cuesForEvent = JSON.parse(cues[i]);
    for (let j = 0; j < cuesForEvent.length; j++) {
      if (cuesForEvent[j].keyword) {
        cuesForEvent[j].keyword = cuesForEvent[j].keyword
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
          .trim()
          .toLowerCase();
      }
    }
    parsedCues.push(cuesForEvent);
  }
  return parsedCues;
}

function checkKeyword(word, transcript) {
  if (word) {
    let transcriptArr = transcript
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .toLowerCase()
      .split(" ");
    if (transcriptArr.indexOf(word) > -1) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function checkExpression(expression, detector) {
  if (expression) {
    if (expression == detector) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function checkStart(start) {
  if (start) {
    if (start == "true") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function checkForEvent(cues, transcript, expression) {
  for (let i = 0; i < cues.length; i++) {
    for (let j = 0; j < cues[i].length; j++) {
      cuesObj = cues[i][j];
      if (checkStart(cuesObj.start)) {
        continue;
      }
      if (checkKeyword(cuesObj.keyword, transcript)) {
        if (checkExpression(cuesObj.expression, expression)) {
          return i;
        }
      }
    }
  }
  return -1;
}

function checkForStartEvent(cues) {
  for (let i = 0; i < cues.length; i++) {
    for (let j = 0; j < cues[i].length; j++) {
      cuesObj = cues[i][j];
      if (checkStart(cuesObj.start)) {
        return i;
      }
    }
  }
  return -1;
}
