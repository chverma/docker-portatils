require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
/*db.sequelize.sync({ force: true }).then(() => {
   console.log("Drop and re-sync db.");
});*/


app.use(express.static('./app/static'));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to portatils application." });
});

require("./app/routes/portatil.routes")(app);
require("./app/routes/ddosrequests.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});