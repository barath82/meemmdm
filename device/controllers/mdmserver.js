var express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var certificate = require('../../server/controllers/certificate');
var profile = require('../../server/controllers/profile');
var authentication = require('../../server/controllers/authentication');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.text({type: 'text/html' }))

// parse application/json
router.use(bodyParser.json())
router.use(bodyParser.text({type:"*/*"}));


require('body-parser-xml')(bodyParser);

var path = require('path');
var multer = require('multer')

var app = express();
var fs = require('fs');
var plist = require('plist');

var apn = require('apn');
var converter = require('atob');

const uuid = require('uuid/v1');

var plistQueue = [];

var emailaccname = "";
var emailaddr = "";

var allowcamera = false; 
var allowdocsharing = false; 
var allowScreenShot = false;


router.get('/command-list', function(req, res) {
  res.sendFile(path.join(__dirname + '/../static/sendcommand.html'));
});

router.get('/profile-list', function(req, res) {
  res.sendFile(path.join(__dirname + '/../static/setprofile.html'));
});


function sendCommandPlist(req, res) {
	
	var command = plistQueue.shift();

	console.log("cmd to be sent :", command);								

	if(command == "deviceinfo"){
		var dict = {"RequestType":"DeviceInformation","Queries":["AvailableDeviceCapacity","BluetoothMAC","BuildVersion","CarrierSettingsVersion","CurrentCarrierNetwork","CurrentMCC","CurrentMNC","DataRoamingEnabled","DeviceCapacity","DeviceName","ICCID","IMEI","IsRoaming","Model","ModelName","ModemFirmwareVersion","OSVersion","PhoneNumber","Product","ProductName","SIMCarrierNetwork","SIMMCC","SIMMNC","SerialNumber","UDID","WiFiMAC","UDID"]};
		createMDMCommand(req,res,dict);
	} else if(command == "devicelock"){
		var dict = {"RequestType": "DeviceLock"};
		createMDMCommand(req,res,dict);

	} else if(command == "erasedevice"){
	} else if(command == "clearpasscode"){
		// var myObj = plist.parse(fs.readFileSync('./plists/checkin/TokenUpdate.plist', 'utf8'));
		// var data = myObj["plist"]["dict"]["data"];
		// let unlockToken = data[1];
		// let hexUnlockToken = Buffer.from(unlockToken, 'base64').toString('hex');
		//var dict = {"RequestType": "ClearPasscode","UnlockToken":unlockToken};
		var dict = {"RequestType": "ClearPasscode"};
		createMDMCommand(req,res,dict);
	} else if(command == "certificatelist"){
		
		var dict = {"RequestType": "CertificateList"};
		createMDMCommand(req,res,dict);
		
	} else if(command == "provisioningprofilelist"){
			
		var dict = {"RequestType": "ProvisioningProfileList"};
		createMDMCommand(req,res,dict);
	
	} else if(command == "installedapplicationlist"){
		
		var dict = {"RequestType": "InstalledApplicationList"};
		createMDMCommand(req,res,dict);
	
	} else if(command == "managedapplicationlist"){
		
		var dict = {"RequestType": "ManagedApplicationList"};
		createMDMCommand(req,res,dict);
	
	} else if(command == "profilelist"){
			
		var dict = {"RequestType": "ProfileList"};
		createMDMCommand(req,res,dict);
	
	} else if(command == "restrictions"){
		
		var dict = {"RequestType": "Restrictions"};
		createMDMCommand(req,res,dict);
	
	} else if(command == "securityinfo"){
		
		var dict = {"RequestType": "SecurityInfo","Queries":["HardwareEncryptionCaps","PasscodePresent","PasscodeCompliant","PasscodeCompliantWithProfiles"]};
		createMDMCommand(req,res,dict);
	
	} else if(command == "installmyapplication"){
		
		//var dict = {"ChangeManagementState":"Managed","ManagementFlags" : 1,"options":{"PurchaseMethod":1},"RequestType": "InstallApplication","iTunesStoreID":1040757085};
		var dict = {"ChangeManagementState":"Managed","ManagementFlags" : 1,"options":{"PurchaseMethod":1},"RequestType": "InstallApplication","ManifestURL":"https://192.168.0.9:8080/meem/device/managedapp/manifest.plist"};

		createMDMCommand(req,res,dict);
	
	} else if(command == "removeapplication"){
		
		var dict = {"RequestType":"RemoveApplication","Identifier":"com.meemgdpr.mdm"};
		createMDMCommand(req,res,dict);

	}
	else if(command == "addmanagedemail"){

		var emailplist = './plists/mdmprofiles/Email.plist';

		var plistfile = fs.readFileSync(emailplist);
		
		//var emailJson = {"PayloadContent":[{"EmailAccountDescription":"MDM MAIL ACC","EmailAccountName":emailaccname,"EmailAccountType":"EmailTypeIMAP","EmailAddress":emailaddr,"IncomingMailServerAuthentication":"EmailAuthNone","IncomingMailServerHostName":"imap.gmail.com","IncomingMailServerPortNumber":993,"IncomingMailServerUseSSL":true,"IncomingMailServerUsername":emailaddr,"OutgoingMailServerAuthentication":"EmailAuthNone","OutgoingMailServerHostName":"smtp.gmail.com  ","OutgoingMailServerPortNumber":465,"OutgoingMailServerUseSSL":true,"OutgoingMailServerUsername":emailaddr,"OutgoingPasswordSameAsIncomingPassword":true,"PayloadDescription":"Configures Email settings","PayloadDisplayName":"MEEM MAIL ACC","PayloadIdentifier":"com.apple.mail.managed.7181B285-8377-48DF-AD50-E2C59479050A","PayloadType":"com.apple.mail.managed","PayloadUUID":"7181B285-8377-48DF-AD50-E2C59479050A","PayloadVersion":1,"PreventMove":true,"SMIMEEnablePerMessageSwitch":false,"SMIMEEnabled":false,"SMIMEEncryptionEnabled":false,"SMIMESigningEnabled":false,"allowMailDrop":false,"disableMailRecentsSyncing":true}],"PayloadDisplayName":"EmailProfile","PayloadIdentifier":"com.apple.applicationaccess.example","PayloadOrganization":"Meem pvt ltd","PayloadRemovalDisallowed":false,"PayloadType":"Configuration","PayloadUUID":"D6B2474D-A8AF-4668-AA74-358C7250B2FF","PayloadVersion":1}
		//var plistfile = plist.build(emailJson);

    // convert binary data to base64 encoded string
    	var profilebase64data = new Buffer(plistfile).toString('ascii');

		createMDMProfile(req,res,profilebase64data);
	}
	else if(command == "addrestrictions"){

		//var plistfile = fs.readFileSync('./plists/mdmprofiles/Restriction.plist');

		var restrictionsJson = {"PayloadContent":[{"PayloadDescription":"Configures restrictions","PayloadDisplayName":"Restrictions","PayloadIdentifier":"com.apple.applicationaccess.0BCCB6B5-3C5D-4F45-A5F0-0997C56570A6","PayloadType":"com.apple.applicationaccess","PayloadUUID":"0BCCB6B5-3C5D-4F45-A5F0-0997C56570A6","PayloadVersion":1,"allowActivityContinuation":true,"allowAddingGameCenterFriends":true,"allowAirDrop":true,"allowAirPlayIncomingRequests":true,"allowAirPrint":true,"allowAirPrintCredentialsStorage":true,"allowAirPrintiBeaconDiscovery":true,"allowAppCellularDataModification":true,"allowAppInstallation":true,"allowAppRemoval":true,"allowAssistant":true,"allowAssistantWhileLocked":true,"allowAutoCorrection":true,"allowAutomaticAppDownloads":true,"allowBluetoothModification":true,"allowBookstore":true,"allowBookstoreErotica":true,"allowCamera":allowcamera?true:false,"allowCellularPlanModification":true,"allowChat":true,"allowCloudBackup":true,"allowCloudDocumentSync":true,"allowCloudPhotoLibrary":true,"allowDefinitionLookup":true,"allowDeviceNameModification":true,"allowDictation":true,"allowEnablingRestrictions":true,"allowEnterpriseAppTrust":true,"allowEnterpriseBookBackup":true,"allowEnterpriseBookMetadataSync":true,"allowEraseContentAndSettings":true,"allowExplicitContent":true,"allowFingerprintForUnlock":true,"allowFingerprintModification":true,"allowGameCenter":true,"allowGlobalBackgroundFetchWhenRoaming":true,"allowInAppPurchases":true,"allowKeyboardShortcuts":true,"allowManagedAppsCloudSync":true,"allowMultiplayerGaming":true,"allowMusicService":true,"allowNews":true,"allowNotificationsModification":true,"allowOpenFromManagedToUnmanaged":allowdocsharing?true:false,"allowOpenFromUnmanagedToManaged":allowdocsharing?true:false,"allowPairedWatch":true,"allowPassbookWhileLocked":true,"allowPasscodeModification":true,"allowPhotoStream":true,"allowPredictiveKeyboard":true,"allowProximitySetupToNewDevice":true,"allowRadioService":true,"allowRemoteAppPairing":true,"allowRemoteScreenObservation":true,"allowSafari":true,"allowScreenShot":allowScreenShot,"allowSharedStream":true,"allowSpellCheck":true,"allowSpotlightInternetResults":true,"allowSystemAppRemoval":true,"allowUIAppInstallation":true,"allowUIConfigurationProfileInstallation":true,"allowUntrustedTLSPrompt":true,"allowVPNCreation":true,"allowVideoConferencing":true,"allowVoiceDialing":true,"allowWallpaperModification":true,"allowiTunes":true,"forceAirDropUnmanaged":false,"forceAirPrintTrustedTLSRequirement":false,"forceAssistantProfanityFilter":false,"forceAuthenticationBeforeAutoFill":true,"forceClassroomAutomaticallyJoinClasses":false,"forceClassroomUnpromptedAppAndDeviceLock":false,"forceClassroomUnpromptedScreenObservation":false,"forceEncryptedBackup":false,"forceITunesStorePasswordEntry":false,"forceWatchWristDetection":false,"forceWiFiWhitelisting":false,"ratingApps":1000,"ratingMovies":1000,"ratingRegion":"us","ratingTVShows":1000,"safariAcceptCookies":2,"safariAllowAutoFill":true,"safariAllowJavaScript":true,"safariAllowPopups":true,"safariForceFraudWarning":false,"whitelistedAppBundleIDs":["com.meem.cable"]}],"PayloadDisplayName":"Untitled","PayloadIdentifier":"com.apple.applicationaccess.restrctions","PayloadRemovalDisallowed":false,"PayloadType":"Configuration","PayloadUUID":"3805730B-8D44-4317-B4B9-0C17411A057C","PayloadVersion":1}
		var plistfile = plist.build(restrictionsJson);

		// convert binary data to base64 encoded string
		var profilebase64data = new Buffer(plistfile).toString('ascii');
		createMDMProfile(req,res,profilebase64data);

	}
	else if (command == "delmanagedemail") {

		deleteMDMProfile(req,res,"com.apple.applicationaccess.0e26b6b1-4f7b-11e8-86bc-99910e154818");
	}
	else if (command == "delrestrictions") {
		
	}

}

