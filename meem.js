var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var device = require('./server/controllers/device')

require('./server/models/dbconfig');

var routesApi = require('./server/routes/index');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Use the API routes when path starts with /api
app.use('/meem', routesApi);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




/*** Device MDM ***/

var fs = require('fs');
// const router = require('./device/routes/index');

// //  Connect all our routes to our application

// app.use('/device', router);


 
/* File Upload*/
var multer = require('multer');
var apnscerPath = "./certs/push/PushCert.pem";
var apnscerUploadPath = "./uploads/PushCert.pem";
var genenrollonfig = require('./GenEnrollConfig/genEnrollConfig');

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./uploads")
	},
	filename: function(req, file, callback) {
		callback(null, "PushCert.pem")
	}
})


app.post('/applepemupload',bodyParser.json() ,function(req, res) {

    console.log("File upload");
	var upload = multer({
		storage: storage,
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname)
			callback(null, true)
		}
	}).single('userFile');
	upload(req, res, function(err) {
        fs.createReadStream(apnscerUploadPath).pipe(fs.createWriteStream(apnscerPath));
        genenrollonfig.entrypoint(function(status){

            if(status){

                console.log("******* Enroll Config Generated ******* ");
                res.status(200);
                res.send('File is uploaded. Use the link to enroll a device, https://192.168.0.9:8080/meem/device/checkin/enroll');


             }else{
                console.log("Enroll Config Generation failed");
                res.sendStatus(404); 

             }
        });

	})
})

/*Done */

/*Root*/
app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname + '/index.html'));
    
});
/*End */

//var key = fs.readFileSync('./certs/ssl/Server.key');
//var cert = fs.readFileSync('./certs/ssl/Server.crt');
//var ca = fs.readFileSync('./certs/ssl/CA.crt');
//
//var options = {
//  key: key,
//  cert: cert,
//  ca: ca
//};

var http = require('http');
http.createServer( app).listen(8080);

module.exports = app;
