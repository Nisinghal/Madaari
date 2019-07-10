function moveMotor(motor, speed, rotation) {
  var data = {
    motor: motor,
    speed: speed,
    rotation: rotation
  };

  $.post("/moveMotor", data, function(data, status) {});
  postMessage(
    `Animatronics command for motor ${motor}. Rotation: ${rotation}, Speed: ${speed}`
  );
}
