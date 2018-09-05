$(document).ready(function () {
  var regModal = $("#signup-modal");
  var logModal = $("#login-modal");
  var regBtn = $(".signup-button");
  var logLink = $(".log-in-link");
  var span = $(".close");

  regBtn.on("click", function () {
    regModal.css("display", "block");
  });

  logLink.on("click", function () {
    logModal.css("display", "block");
  });

  span.on("click", function () {
    regModal.css("display", "none");
    logModal.css("display", "none");
  });

  window.onclick = function (event) {
    if (event.target === modal) {
      regModal.css("display", "none");
    }
  };

  var socket = io.connect();

  socket.on("connect", function () {
    

    console.log("connected to server");

  });
  socket.on("newMessage", function (message) {
    var formatTime = moment(message.createdAt).format("h:mm");
    console.log("new message", message);
    var h4 = $("<h4></h4>");
    var p = $("<p></p>");
    h4.text(`${message.from}: ${formatTime}`);
    p.text(`${message.text}`);
    $("#message-body").append(h4).append(p);
  });

  socket.on("disconnect", function () {
    console.log("disconnected from server");
  });

  $("#message-form").on("submit", function (event) {
    event.preventDefault();
    socket.emit("createMessage", {
      from: "user",
      text: $("[name=message]").val()
    }, function () {
      $("[name=message]").val("")
    });
  });

})