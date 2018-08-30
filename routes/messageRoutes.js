var db = require("../models");

module.exports = function(app) {
//GET all messages
app.get("/api/messages", function(req, res) {
    db.Messages.findAll().then(function(result) {
        res.json(result);
    });
});

//GET one message
app.get("/api/messages/:id", function(req, res) {
    db.Messages.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(result) {
        res.json(result);
    });
});

//CREATE new message
app.post("/api/messages", function(req, res) {
    db.Messages.create(req.body.messageTitle).then(function(result) {
        res.json(result);
    });
});

//DELETE message
app.delete("/api/projects/:id", function(req, res) {
    db.Messages.destroy({ where: { id: req.params.id } }).then(function(result) {
        res.json(result);
    });
});

//UPDATE message
app.put("/api/messages/:id", function(req, res) {
    db.Messages.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(function(result) {
        res.json(result);
    });
});
}