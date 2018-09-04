require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var db = require("./models");
var generateMessage = require("./public/js/message");
var app = express();
var server = require("http").Server(app);
var PORT = process.env.PORT || 3000;

// socket.io Config=========================================================================================================================
// io(<port>) will create a http server
var io = require("socket.io")(server);

io.on("connection", function(socket) {
  console.log("new user connected");
  // message from admin "welcome to the message board"
  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the devDin message board ")
  );
  // broadcast call will alert every user that a new user has joined except for the user who joined
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  );
  // event listener for create message=======================================================================================================================
  socket.on("createMessage", function(message) {
    // making sure the event is going from client to server
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

// Middleware==============================================================================================================================
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/projectRoutes")(app);
require("./routes/skillRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  server.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
