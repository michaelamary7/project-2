module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end: {
        type: DataTypes.DATE,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    Event.associate = (models) => {
      Event.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };
  
    return Event;
  };