const express = require("express");
const app = express();
const db = require("./db/service");
const cors = require("cors")
const { createTableName } = require("./utils/createTableName");
const port = 2021;

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const allowedOrigins = ['http://localhost:3000',
  'https://obiader.vercel.app/'];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin)
      return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.get("/eventsData", async (req, res) => {
  try {
    const eventsData = await db.getAllMonthEvents();
    res.status(200).json({ eventsData });
  } catch (err) {
    console.log("Error GET eventsData: ", err);
  }
});

app.post("/eventsData", async (req, res) => {
  try {
    await db.createEvent(req.body);
    res.status(200).json(req.body);
  } catch (err) {
    console.log("Error POST eventsData: ", err);
  }
});

app.post("/createTable", async (req, res) => {
  try {
    await db.createTable(createTableName());
    res.status(200).json(req.body);
  } catch (err) {
    console.log("Error POST createTable: ", err);
  }
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
