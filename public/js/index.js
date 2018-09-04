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

  var socket = io.connect();

  socket.on("connect", function() {
    console.log("connected to server");
  });
  socket.on("newMessage", function(message) {
    console.log("new message", message);
    var li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    $("#forum-messages").append(li);
  });
  // socket.on("newlocationMessage", function (message) {
  //   var li = $("<li></li>");
  //   var anchor = $("<a target="_blank">My Current Location</a>");

  //  li.text(`${message.from}: `); anchor.attr("href", message.url);
  //   li.append(anchor); $("#forum-messages").append(li);
  // });

  socket.on("disconnect", function() {
    console.log("disconnected from server");
  });

  $("#message-form").on("submit", function(event) {
    event.preventDefault();
    socket.emit("createMessage", {
      from: "user",
      text: $("[name=message]").val()
    });
  });
  var locationBtn = $("#send-location");
  locationBtn.on("click", function() {
    if (!navigator.geolocation) {
      return alert("Geolcation not supported by your browser.");
    }

    // navigator.geolocation.getCurrentPosition(function (position) {
    //   socket.emit("createLocationMessage", {
    //     lat: position.coords.latitude,
    //     long: position.coords.longitude
    //   });
    // }, function () {
    //   alert("Unable to get location");
    // });
  });
});
