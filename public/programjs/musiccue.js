var audioContext;
var buflen = 1024;
var buf = new Float32Array(buflen);
var noteStrings = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];
var MIN_SAMPLES = 0;
var GOOD_ENOUGH_CORRELATION = 0.9;
var isPitchDetectionOn = false;
var intervalStream;

// Utility functions for pitch detection
function noteFromPitch(frequency) {
  var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  return Math.round(noteNum) + 69;
}
function frequencyFromNoteNumber(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
}
function centsOffFromPitch(frequency, note) {
  return Math.floor(
    (1200 * Math.log(frequency / frequencyFromNoteNumber(note))) / Math.log(2)
  );
}

function autoCorrelate(buf, sampleRate) {
  var SIZE = buf.length;
  var MAX_SAMPLES = Math.floor(SIZE / 2);
  var best_offset = -1;
  var best_correlation = 0;
  var rms = 0;
  var foundGoodCorrelation = false;
  var correlations = new Array(MAX_SAMPLES);

  for (var i = 0; i < SIZE; i++) {
    var val = buf[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1;

  var lastCorrelation = 1;
  for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
    var correlation = 0;

    for (var i = 0; i < MAX_SAMPLES; i++) {
      correlation += Math.abs(buf[i] - buf[i + offset]);
    }
    correlation = 1 - correlation / MAX_SAMPLES;
    correlations[offset] = correlation;
    if (
      correlation > GOOD_ENOUGH_CORRELATION &&
      correlation > lastCorrelation
    ) {
      foundGoodCorrelation = true;
      if (correlation > best_correlation) {
        best_correlation = correlation;
        best_offset = offset;
      }
    } else if (foundGoodCorrelation) {
      var shift =
        (correlations[best_offset + 1] - correlations[best_offset - 1]) /
        correlations[best_offset];
      return sampleRate / (best_offset + 8 * shift);
    }
    lastCorrelation = correlation;
  }
  if (best_correlation > 0.01) {
    return sampleRate / best_offset;
  }
  return -1;
}
var lastNote = "";
function updatePitch(i) {
  var cycles = new Array();
  analyser.getFloatTimeDomainData(buf);
  var ac = autoCorrelate(buf, audioContext.sampleRate);

  if (ac == -1) {
  } else {
    pitch = ac;
    var note = noteFromPitch(pitch);
    var curNote = noteStrings[note % 12];

    if (curNote != lastNote) {
      curNoteSequence += curNote;
      console.log(curNote, curNoteSequence);
      lastNote = curNote;
    } else {
    }
  }
}

function startAudio(i) {
  if (isPitchDetectionOn) {
    isPitchDetectionOn = false;
    clearInterval(intervalStream);
  } else {
    isPitchDetectionOn = true;
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();

    navigator.getUserMedia(
      { audio: true },
      stream => {
        mediaStreamSource = audioContext.createMediaStreamSource(stream);
        analyser.fftSize = 2048;
        mediaStreamSource.connect(analyser);
        const arrayUInt = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteTimeDomainData(arrayUInt);

        intervalStream = setInterval(() => {
          const array32 = new Float32Array(analyser.fftSize);
          analyser.getFloatTimeDomainData(array32);
          updatePitch(i);
        }, 500);
      },
      err => console.log(err)
    );
  }
}

var curNoteSequence;
function waitForToneSequence(i) {
  curNoteSequence = "";
  startAudio(i);
}
