var mongoose = require('mongoose');
var User = mongoose.model('user');

module.exports.addAPNCert = function(certAPN){
    User.findOne({'apnCert.email' : certAPN.email} , 'apnCert', function(err, apnCerti){
        apnCerti.setAPNCert(certAPN)

        apnCerti.save(function(err){
            if(err)
                console.log('Error while saving the APN cert');
                else{
                    console.log('SUCCESSFULY stored the certificate detail')
                }
        });
    })
}


module.exports.verifyTokenID = function(tokenID, cb){

    cb(true);

}