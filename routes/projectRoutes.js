var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/projects", function(req, res) {
    db.Project.findAll().then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/projects/:id", function(req, res) {
    db.Project.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Collaborator]
    }).then(function(result) {
      console.log(result);
      res.json(result);
    });
  });

  app.post("/api/projects", function(req, res) {
    console.log(req.body);
    db.Project.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  app.delete("/api/projects/:id", function(req, res) {
    db.Project.destroy({ where: { id: req.params.id } }).then(function(result) {
      res.json(result);
    });
  });

  app.put("/api/projects/:id", function(req, res) {
    db.Project.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });
};
