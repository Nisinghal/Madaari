var ourExpressions = [
  "Happy",
  "Sad",
  "Wink",
  "Kiss",
  "Stick-out Tongue",
  "Surprised",
  "Angry"
];
var theExpression = "None";

function updateExpression(obj) {
  let expressions = [
    "smiley",
    "disappointed",
    "wink",
    "kissing",
    "stuckOutTongue",
    "scream",
    "rage"
  ];
  maxInd = -1;
  for (let i = 0; i < expressions.length; i++) {
    if (obj[expressions[i]] > 50) {
      maxInd = i;
      break;
    }
  }
  if (maxInd > -1) {
    theExpression = ourExpressions[maxInd];
  } else {
    theExpression = "None";
  }
}

/* FROM THE EXPRESSION DETECTION MODULE */

// SDK Needs to create video and canvas nodes in the DOM in order to function
// Here we are adding those nodes a predefined div.
var divRoot = $(".expression-stream")[0];
var width = $(".expression-stream").width();
var height = $(".expression-stream").height();
var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
//Construct a CameraDetector and specify the image width / height and face detector mode.
var detector = new affdex.CameraDetector(divRoot, width, height, faceMode);

//Enable detection of all Expressions, Emotions and Emojis classifiers.
detector.detectAllEmotions();
detector.detectAllExpressions();
detector.detectAllEmojis();
detector.detectAllAppearance();

var setup = false;

//Add a callback to notify when the detector is initialized and ready for runing.
detector.addEventListener("onInitializeSuccess", function() {
  console.log("The detector reports initialized");
  //Display canvas instead of video feed because we want to draw the feature points on it
  $("#face_video_canvas").css("display", "block");
  if (!setup) {
    setup = true;
    postMessage("Setup Complete. You can now enjoy reading!");
  }
  $("#face_video").css("display", "none");
});

//function executes when Start button is pushed.
function onStart() {
  if (detector && !detector.isRunning) {
    detector.start();
  }
  $("#face_video").css("display", "none");
  $(".expression-message").text("Loading Expression Detection");
  console.log("Clicked the start button");
}

//function executes when the Stop button is pushed.
function onStop() {
  console.log("Clicked the stop button");
  if (detector && detector.isRunning) {
    detector.removeEventListener();
    detector.stop();
  }
}

//function executes when the Reset button is pushed.
function onReset() {
  console.log("Clicked the reset button");
  if (detector && detector.isRunning) {
    detector.reset();
  }
}

//Add a callback to notify when camera access is allowed
detector.addEventListener("onWebcamConnectSuccess", function() {
  console.log("Webcam access allowed");
});

//Add a callback to notify when camera access is denied
detector.addEventListener("onWebcamConnectFailure", function() {
  console.log("Webcam access denied");
});

//Add a callback to notify when detector is stopped
detector.addEventListener("onStopSuccess", function() {
  console.log("The detector reports stopped");
  $("#results").html("");
});

//Add a callback to receive the results from processing an image.
//The faces object contains the list of the faces detected in an image.
//Faces object contains probabilities for all the different expressions, emotions and appearance metrics
detector.addEventListener("onImageResultsSuccess", function(
  faces,
  image,
  timestamp
) {
  $("#results").html("");
  if (faces.length > 0) {
    // console.log("Appearance: " + JSON.stringify(faces[0].appearance));
    // console.log(
    //   "Emotions: " +
    //     JSON.stringify(faces[0].emotions, function(key, val) {
    //       return val.toFixed ? Number(val.toFixed(0)) : val;
    //     })
    // );
    // console.log(
    //   "Expressions: " +
    //     JSON.stringify(faces[0].expressions, function(key, val) {
    //       return val.toFixed ? Number(val.toFixed(0)) : val;
    //     })
    // );
    $(".expression-stream .emoji").html(faces[0].emojis.dominantEmoji);
    updateExpression(faces[0].emojis);
    let actionInd = checkForEvent(readCues, "", theExpression);
    if (actionInd > -1) {
      triggerAction(readActions[actionInd]);
    }
    //console.log(theExpression);
    if ($("#face_video_canvas")[0] != null)
      drawFeaturePoints(image, faces[0].featurePoints);
  }
});

//Draw the detected facial feature points on the image
function drawFeaturePoints(img, featurePoints) {
  var contxt = $("#face_video_canvas")[0].getContext("2d");

  var hRatio = contxt.canvas.width / img.width;
  var vRatio = contxt.canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio);

  contxt.strokeStyle = "#FFFFFF";
  for (var id in featurePoints) {
    contxt.beginPath();
    contxt.arc(featurePoints[id].x, featurePoints[id].y, 2, 0, 2 * Math.PI);
    contxt.stroke();
  }
}

$(document).ready(function() {
  onStart();
  let start = true;
  $(".start-stop").click(function() {
    if (start) {
      start = false;
      onStop();
      $("span.stop").css("display", "none");
      $("span.start").css("display", "block");
      $(".expression-message").text("Expression detection is paused");
    } else {
      start = true;
      onStart();
      $("span.stop").css("display", "block");
      $("span.start").css("display", "none");
    }
  });
});
