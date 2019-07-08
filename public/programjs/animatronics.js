function moveMotor(motor, speed, rotation) {
  var data = {
    motor: motor,
    speed: speed,
    rotation: rotation
  };

  $.post("/moveMotor", data, function(data, status) {});
}

$(document).ready(function() {
  /* Animatronics Range Control */
  $(".motor-control").on("input", ".slider.speed-input", function() {
    let val = $(this).val();
    $("p.info.speed span").text(val);
  });

  $(".motor-control").on("input", ".slider.rotation-input", function() {
    let val = $(this).val();
    $("p.info.rotation span").text(val);
  });

  $("button.generate-motor-block").click(function() {
    let motor = $("input.motor-input").val();
    let speed = $("input.speed-input").val();
    let rotation = $("input.rotation-input").val();
    openActionsTab();
    $(".panel .block.motor input.motor").val(motor);
    $(".panel .block.motor input.speed").val(speed);
    $(".panel .block.motor input.rotation").val(rotation);
    $(".panel .block.motor").addClass("generate");
    setTimeout(function() {
      $(".panel .block.motor").removeClass("generate");
    }, 500);
  });

  $("button.test-motor-params").click(function() {
    let motor = $("input.motor-input").val();
    let speed = $("input.speed-input").val();
    let rotation = $("input.rotation-input").val();
    moveMotor(motor, speed, rotation);
  });
});
