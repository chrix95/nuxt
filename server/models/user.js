'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods:{
      associate:function(models){
        User.hasMany(models.Post, { as: 'posts'} );
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};