function createMDMCommand(req,res,dict){

    var json = {
					"Command": dict,
					"CommandUUID": uuid()
				};
	var data = plist.build(json);
	console.log("******Sent Cmd*********");
	console.log("Sent Cmd: "+JSON.stringify(json));

	res.write(data);
	res.end();

}

function createMDMProfile(req,res,profilebase64data){


	// var plistfile = fs.readFileSync('./plists/mdmprofiles/testEmail.plist');
    // // convert binary data to base64 encoded string
   //  var profilebase64data = new Buffer(plistfile).toString('ascii');
	var dict = {"RequestType": "InstallProfile","Payload": base64ToBuffer(profilebase64data)};
	var json = {
		"Command": dict,
		"CommandUUID": uuid()
	};
	var data = plist.build(json);
	console.log("******Sent Cmd*********");
	console.log("Sent Cmd String: "+JSON.stringify(json));
	console.log("Sent Cmd: "+data);

	res.write(data);
	res.end();

}

function deleteMDMProfile(req,res,identifier){


	// var plistfile = fs.readFileSync('./plists/mdmprofiles/testEmail.plist');
    // // convert binary data to base64 encoded string
   //  var profilebase64data = new Buffer(plistfile).toString('ascii');
	var dict = {"RequestType": "RemoveProfile","Identifier":identifier};
	var json = {
		"Command": dict,
		"CommandUUID": uuid()
	};
	var data = plist.build(json);
	console.log("******Sent Cmd*********");
	console.log("Sent Cmd String: "+JSON.stringify(json));
	console.log("Sent Cmd: "+data);

	res.write(data);
	res.end();

}


