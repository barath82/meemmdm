var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var utils = require('util');
var pemtools = require('pemtools')
var x509 = require('x509');

var genenrollonfig = require('../../GenEnrollConfig/genEnrollConfig');
var apnscerPath = path.join(__dirname + '/../../certs/push/PushCert.pem');
var apnscerUploadPath = path.join(__dirname + '/../../uploads/PushCert.pem');

//var apnscerUploadPath = "../../uploads/PushCert.pem";

var cmd_get_uid = utils.format("openssl x509 -noout -subject -in %s",apnscerPath);
var authentication = require('./authentication');
var cert = require('./certificate');


// var storage = multer.diskStorage({
// 	destination: function(req, file, callback) {
// 		callback(null, "./uploads")
// 	},
// 	filename: function(req, file, callback) {
// 		callback(null, "PushCert.pem")
// 	}
// })


// router.post('/',bodyParser.json() ,function(req, res) {

//     console.log("File upload");
// 	var upload = multer({
// 		storage: storage,
// 		fileFilter: function(req, file, callback) {
// 			var ext = path.extname(file.originalname)
// 			callback(null, true)
// 		}
// 	}).single('userFile');
// 	upload(req, res, function(err) {
//         res.end('File is uploaded')
//         fs.createReadStream(apnscerUploadPath).pipe(fs.createWriteStream(apnscerPath));

// 	})
// })

// parse application/x-www-form-urlencoded
// router.use(bodyParser.urlencoded({ extended: false }))
// router.use(bodyParser.json())
// router.use(bodyParser.text({type:"*/*"}));


// require('body-parser-xml')(bodyParser);

var sendAPNCertDetails = function(req, res){
    if (!req.body) return res.sendStatus(406)

    var tokenID = req.query.tokenID;

    console.log('Display iOS APN certificate');

    if(cert.verifyTokenID(tokenID, function(bool){
        if(bool){
                            
            console.log('Token: '+tokenID +' Verified');
            
            if (fs.existsSync(apnscerPath)) {

                var cert = x509.parseCert(apnscerPath);
        
            // var myJSON = JSON.stringify(cert);
                //console.log("myJSON: "+myJSON);
        
        
                console.log("email: ");
                console.log("organization: "+cert.issuer.organizationName);
                console.log("organization Unit: "+cert.issuer.organizationalUnitName);    
                console.log("appleID: ");
                console.log("certificatename: "+cert.subject.commonName);
                console.log("User ID: "+cert.subject.userId); 
                console.log("Country Name: "+ cert.subject.countryName);
                console.log("Serial No: "+ cert.subject.serial);
                console.log("creationdate: "+cert.notBefore);
                console.log("expirydate: "+cert.notAfter);
                console.log("notificationemail: ");
        
                var jsonresp = {
                    "email": "<string>",
                    "organization":cert.issuer.organizationName,
                    "appleID": "<string>",
                    "certificatename":cert.subject.commonName,
                    "UID": cert.subject.userId,
                    "creationdate":cert.notBefore,
                    "expirydate": cert.notAfter,
                    "notificationemail":"<string>"
                }
                res.status(200);
                res.send(jsonresp);
    
                authentication.addAPNCert(certJson);
            }
            else{

                console.log('File Dont Exist');
                res.sendStatus(404)
            }
    

        } else{
        
            console.log('Token: '+tokenID +' Mismatch');
            res.sendStatus(404);
        }
    }));


};

router.get('/',sendAPNCertDetails);




module.exports = router;

