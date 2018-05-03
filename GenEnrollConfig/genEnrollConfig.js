var exec = require('child_process').exec;
var userid ;
var utils = require('util');
var apnscerPath = "./uploads/PushCert.pem";
//var cmd_get_uid = "openssl x509 -noout -subject -in ./uploads/PushCert.pem";
var cmd_get_uid = utils.format("openssl x509 -noout -subject -in %s",apnscerPath);

//var apnscerPath = path.join(__dirname + '../uploads/PushCert.pem');


var enrollmobileconfigPath = "./GenEnrollConfig/UnsignedEnroll.mobileconfig";
//var signedenrollmobileconfigPath = "./GenEnrollConfig/Enroll.mobileconfig";
var signedenrollmobileconfigPath = "./plists/enroll/Enroll.mobileconfig";

var identityCerPath = "./certs/identity/identity.p12";
var serverCrtPath = "./certs/ssl/Server.crt";
var serverKeyPath = "./certs/ssl/Server.key";
var caCrtPath = "./certs/ssl/CA.crt";

var cmd_sign_mobileconfig  = utils.format("openssl smime -sign -in %s -out %s -signer %s -inkey %s -certfile %s -outform der -nodetach",
enrollmobileconfigPath,
signedenrollmobileconfigPath,
serverCrtPath,
serverKeyPath,
caCrtPath,
)

var onFinish;
module.exports.entrypoint = function(cb){

console.log("Curr Path :"+ __dirname);
    console.log('-----   preparing push csr and enroll mobileconfig / plist   --------');
    //create private key 2048 bit 
    onFinish = cb;
    console.log("print cmd", cmd_get_uid);
    exec(cmd_get_uid, getuidfromApnsCer);
}



function getuidfromApnsCer(error, stdout, stderr) {
    if (error) {
        console.log("genPrivatekeyCB err", error);
    } else {


        if (stdout.length > 0) {
        // start prepareing mobileconfig
        var r = new RegExp('/UID=(.*)/CN=');
        var index = stdout.indexOf("com.apple.mgmt.External.");
        console.log("Index " ,index);
        userid = stdout.slice(index,index+60);



       // var uid = stdout.match(r);

        console.log("userid " ,stdout);
        console.log("uid " ,userid);
        gen_enroll_mobileconfig();

        } else {
            console.log("error in user id length");
            onFinish(false);

        }


    }
}

function signEnrollMobileConfig(error, stdout, stderr) {
    if (error) {
        console.log("signEnrollMobileConfig err", error);
        onFinish(false);
    } else{
        // start prepareing mobileconfig
        onFinish(true);
    }
}



function gen_enroll_mobileconfig() {
    var plist = require('plist');
    var fs = require('fs');
    const uuidv1 = require('uuid/v1');

    var identityCerUUID = uuidv1();
    var pauloadUUID_accessrights = uuidv1();
    var pauloadUUID_configuration = uuidv1();

    var serverurl, checkinurl, IdentityCerPass;

    //cmd line args 

    var serverurl = "https://192.168.0.56:8080/meem/mdm/server"
    var checkinurl = "https://192.168.0.56:8080/meem/mdm/checkin"
    var IdentityCerPass = ""


    var identitycer = fs.readFileSync(identityCerPath);
    var identitycer_base64 = new Buffer(identitycer).toString('ascii');


    var json = {
        "PayloadContent": [
            {
                "Password": IdentityCerPass,
                "PayloadCertificateFileName": "Identity.p12",
                "PayloadContent": identitycer,
                "PayloadDescription": "Adds a PKCS#12-formatted certificate",
                "PayloadDisplayName": "Identity.p12",
                "PayloadIdentifier": "com.apple.security.pkcs12." + identityCerUUID,
                "PayloadType": "com.apple.security.pkcs12",
                "PayloadUUID": identityCerUUID,
                "PayloadVersion": 1
            },
            {
                "AccessRights": 8191,
                "CheckInURL": checkinurl,
                "CheckOutWhenRemoved": false,
                "IdentityCertificateUUID": identityCerUUID,
                "PayloadDescription": "Configures MobileDeviceManagement.",
                "PayloadIdentifier": "com.apple.mdm." + pauloadUUID_accessrights,
                "PayloadOrganization": "Meem Memory Pty Ltd",
                "PayloadType": "com.apple.mdm",
                "PayloadUUID": pauloadUUID_accessrights,
                "PayloadVersion": 1,
                "ServerURL": serverurl,
                "SignMessage": false,
                "Topic": userid,
                "UseDevelopmentAPNS": false
            }
        ],
        "PayloadDisplayName": "EnrollDevice",
        "PayloadIdentifier": userid,
        "PayloadOrganization": "Meem Memory Pty Ltd",
        "PayloadRemovalDisallowed": false,
        "PayloadType": "Configuration",
        "PayloadUUID": pauloadUUID_configuration,
        "PayloadVersion": 1

    };
    fs.writeFileSync(enrollmobileconfigPath, plist.build(json));
    console.log(cmd_sign_mobileconfig);
    exec(cmd_sign_mobileconfig, signEnrollMobileConfig);

}