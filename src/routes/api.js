module.exports = function(io) {
  const express = require('express');
  const router = express.Router();
  const Parking = require('./../db/model/Parking');
  /* GET api listing. */
  router.get('/', function(req, res) {
    res.json({message: 'api works'});
  });

  router.route('/parking/change')
    .post(function(req, res) {
      console.log(req.body);
      var id = req.body.id || null;
      var status = req.body.status || null;
      Parking.getParking(id,function(data){
        console.log(data);
        if(data){
          data.logs.push({
            status: status
          });
          data.occupied = (status=='IN')? (data.occupied + 1) :(data.occupied - 1);
          if (data.occupied < 0) {
            data.occupied = 0;
          }
          data.save();
          var response = generateJson(data);
          io.emit('parking_change',response )
          res.json(response);
        }
      });
    });

  router.route('/parking')
    .post(function(req, res) {
      Parking.getParking(req.body.id,function(data){
        if(data){
          res.json(generateJson(data));
        }
      });
    });
  return router;
};


function generateJson(data){
  var leftSpace = (data.space - data.occupied);
  return  {id: data._id ,space: data.space, occupied: data.occupied, left: (leftSpace>=0?leftSpace:0) ,isFull: data.occupied>=data.space} ;
}