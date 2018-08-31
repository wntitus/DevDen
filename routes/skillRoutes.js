var db = require("../models");

module.exports = function(app) {
  //GET route
  app.get("/api/skills", function(req, res) {
    db.Skill.findAll().then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/skills/:id", function(req, res) {
    bd.Skill.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/skills/:userid", function(req, res) {
    bd.Skill.findAll({
      where: {
        UserId: req.params.userid
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.put("/api/skills/:id", function(req, res) {
    db.Skill.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.delete("/api/skills/:id", function(req, res) {
    db.Skills.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });
};
