var db = require("../models");

// var path = require("path");

module.exports = function(app) {
  // Load Home page
  app.get("/", function(req, res) {
    res.render("index", { layout: "main" });
  });

  app.get("/profile_test", function(req, res) {
    res.render("profile", { layout: "main2" });
  });

  //Login Page
  app.get("/login", function(req, res) {
    res.render("?");
  });

  //Show Projects Page
  app.get("/projects", function(req, res) {
    db.Project.findAll().then(function(results) {
      console.log(results[0].dataValues);
      res.render("publicProjects", {
        project: results,
        layout: "bootstrap"
      });
    });
  });

  //Show individual Project View
  app.get("/project/:id", function(req, res) {
    db.Project.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.render(
        "projectView",

        {
          project: results,
          layout: "bootstrap"
        }
      );
    });
  });

  //Profile Page
  app.get("/user/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      console.log(results.dataValues);
      res.render("profile", {
        user: results.dataValues,
        layout: "bootstrap"
      });
    });
  });

  //Show Messages Page
  app.get("/messages", function(req, res) {
    db.Messages.findAll().then(function(results) {
      res.render("?", {
        messages: results,
        layout: "bootstrap"
      });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
      res.render("404");
    });
  });
};
