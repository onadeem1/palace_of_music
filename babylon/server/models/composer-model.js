const Sequelize = require('sequelize');
const db = require('./_db');

const Composer = db.define('composer', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    timeperiod:{
        type: Sequelize.STRING
    },
    born:{
      type: Sequelize.STRING
    },
    birthCountry:{
      type: Sequelize.STRING
    },
    meshName:{
      type: Sequelize.STRING
    }
});

module.exports = Composer;
