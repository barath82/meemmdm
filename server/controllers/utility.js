var mongoose = require('mongoose');
var express = require('express');
var router =  express.Router();

router.post('/erase', function(req, res){
    mongoose.connection.db.dropDatabase(function(err){
        if(!err){
            console.log('The database erased!')
            res.sendStatus(200)
        } else{
            console.log('Error while erasing the database'+err)
            res.sendStatus(404)
        }   
    });
})

module.exports = router;