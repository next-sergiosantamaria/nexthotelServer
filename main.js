'use strict'
var express = require('express'); 
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let apiRoutes = require("./routes/routes.js")
var sessionController = require('./controllers/sessionController');
var fs = require('fs');
var https = require('https');
var socketIO;

var options = {
    key: fs.readFileSync('./sec/file.pem'),
    cert: fs.readFileSync('./sec/file.crt'),
    passphrase: process.env.HTTPS_PASSPHRASE || ''
};

var app = express();

var securityServerPort = process.env.PORT || 3031;

var port = process.env.API_PORT || 8080;

var securityServer = https.createServer(options, app);

var secIO = require('socket.io')(securityServer);

securityServer.listen(securityServerPort, function() {
	console.log('socket server running on '+securityServerPort+' port');
});

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

app.use(express.static(process.env.SERVE_DIRECTORY || 'web'));

app.use('/', apiRoutes);


https.createServer(options, app).listen(port, function () {
    console.log("Running RestHub on  https://localhost:" + port);
});

secIO.on('connection', function(socket) {
    socketIO = socket;
    socketIO.on('userLogOut', function(data){
        secIO.emit("logOutUser", data);
    });
    socketIO.on('loginUser', function(data){
        sessionController.addNewUser(data);
        secIO.emit("newUserLogin", sessionController.recoverUsers());
    });
    socketIO.on('StatusUser', function(data){
        secIO.emit("refreshUsers", data);
        sessionController.refreshUserPosition(data);
    });
    socketIO.on('publicChat', function(data) {
        secIO.sockets.emit('publicChatResponses', data);
    });
    socketIO.on('privateChat', function(data) {
        secIO.sockets.emit(data.receiver, data);
    });
    socketIO.on('sendLogOutUser', function(data){
        secIO.emit("logOutUser", data);
        sessionController.removeUser(data);
    });
});

sessionController.expireSessions(secIO);

mongoose.connect("mongodb://localhost/hotelUsersData", { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));
