$(document).ready(function() {
  var regModal = $("#signup-modal");
  var logModal = $("#login-modal");
  var regBtn = $(".signup-button");
  var logLink = $(".log-in-link");
  var span = $(".close");

  regBtn.on("click", function() {
    regModal.css("display", "block");
  });

  logLink.on("click", function() {
    logModal.css("display", "block");
  });

  span.on("click", function() {
    regModal.css("display", "none");
    logModal.css("display", "none");
  });

  window.onclick = function(event) {
    if (event.target === modal) {
      regModal.css("display", "none");
    }
  };
});
