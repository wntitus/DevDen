$(document).ready(function() {
  var regModal = $("#signup-modal");
  var logModal = $("#login-modal");
  var regBtn = $(".signup-button");
  var logLink = $(".log-in-link");
  var span = $(".close");
  var modal = $("#settingsModal");

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

  var socket = io.connect();
  var room = "javascript";

  // socket.on("join", function (room) {
  //   console.log("join",room);

  //   socket.join(room,function(){
  //     console.log(sockets.rooms);
  //   });

  // });
  socket.on("connect", onConnect);
  function onConnect() {
    console.log("connected");
    socket.emit("join", room);
  }
  socket.on("newMessage", function(message) {
    var formatTime = moment(message.createdAt).format("h:mm");
    console.log("new message", message);
    var h4 = $("<h4></h4>");
    var p = $("<p></p>");
    h4.text(`${message.from}: ${formatTime}`);
    p.text(`${message.text}`);
    $("#message-body")
      .append(h4)
      .append(p);
  });

  socket.on("disconnect", function() {
    console.log("disconnected from server");
  });

  $("#message-form").on("submit", function(event) {
    event.preventDefault();
    socket.emit(
      "createMessage",
      {
        from: "user",
        text: $("[name=message]").val()
      },
      function() {
        $("[name=message]").val("");
      }
    );
  });
});
