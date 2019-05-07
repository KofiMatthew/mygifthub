module.exports = function(sequelize, DataTypes) {
  var Shared = sequelize.define("Shared", {
    ListId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    sharedTo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Shared.associate = function(models) {
    Shared.belongsTo(models.Lists, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Shared.associate = function(models) {
    Shared.belongsTo(models.Lists, {
      foreignKey:'id',
      onDelete: "cascade",
      foreignKeyConstraint:true
    });
  };
  return Shared;
};