'use strict'
var express = require('express'); 
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let apiRoutes = require("./routes/test.route.js")
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
    bodyParser.urlencoded({ extended: true });
    bodyParser.json();
    next();
});

app.use(express.static(process.env.SERVE_DIRECTORY || 'web'));

app.use('/', apiRoutes);


https.createServer(options, app).listen(port, function () {
    console.log("Running RestHub on  https://localhost:" + port);
});

secIO.on('connection', function(socket) {
    socketIO = socket;
	console.log('Un cliente se ha conectado');
    socketIO.on('userLogOut', function(data){
        secIO.emit("logOutUser", data);
    });
    socketIO.on('loginAndStatusUser', function(data){
        //console.log(data);
        secIO.emit("refreshUsers", data);
        sessionController.refresh(data, secIO);
    });
    socketIO.on('publicChat', function(data) {
        console.log('publicChat: ' + data);
        secIO.sockets.emit('publicChatResponses', data);
    });
    socketIO.on('privateChat', function(data) {
        console.log('privateChat: ' + data);
        secIO.sockets.emit(data.receiver, data);
    });
});

sessionController.expireSessions(secIO);

//mongoose.connect("mongodb://localhost/TestingDatas", { useNewUrlParser: true });
