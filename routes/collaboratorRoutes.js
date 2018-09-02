var db = require("../models");

module.exports = function(app) {
  app.get("/api/collaborators", function(req, res) {
    db.Collaborator.findAll().then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/collaborators/:id", function(req, res) {
    db.Collaborator.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.post("/api/collaborators", function(req, res) {
    db.Collaborator.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  app.put("/api/collaborators/:id", function(req, res) {
    db.Collaborator.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.delete("/api/collaborators/:id", function(req, res) {
    //Need to change this to db.Project.destroy? Thinking that removing a collaborator only
    //removes them from a project, not the collaborator table.
    db.Collaborator.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });
};
