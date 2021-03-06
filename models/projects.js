module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // rs
    collabInvite: {
      type: DataTypes.STRING
    },
    collabReq: {
      type: DataTypes.STRING
    },
    collaborators: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    projectDescription: {
      type: DataTypes.TEXT
    }
  });
  Project.associate = function(models) {
    Project.hasMany(models.Collaborator, {
      as: "projectCollaborator",
      foreignKey: "ProjectId"
    });
  };
  return Project;
};
