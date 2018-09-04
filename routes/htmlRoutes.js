var db = require("../models");

// var path = require("path");

module.exports = function(app) {
  // Load Home page
  app.get("/", function(req, res) {
    res.render("index", { layout: "main" });
  });

  app.get("/profile_test", function(req, res) {
    res.render("profile", { layout: "bootstrap" });
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
      },
      //using 'include' to join Project and Collaborators tables
      include: [
        {
          model: db.Collaborator,
          as: "projectCollaborator",
          //using 'include' to join Users table as well.
          include: [
            {
              model: db.User
            }
          ]
        }
      ]
    }).then(function(results) {
      //setting the returned value from the projects/collaborators join query to hbsCollab
      var hbsCollab = results.projectCollaborator;
      //Querying the Users table to find the owner of the project
      db.User.findOne({
        where: {
          id: results.dataValues.ownerId
        }
      }).then(function(UserRes) {
        //Setting the returned data from the Users table query to ownerResult
        var ownerResult = UserRes.dataValues;
        console.log(ownerResult);
        res.render(
          "projectView",

          {
            owner: ownerResult,
            project: results.dataValues,
            collaborator: hbsCollab,
            layout: "bootstrap"
          }
        );
      });
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
          as: "ownerId",
          where: {
            ownerId: req.params.id
          }
        }
      ]
    }).then(function(results) {
      res.render("profile", {
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
