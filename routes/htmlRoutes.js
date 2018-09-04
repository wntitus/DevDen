var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// var path = require("path");

module.exports = function(app) {
  // Load Home page
  app.get("/", function(req, res) {
    res.render("index", { layout: "main" });
  });

  app.get("/create_project", function(req, res) {
    res.render("projectCreate", { layout: "main" });
  });

  app.get("/profile_test", function(req, res) {
    res.render("profile", { layout: "bootstrap" });
  });

  //Show Projects Page
  app.get("/projects", isAuthenticated, function(req, res) {
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
      },
      include: [
        {
          model: db.Collaborator,
          as: "projectCollaborator",
          include: [
            {
              model: db.User
            }
          ]
        }
      ]
    }).then(function(results) {
      var hbsCollab = results.projectCollaborator;
      // console.log(hbsCollab);
      console.log(hbsCollab[0].dataValues.User.dataValues);
      res.render(
        "projectView",

        {
          project: results.dataValues,
          collaborator: hbsCollab,
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
      },
      include: [
        {
          model: db.Project,
          as: "ownerId"
        }
      ]
    }).then(function(results) {
      var hbsOwnerId = results.ownerId;
      console.log(hbsOwnerId);
      // console.log(hbsOwnerId.dataValues.image);
      // console.log(results.dataValues.ownerId[0].dataValues.projectName);

      res.render("profile", {
        project: hbsOwnerId,
        user: results.dataValues,
        layout: "bootstrap"
      });
    });
  });

  //Show Messages Page
  app.get("/messages", function(req, res) {
    db.Messages.findAll().then(function(results) {
      res.render("message-board", {
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
