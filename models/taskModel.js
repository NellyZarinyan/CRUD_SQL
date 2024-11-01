const db = require("../config/db");
const Sequelize = require('sequelize');

const Tasks = db.define(
    "task",
    {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Tasks;
