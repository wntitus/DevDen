var db = require("../models");
var moment = require("moment");
// var path = require("path");

module.exports = function(app) {
  // Load Home page
  app.get("/", function(req, res) {
    res.render("index", { layout: "main" });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/create_project", function(req, res) {
    res.render("projectCreate", { layout: "main" });
  });

  app.get("/profile_test", function(req, res) {
    res.render("profile", { layout: "bootstrap" });
  });

  //Show Projects Page
  app.get("/projects", function(req, res) {
    db.Project.findAll().then(function(results) {
      for (var i = 0; i < results.length; i++) {
        var timetime = moment(results[i].createdAt)
          .startOf("day")
          .fromNow();
        results[i].timeAdded = timetime;
      }
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
        // var timetime = moment(results.dataValues.createdAt)
        //   .startOf("day")
        //   .fromNow();
        // results.timeAdded = timetime;
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
          as: "ownerId"
        }
      ]
    }).then(function(results) {
      var hbsOwnerId = results.ownerId;
      // console.log(hbsOwnerId);
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
  app.get("/joinChat", function(req, res) {
    res.render("joinChat", { layout: "bootstrap" });
  });

  //Settings Page
  app.get("/settings/:id", function(req, res) {
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
          "settings",

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
};
