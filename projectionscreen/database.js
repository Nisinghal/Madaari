var ref = firebase.database().ref();

$(document).ready(function() {
  ref.on("value", function(data) {
    let change = data.val().projection;
    let avatar = change[0];
    let action = change[1];
    console.log(avatar, action);
    selectAction(avatar, action);
  });
});
