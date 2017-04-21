// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Base Libs
// --- ------------------------------------------------------------------------------------------------------------- ---
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
require('dotenv').config();
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Extra Libs
// --- ------------------------------------------------------------------------------------------------------------- ---
const port = process.env.PORT || '3000';
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Mongo Config - Mongoose
// --- ------------------------------------------------------------------------------------------------------------- ---
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/parking');
mongoose.Promise = global.Promise;
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Express Settings
// --- ------------------------------------------------------------------------------------------------------------- ---
app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../dist')));
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Express Render Endpoints
// --- ------------------------------------------------------------------------------------------------------------- ---
const api = require('./routes/api')(io);
app.use('/api', api);
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- RENDER SITE
// --- ------------------------------------------------------------------------------------------------------------- ---
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Socket IO Settings
// --- ------------------------------------------------------------------------------------------------------------- ---
io.on('connection', function (socket) {
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Global Functions
// --- ------------------------------------------------------------------------------------------------------------- ---
server.listen(port, function() {
  var addr = server.address();
  console.log("Our server is listening at", addr.address + ":" + addr.port);
});

// create parking

// var Parking = require('./db/model/Parking');
// var p = new Parking({
//   name: "Salsa Parking",
//   address: "185 Spadina Ave, Toronto, ON M5T 2C6, Canada",
//   space: 8,
//   occupied: 0,
//   geo: [43.649625, -79.396276]
// });
// p.save();
var c = 0;
var mockOccupied = 0;

setInterval(function(){
  c++;
  var rand = Math.random();
  if(rand>0.5){
    // mock entry
    mockOccupied++;
  }else{
    mockOccupied--;
    // mock exit
  }
  if(mockOccupied < 0){
    mockOccupied = 0;
  }
  if(mockOccupied > 8){
    mockOccupied--;
  }
  console.log('send data ' + c);
  io.emit('data', {id: "58f1bc74f3d54f52b2c36aa2", space: 8, occupied: mockOccupied, left: (8-mockOccupied), isFull: (mockOccupied>=8), mockId: c });
},2000);