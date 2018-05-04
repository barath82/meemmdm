var mongoose = require('mongoose');
var console = require('console');

// var profileInfo = new mongoose.Schema({
//     profilename: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     osversion: Number, //1- Apple, 2-Android, 3- Windows, 4-MacOS, 5-Linux
//     description: String
// });

var profileSchema = new mongoose.Schema({

    adminKeyEmail: {
        type: String,
        unique: true,
        required: true
    },
    profileArray:
        {
            profileInfo: {
                profilename: {
                    type: String,
                    default : " "
                    //unique: true,
                    //required: true
                },
                //osVersion: Number, //1- Apple, 2-Android, 3- Windows, 4-MacOS, 5-Linux
                description: String
            },
            emailProfile: {
                EmailAccountDescription: String,
                EmailAccountName: String,
                EmailAccountType: String,
                EmailAddress: String,
                PreventMove: Boolean,
                PreventAppSheet: Boolean,
                disableMailRecentsSyncing: Boolean,
                allowMailDrop: Boolean,
                IncomingMailServerAuthentication: String,
                IncomingMailServerHostName: String,
                IncomingMailServerPortNumber: Number,
                IncomingMailServerUseSSL: Boolean,
                IncomingMailServerUsername: String,
                IncomingPassword: String,
                OutgoingPassword: String,
                OutgoingPasswordSameAsIncomingPassword: Boolean,
                OutgoingMailServerAuthentication: String,
                OutgoingMailServerHostName: String,
                OutgoingMailServerPortNumber: Number,
                OutgoingMailServerUseSSL: Boolean,
                OutgoingMailServerUsername: String,
                SMIMEEnabled: Boolean,
                SMIMESigningEnabled: Boolean,
                SMIMESigningCertificateUUID: String,
                SMIMEEncryptionEnabled: Boolean,
                SMIMEEncryptionCertificateUUID: String,
                SMIMEEnablePerMessageSwitch: String
            }
        }
});

profileSchema.methods.addkeyEmail = function(email) {
    this.adminKeyEmail = email;
}

profileSchema.methods.addProfileName = function(profileInfo){
    this.profileArray.profileInfo = profileInfo;
}

var Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;