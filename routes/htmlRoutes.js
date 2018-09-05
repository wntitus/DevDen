var db = require("../models");

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

  //Trying to get name of owner of project and project information from one db hit
  app.get("/projects", function(req, res) {
    db.User.findAll({
      include: [
        {
          model: db.Project,
          as: "ownerId"
        }
      ]
    }).then(function(results) {
      console.log(results[0].ownerId[0].dataValues);
      console.log(results[0].ownerId[1].dataValues);
      // console.log(results[0].dataValues.ownerId);
      res.render("publicProjects", {
        project: results,
        layout: "bootstrap"
      });
    });
  });

  //Show Projects Page
  // app.get("/projects", function(req, res) {
  //   db.Project.findAll().then(function(results) {
  //     console.log(results[0].dataValues);
  //     // db.User.findOne({
  //     //   where: {
  //     //     id:
  //     //   }
  //     // })
  //     // console.log(results[0].dataValues);
  //     res.render("publicProjects", {
  //       project: results,
  //       layout: "bootstrap"
  //     });
  //   });
  // });

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
