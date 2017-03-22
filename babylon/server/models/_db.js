const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/palace_of_music', {
    logging: false
});

module.exports = db;
