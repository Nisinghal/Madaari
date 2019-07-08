function moveMotor(motor, speed, rotation) {
  var data = {
    motor: motor,
    speed: speed,
    rotation: rotation
  };

  $.post("/moveMotor", data, function(data, status) {});
  postMessage(
    `Animatronics motor move command for motor ${motor}. Rotation: ${rotation} and Speed: ${speed}`
  );
}