function notifyAPNs(req,res){

    var myObj = plist.parse(fs.readFileSync('./plists/checkin/TokenUpdate.plist', 'utf8'));
    var data = myObj["plist"]["dict"]["data"];
    var string = myObj["plist"]["dict"]["string"];
    let pushMagic = string[1];
	let deviceToken = data[0];
	var Key, Cert;
	var tokenID = req.body.tokenID;

	console.log("Push Magic: "+ pushMagic);
	console.log("Device Token: "+ deviceToken);
	let hexDeviceToken = Buffer.from(deviceToken, 'base64').toString('hex');
	
	console.log("Device Token Hex: " + hexDeviceToken);

	authentication.fetchEmailByTokenId(tokenID, function(email){
		certificate.getAPNCert(email, function(cert){
			Cert = cert.apnCert;
			Key = cert.apnKey;

			var note = new apn.Notification();
			let apnProvider = new apn.Provider({
						key : Key,
						cert : Cert,
						production: true
				});
		
			note.payload = {'mdm': pushMagic};
			apnProvider.send(note,hexDeviceToken).then( (result) => {
				console.log("sent:", result.sent.length);
					  console.log("failed:", result.failed.length);
					  console.log(result.failed);		
			});
			res.end();
		})
	})

	

}

function base64ToBuffer(base64) {

	'use strict';
    var binstr = base64;
    var buf = new Uint8Array(binstr.length);
    Array.prototype.forEach.call(binstr, function (ch, i) {
      buf[i] = ch.charCodeAt(0);
    });
    return buf;
}


