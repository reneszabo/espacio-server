var mongoose = require('mongoose');
// Create a new schema for our ParkingLog data
var schema = new mongoose.Schema({
  time: {
    type: Number,
    default: function() {
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      var s = h+''+m;
      return s*1;
    }
  },
  status: { type: String, uppercase: true, trim: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Return a ParkingLog model based upon the defined schema
module.exports = ParkingLog = mongoose.model('ParkingLog', schema);
