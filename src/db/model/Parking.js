var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var ParkingLog = require('./ParkingLog');
// Create a new schema for our parking data
var schema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  space: { type: Number, required: true, default: 0 },
  occupied: { type: Number, required: true, default: 0 },
  updated: { type: Date, default: Date.now },
  geo: {
    type: [Number],
    index: '2d'
  },
  logs: [ParkingLog.schema]
});

// schema.statics.getParkings = function(page, skip, callback) {
//   var parkings = [];
//   var start = (page * 10) + (skip * 1);
//   // Query the db, using skip and limit to achieve page chunks
//   Parking.find(
//     {},
//     'twid active author avatar body date screenname',
//     {skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err, docs) {
//     // If everything is cool...
//     if (!err) {
//       parkings = docs;  // We got Parking
//     }
//     // Pass them back to the specified callback
//     callback(parkings);
//   });
// };

schema.statics.getParking = function(id, callback) {
  var parking = null;
  // Query the db, using skip and limit to achieve page chunks
  Parking.findOne({_id:ObjectId(id)},function(err, docs) {
    // If everything is cool...
    if (!err) {
      parking = docs;  // We got Parking
    }
    // Pass them back to the specified callback
    callback(parking);
  });
};


// Return a Parking model based upon the defined schema
module.exports = Parking = mongoose.model('Parking', schema);
