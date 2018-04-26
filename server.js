// Dependencies
// =============================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
//=============================================
// Tells node that we are creating an "express" server
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

//app.use('/static', express.static(path.join(__dirname, 'app/public')));

// Router
//These routes give our server a "map" of how to respond 
var apiRoutes = require("./app/routing/api-routes.js");
var htmlRoutes = require("./app/routing/html-routes.js");

//Server Routing Map
apiRoutes(app);
htmlRoutes(app);

//Listener
//below code starts our server

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});