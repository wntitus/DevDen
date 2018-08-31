$(document).ready(function() {
  var modal = $("#signup-modal");
  var btn = $(".signup-button");
  var span = $(".close");

  btn.on("click", function() {
    modal.css("display", "block");
  });

  span.on("click", function() {
    modal.css("display", "none");
  });

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.css("display", "none");
    }
  };
});
