var mongoose = require('mongoose');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var console = require('console');
var device = require('./device');
var Profile = require('../models/profilesDB');
var authentication = require('./authentication');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text({ type: "*/*" }));

var saveKeyEmail = function (email) {
    var profile = new Profile();

    profile.addkeyEmail(email);

    profile.save(function (err) {
        if (err) {
            console.log('Error while saving add Key')
            console.log(err)
        } else {
            console.log('Key email is successfully saved')
        }
    });
}

var createProfileInfo = function (req, res) {

    authentication.fetchEmailByTokenId(req.body.tokenID, function (email) {
        Profile.update({ adminKeyEmail: email }, { 'profileArray.profileInfo.profilename': req.body.profilename, 'profileArray.profileInfo.description': req.body.description }, false, function (err) {
            if (err) {
                console.log('Error while updating the profileInfo')
                console.log(err)
            } else {
                console.log('Profile has been created!!')
            }
        })
    })
}

var updateProfileInfo = function (req, res) {

    authentication.fetchEmailByTokenId(req.body.tokenID, function (email) {
        Profile.update({ adminKeyEmail: email }, { 'profileArray.profileInfo.profilename': profileInfo.profilenewname, 'profileArray.profileInfo.description': profileInfo.description }, false, function (err) {
            if (err) {
                console.log('Error while updating the profileInfo')
                console.log(err)
            } else {
                console.log('Profile has been updated!!')
            }
        });
    })
}

var deleteProfile = function (req, res) {
    authentication.fetchEmailByTokenId(req.body.tokenID, function (email) {
        Profile.update({ adminKeyEmail: email }, { 'profileArray': null }, false, function (err) {
            if (err) {
                console.log('Error while deleting the profileInfo')
                console.log(err)
            } else {
                console.log('Profile has been deleted!!')
            }
        })
    })
}

var updateEmailProfie = function (email, emailProfile1) {

    console.log('Email');
    console.log('xyz' + email)

    console.log('Profile')
    console.log(JSON.parse(JSON.stringify(emailProfile1)));

    // Profile.update({ adminKeyEmail: email }, {'profileArray.emailProfile': {} } , false, function (err) {
    //     if (err) {
    //         console.log('Error while updating the Email profile')
    //         console.log(err)
    //     } else {
    //         console.log('Profile has been updated!!')
    //     }
    // });

    // console.log(email)
    Profile.findOne({ adminKeyEmail: email }, function (err, profileList) {

        if (err) {
            console.log('Error while getting the profileList')
        } if (!profileList) {
            console.log('NULL PROFILE LIST')
        } else {

            // var string =JSON.stringify(profileList);
            // var myObj = JSON.parse(string);
            // console.log(myObj);

            profileList.emailProfile = emailProfile1;

            console.log('Got the email entry');
            console.log(email);
            profileList.save(function (err) {
                if (err) {
                    console.log('Error while saving')
                    console.log(err)
                } else {
                    console.log('Profile successfully updated')
                }
            })
        }
    })
}


// module.exports.handleProfileRequest = function (req, res) {

//     authentication.fetchEmailByTokenId(req.query.tokenID, function (email) {

//         if (res.query.action == 'create') {
//             createProfileInfo(email, req.body);
//         } else if (res.query.action == 'update') {
//             updateProfileInfo(email, req.body);
//         } else if (res.query.action == 'delete'){
//             deleteProfile()
//         }
// }

// router.use('/create', createProfileInfo);
// router.use('/update', updateProfileInfo);
// router.use('/delete', deleteProfile);

module.exports = {
    router: router,
    saveKeyEmail: saveKeyEmail,
    updateEmailProfie: updateEmailProfie
};
// router.use('/email', )