/* Server */
function processMDMCommand  (req,res) {

    if (!req.body) return res.sendStatus(400)
	console.log('****server Data*******');
	var string = JSON.stringify(req.body);
	console.log('Data:'+ string);
	var myObj = JSON.parse(string);

	myObj.plist.dict.key.forEach(function(item){
	 // 	console.log('objects :' + item);
	})
	var cmdrespMap = new Map();
	var i = 0;
	myObj.plist.dict.key.forEach(function(item){
    	//	console.log('objects :' + item);
    		cmdrespMap.set(item,myObj.plist.dict.string[i]);
    		i++;
 	})

	  var firstKey = cmdrespMap.keys().next().value;
	  switch (firstKey) {
		  case 'Status':{
				  console.log("status ", cmdrespMap.get('Status'));
				  if(0 == plistQueue.length){
					//res.sendStatus(200);
					res.end();
				  }else{
					sendCommandPlist(req,res);
				  }
				}
			  break;
		case 'CommandUUID':{
					console.log(" command UDID ", cmdrespMap.get('CommandUUID'));
					console.log("command sataus " , cmdrespMap.get('Status'));
					//res.sendStatus(200);
					if(0 == plistQueue.length){
						res.end();
					}
					else{
						res.sendStatus(200);
					}
				}
		  			break;
		  default:{
		  			console.log("Default Case");
					if(0 == plistQueue.length){
						res.end();
					}
					else{
						res.sendStatus(200);
					}
		  }
		  			break;
			  break;
	  }
}

function sendMDMCommand (req,res) {
	console.log("mdm command");

	if (!req.body) return res.sendStatus(400)
	var tokenID = req.body.tokenID;
	console.log(tokenID);
	authentication.verifyTokenID(tokenID, function(bool){
		if(bool){
							
		  console.log('Token: '+tokenID +' Verified');
		  
		  var mycommand = req.body.command;
		  console.log("Adding Command " + mycommand + " to queue..");
		  plistQueue.push(mycommand);
		  notifyAPNs(req,res);
		  res.sendStatus(200);

		} else{
		
		  console.log('Token: '+tokenID +' Mismatch');
		  res.sendStatus(406);
		}
  	});
	
	
}

