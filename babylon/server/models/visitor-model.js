const Sequelize = require('sequelize');
const db = require('./_db');

const Visitor = db.define('visitor', {
  first: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE
  }
},{
  getterMethods: {
    date: function() {
      return this.getDataValue('date').toDateString()
    }
  }
});

module.exports = Visitor;
