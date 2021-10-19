const knex = require("knex");

const connectKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "eventsDb.sqlite3"
    }
})

module.exports = connectKnex