function setRestrictionprofile (req,res) {
	
	if (!req.body) return res.sendStatus(400)
	var tokenID = req.body.tokenID;

	console.log("Set Restriction Profile");

	authentication.verifyTokenID(tokenID, function(bool){
		
		if(bool){	

			console.log('Token: '+tokenID +' Verified');
			console.log("Adding Restriction Profile to  queue..");

			req.body.camera == "yes"?allowcamera = true:allowcamera = false;
			req.body.docsharing == "yes"?allowdocsharing = true:allowdocsharing = false;
			req.body.screeshot == "yes"?allowScreenShot = true:allowScreenShot = false;

			// if(req.body.camera == "yes"){
			// 	console.log("Camera Enabled");
			// 	allowcamera = true; 
			// }
			// else{
			// 	allowcamera = false; 
		
			// }
			// if(req.body.docsharing == "yes"){
			// 	console.log("DocSharing Enabled");
			// 	allowdocsharing = true; 
			// }
			// else{
			// 	allowdocsharing = false; 
		
			// }
			plistQueue.push("addrestrictions");
			notifyAPNs(req,res);
			res.sendStatus(200);

		}else{
			console.log('Token: '+tokenID +' Mismatch');
			res.sendStatus(406);

		}
	})
	


}




const uuidv1 = require('uuid/v1');

function setEmailprofile (req,res) {
    if (!req.body) return res.sendStatus(400)
	var tokenID = req.body.tokenID;
	console.log("Set email profile")
	console.log(tokenID)
	authentication.verifyTokenID(tokenID, function(bool){
		
		if(bool){	

		  	console.log('Token: '+tokenID +' Verified');
			console.log("setEmailprofile ,tokenID: "+tokenID);
			  
			console.log("setEmailprofile ,disableRecentMailSync: "+req.body.disableRecentMailSync);
			console.log("setEmailprofile ,incmgMailserverPort: "+req.body.incoming.incmgMailserverPort);
			console.log("setEmailprofile ,outgoingIncomingMailserverSamePass: "+req.body.outgoing.outgoingIncomingMailserverSamePass);
			var emailUUID = uuidv1();
			var payloadUUID = uuidv1();


			var json = {
				"PayloadContent": [
					{
						"EmailAccountDescription": req.body.EmailAccountDescription,
						"EmailAccountName": req.body.AccountDisplay,
						"EmailAccountType": req.body.accountType,
						"EmailAddress": req.body.senderEmail,
						"IncomingMailServerAuthentication": req.body.incoming.authType,
						"IncomingMailServerHostName": req.body.incoming.mailServer,
						"IncomingMailServerPortNumber": parseInt(req.body.incoming.port),
						"IncomingMailServerUseSSL": req.body.incoming.ssl=="true"?true:false,
						"IncomingMailServerUsername": req.body.incoming.userName,
						"OutgoingMailServerAuthentication": req.body.outgoing.authType,
						"OutgoingMailServerHostName": req.body.outgoing.mailServer,
						"OutgoingMailServerPortNumber": parseInt(req.body.outgoing.port),
						"OutgoingMailServerUseSSL": req.body.outgoing.ssl=="true"?true:false,
						"OutgoingMailServerUsername": req.body.outgoing.userName,
						"OutgoingPasswordSameAsIncomingPassword": req.body.outgoing.outgoingIncomingMailserverSamePass=="true"?true:false,
						"PayloadDescription": "Configures Email settings",
						"PayloadDisplayName": req.body.EmailAccountDescription,
						"PayloadIdentifier": "com.apple.mail.managed."+emailUUID,
						"PayloadType": "com.apple.mail.managed",
						"PayloadUUID": emailUUID,
						"PayloadVersion": req.body.eamilPayloadVer,
						//  these params yet to be decided on how to present it to user 
						"PreventMove": true,
						"SMIMEEnablePerMessageSwitch": false,
						"SMIMEEnabled": false,
						"SMIMEEncryptionEnabled": false,
						"SMIMESigningEnabled": false,
						"allowMailDrop": false,
						"disableMailRecentsSyncing": true
					}
				],
				"PayloadDisplayName": req.body.profielName,
				//"PayloadIdentifier": "com.apple.applicationaccess."+payloadUUID,
				"PayloadIdentifier": "com.apple.applicationaccess.com.apple.applicationaccess.0e26b6b1-4f7b-11e8-86bc-99910e154818",
				"PayloadOrganization": req.body.org,
				"PayloadRemovalDisallowed": false,
				"PayloadType": "Configuration",
				"PayloadUUID": payloadUUID,
				"PayloadVersion": req.body.profilePayloadVer

			};


			console.log(plist.build(json));
			
			//var plistfile = plist.build(json);

			var emailplist = './plists/mdmprofiles/Email.plist';

			var fs = require('fs');
			fs.writeFile(emailplist, plist.build(json), function(err) {
				if(err) {
					return console.log(err);
				}

				console.log("Email plist file  saved!");
			}); 

			authentication.fetchEmailByTokenId(tokenID, function(email){
				profile.updateEmailProfie(email, json)
			})
			plistQueue.push("addmanagedemail");
			notifyAPNs(req,res);
			res.sendStatus(200);

		} else{
		
		  console.log('Token: '+tokenID +' Mismatch');
		  res.sendStatus(406);
		}
  });
    // // convert binary data to base64 encoded string
    // var profilebase64data = new Buffer(plistfile).toString('ascii');

	// createMDMProfile(req,res,profilebase64data);
}



