module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // owner: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
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
    // Project.hasOne(models.User, {
    //   as: "owner",
    //   foreignKey: "owner"
    // });
    // Project.hasMany(models.User, {
    //   onDelete: "cascade",
    //   as: "collaborator",
    //   foreignKey: "collaborator"
    // });
  };
  return Project;
};
