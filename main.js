'use strict'
var express = require('express'); 
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
var app = express();
let apiRoutes = require("./routes/test.route.js")
var sessionController = require('./controllers/sessionController');
var fs = require('fs');
var https = require('https');

var options = {
    key: fs.readFileSync('./sec/file.pem'),
    cert: fs.readFileSync('./sec/file.crt')
  };
var securityServerPort = 443;

var server = require('http').Server(app);
var securityServer = https.createServer(options, app);

var socketPort = process.env.PORT || 3031;
var socketIO;

var secIO = require('socket.io')(securityServer);

//var io = require('socket.io')(server, { origins: '*:*', forceNew: true });

/*server.listen(socketPort, function() {
	console.log('socket server running on 3031 port');
});*/

securityServer.listen(securityServerPort, function() {
	console.log('socket server running on '+securityServerPort+' port');
});

secIO.on('connection', function(socket) {
    socketIO = socket;
	console.log('Un cliente se ha conectado');
    socketIO.on('userLogOut', function(data){
        secIO.emit("logOutUser", data);
    });
    socketIO.on('loginAndStatusUser', function(data){
        secIO.emit("refreshUsers", data);
        sessionController.refresh(data, secIO);
    });
});

sessionController.expireSessions(secIO);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "'GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//mongoose.connect("mongodb://localhost/TestingDatas", { useNewUrlParser: true });

var port = process.env.PORT || 8080;

app.use('/', apiRoutes);

app.use(express.static('web'));

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});