router.post('/profiles/command',bodyParser.text({type: 'text/html' }),sendMDMCommand);
router.post('/profiles/email',bodyParser.text({type: 'text/html' }),setEmailprofile);
router.post('/profiles/restrictions',bodyParser.text({type: 'text/html' }),setRestrictionprofile);

router.post('/profiles',bodyParser.text({type: 'text/html' }),function name(req,res) {
	console.log("inside profiles")
	var tokenID = req.body.tokenID;
	
	authentication.verifyTokenID(tokenID, function(bool){
		
		if(bool){	
			console.log('Token: '+tokenID +' Verified');
			var action = req.body.action;
			var profilename = req.body.profilename;

			if (action == "delete") {

				if(profilename == "email"){
					console.log("Delete Email");

					plistQueue.push("delmanagedemail");
					notifyAPNs(req,res);
					res.sendStatus(200);
				}
				else if (profilename == "restrictions") {
					console.log("Delete Restrictions");
					// plistQueue.push("delrestrictions");
					// notifyAPNs(req,res);
					 res.sendStatus(200);
				}
				
			}
			else{
				//allowdocsharing = false; 

			}
			
		} else{
		
			console.log('Token: '+tokenID +' Mismatch');
			res.sendStatus(406);
		}
	});

});





router.put('/',bodyParser.xml({
    limit: '1MB',   // Reject payload bigger than 1 MB 
    xmlParseOptions: {
      normalize: true,     // Trim whitespace inside text nodes 
      normalizeTags: true, // Transform tags to lowercase 
      explicitArray: false // Only put nodes in array if >1 
    }
}),processMDMCommand);



/*
router.post('/details',bodyParser.urlencoded({ extended: false }),function name(req,res) {
	if (!req.body) return res.sendStatus(400)
	console.log('User Name:'+req.body.username);
	console.log('Email:'+req.body.email);
	res.send("Submitted");
});
router.post('/registeruser',bodyParser.urlencoded({ extended: false }),function name(req,res) {
	if (!req.body) return res.sendStatus(400)
  	res.send('Registered, ' + req.body.username)
});



var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

router.post('/file-upload', function(req, res) {
	var upload = multer({
		storage: storage,
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname)
			if (ext !== '.certSigningRequest' && ext !== '.csr' && ext !== '.CSR') {
				return callback(res.end('Only CSR files are allowed'), null)
			}
			callback(null, true)
		}
	}).single('userFile');
	upload(req, res, function(err) {
		res.end('File is uploaded')
	})
})
*/

module.exports = router;
