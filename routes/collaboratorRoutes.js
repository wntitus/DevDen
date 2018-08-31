var db = require("../models");

module.exports = function(app) {
  app.get("/api/collaborators", function(req, res) {
    db.Collabs.findAll().then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/collaborators/:id", function(req, res) {
    db.Collabs.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.post("/api/collaborators/:id", function(req, res) {
    db.Collabs.create(req.body.body).then(function(result) {
      res.json(result);
    });
  });

  app.put("/api/collaborators/:id", function(req, res) {
    db.Collabs.update(req.body, {
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
    db.Collabs.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });
};
