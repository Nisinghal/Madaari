var blockMapping = [
  "keyword",
  "music",
  "expression",
  "motor",
  "animation",
  "ifthen",
  "delay",
  "repeat"
];

var blockTitle = [
  "keyword",
  "music",
  "expression",
  "motor",
  "move animation",
  "ifthen",
  "delay",
  "repeat"
];

var blockTypes = [
  "cue-block",
  "cue-block",
  "cue-block",
  "action-block",
  "action-block",
  "control-block",
  "control-block",
  "control-block"
];

let blankValues = ["", "", "", "", "", "", "", "", "", ""];

function generateBlock(keyword, x, y, specific = "", values = blankValues) {
  let keywordIndex = blockMapping.indexOf(keyword);
  let blockType = blockTypes[keywordIndex];

  if (keyword == "keyword") {
    var block = `
    <div class="block keyword ${blockType}" aria-label="keyword" style="${specific} top: ${y}px; left: ${x}px;">
        <p class="name">${blockTitle[keywordIndex]}</p>
        <input type="text" placeholder="Enter word" value="${values[0]}">
    </div>
    `;
  } else if (keyword == "music") {
    var block = `
      <div class="block music ${blockType}" aria-label="music" style="${specific} top: ${y}px; left: ${x}px;">
        <p class="name">${blockTitle[keywordIndex]}</p>
        <select>
          <option disabled selected>Select</option>
          <option ${values[0]}>Happy</option>
          <option ${values[1]}>Gloomy</option>
          <option ${values[2]}>More</option>
        </select>
      </div>
    `;
  } else if (keyword == "expression") {
    var block = `
      <div class="block expression ${blockType}" aria-label="expression" style="${specific} top: ${y}px; left: ${x}px;">
        <p class="name">${blockTitle[keywordIndex]}</p>
        <select>
          <option disabled selected>Select</option>
          <option ${values[0]}>Happy</option>
          <option ${values[1]}>Gloomy</option>
          <option ${values[2]}>Excited</option>
          <option ${values[3]}>Surprised</option>
        </select>
      </div>
    `;
  } else if (keyword == "motor") {
    var block = `
    <div class="block motor ${blockType}" aria-label="motor" style="${specific} top: ${y}px; left: ${x}px;">
        <p class="name">${blockTitle[keywordIndex]}</p>
        <input type="text" class="small-input" placeholder="00" value="${
          values[0]
        }">
        <input type="text" class="small-input" placeholder="00" value="${
          values[1]
        }">
        <input type="text" class="small-input" placeholder="00" value="${
          values[2]
        }">
    </div>
    `;
  } else if (keyword == "animation") {
    var block = `
    <div class="block animation ${blockType}" aria-label="animation" style="${specific} top: ${y}px; left: ${x}px;">
        <p class="name">${blockTitle[keywordIndex]}</p>
        <input type="text" value="${
          values[0]
        }" class="small-input" placeholder="00" />
        <input type="text" value="${
          values[1]
        }" class="small-input" placeholder="00" />
        <input type="text" value="${
          values[2]
        }" class="small-input" placeholder="00" />
    </div>
    `;
  } else if (keyword == "ifthen") {
    var block = `
        <div class="block control-block ifthen" aria-label="${keyword}" style="${specific} top: ${y}px; left: ${x}px;">
            <p class="name">if</p>
            <div class="drop-area if-drop">
              ${values[0]}
            </div>
            <p class="name">then</p>
            <div class="drop-area then-drop">
              ${values[1]}
            </div>
        </div>
        `;
  } else if (keyword == "delay") {
    var block = ` 
    <div class="block control-block delay" aria-label="${keyword}" style="${specific} top: ${y}px; left: ${x}px;">
      <p class="name">delay</p>
      <label for="delay-time">Wait</label
      ><input class="small-input" type="number" value="${
        values[0]
      }" placeholder="00" />
      <span>seconds</span>
    </div> `;
  } else if (keyword == "repeat") {
    var block = `
    <div class="block control-block repeat" aria-label="${keyword}" style="${specific} top: ${y}px; left: ${x}px;">
      <p class="name">repeat</p>
      <label for="delay-time">x</label
      ><input class="small-input" value="${
        values[0]
      }" type="number" placeholder="00" />
      <div class="drop-area repeat-drop">
        ${values[1]}
      </div>
    </div>`;
  }
  return block;
}

function recreateBlock(block, x, y, specific = "") {
  let blockName = block.attr("aria-label");
  console.log(blockName);
  if (blockName == "keyword") {
    let val = block.children("input").val();
    if (val) {
      return generateBlock(blockName, x, y, specific, [val]);
    } else {
      return generateBlock(blockName, x, y, specific);
    }
  } else if (blockName == "music") {
    let val = block.find("option:selected").text();
    if (val != "Select") {
      let values = ["", "", ""];
      values[["Happy", "Gloomy", "More"].indexOf(val)] = "selected";
      return generateBlock(blockName, x, y, specific, values);
    } else {
      return generateBlock(blockName, x, y, specific);
    }
  } else if (blockName == "expression") {
    let val = block.find("option:selected").text();
    if (val != "Select") {
      let values = ["", "", "", ""];
      values[["Happy", "Gloomy", "Excited", "Surprised"].indexOf(val)] =
        "selected";
      return generateBlock(blockName, x, y, specific, values);
    } else {
      return generateBlock(blockName, x, y, specific);
    }
  } else if (blockName == "motor") {
    let values = ["", "", ""];
    if (block.children("input:nth-child(2)").val()) {
      values[0] = block.children("input:nth-child(2)").val();
    }
    if (block.children("input:nth-child(3)").val()) {
      values[1] = block.children("input:nth-child(3)").val();
    }
    if (block.children("input:nth-child(4)").val()) {
      values[2] = block.children("input:nth-child(4)").val();
    }
    return generateBlock(blockName, x, y, specific, values);
  } else if (blockName == "animation") {
    let values = ["", "", ""];
    if (block.children("input:nth-child(2)").val()) {
      values[0] = block.children("input:nth-child(2)").val();
    }
    if (block.children("input:nth-child(3)").val()) {
      values[1] = block.children("input:nth-child(3)").val();
    }
    if (block.children("input:nth-child(4)").val()) {
      values[2] = block.children("input:nth-child(4)").val();
    }
    return generateBlock(blockName, x, y, specific, values);
  } else if (blockName == "delay") {
    let val = block.find("input").val();
    if (val) {
      return generateBlock(blockName, x, y, specific, [val]);
    } else {
      return generateBlock(blockName, x, y, specific);
    }
  } else if (blockName == "ifthen") {
    return generateBlock(blockName, x, y, specific);
  } else if (blockName == "repeat") {
    let val = block.children("input").val();
    let repeatInnerDOM = "";
    block
      .find(".drop-area")
      .children(".block")
      .each(function(i) {
        repeatInnerDOM +=
          recreateBlock($(this), 0, 0, "position: relative;") + "\n";
      });
    return generateBlock(blockName, x, y, specific, [val, repeatInnerDOM]);
  }
  console.log("Some error");
  return 0;
}
