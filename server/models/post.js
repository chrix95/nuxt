'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {         // User belongsTo Post n:n
        model: 'User',
        key: 'id'
      }
    },
    title: DataTypes.TEXT,
    subtitle: DataTypes.TEXT,
    slug: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    classMethods:{
      associate:function(models){
        Post.belongsTo(models.User, { foreignKey:'userId', foreignKeyConstraint:true, as: 'user'} );
      }
    }
  });
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};