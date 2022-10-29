

const User = require('../models/user');
const newUserAuthMailer = require('../mailers/newUserAuthMailer');
const crypto = require('crypto');

module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        req.flash('success', 'Already Signed In!');
        return res.redirect('/');
    }
    return res.render('user_signin', {
        title: "SiteName | Sign In"
    });
};


module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        req.flash('success', 'Already Signed In!');
        return res.redirect('/');
    }
    return res.render('user_signup', {
        title: "SiteName | Sign Up",
        defaultAvatarPath: User.avatarPath + '/defaultavatarpic/avatar-default'
    });
};

module.exports.createid = async function (req, res) {
    try {
        if (req.body.password != req.body.cpassword) {
            req.flash('error', 'Passwords does not match!');
            return res.redirect('back');
        }
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            let user = await User.create({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                verified: false,
                accessToken: crypto.randomBytes(20).toString('hex'),
                isValid: true,
            });
            newUserAuthMailer.newLink({
                accesslink: 'http://localhost:8000/verification-mail/?accessToken=' + user.accessToken,
                email: user.email,
                name: user.name,
            });
            req.flash('success', 'Check Your Email To Verify!');
            return res.redirect('/users/signin');
        }
        else {
            req.flash('error', 'User Already Exists!');
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        req.flash('error', 'Error in creating Account!');
        return res.redirect('back');
    }

};
module.exports.checkuser = function (req, res) {
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
};

module.exports.destroysession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You have been Logged Out');
        return res.redirect('/users/signin');
    });
};

