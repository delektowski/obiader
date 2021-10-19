const knex = require("./knex");
const { createTableName } = require("../utils/createTableName");

function getAllMonthEvents() {
  return knex(createTableName()).select("*")
}

async function createEvent(event) {
  await createTable(createTableName())
  return knex(createTableName()).insert(event)
}

function createTable(tableName) {
  
  knex.schema.hasTable(tableName).then((exists) => {
    if (!exists) {
      return knex.schema.createTable(tableName, function (table) {
        table.string("id");
        table.string("title");
        table.string("start");
        table.string("end");
        table.boolean("allDay");
      });
    }
  });
}

module.exports = {
  createEvent,
  getAllMonthEvents,
  createTable,
};
