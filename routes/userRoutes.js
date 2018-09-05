var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/profile_test",
      failureRedirect: "/"
    })
  );

  app.get("/api/users", function(req, res) {
    db.User.findAll().then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.post("/register", function(req, res) {
    db.User.create(req.body).then(function(result) {
      res.redirect("/user/" + result.id);
      // res.json(result);
      // console.log("post to /register in userRoutes.js line 32");
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  //Adding this back in for the time being to utilize Postman==================================================================================================================
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(result) {
      res.json(result);
    });
  });
  //Can be removed after deployment==================================================================================================================
};
