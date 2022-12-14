const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
},
    function (req, email, password, done) {
        //find a user and establish identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in creating user', err);
                req.flash('error', 'Error Finding User!');
                return done(err);
            }
            if (!user || user.password != password) {
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            if (!user.verified) {
                req.flash('error', 'Email Not Verified!');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));



//seriallizing the user which things to be kept in the cookie
passport.serializeUser(function (user, done) {
    done(null, user.id)
});


//deserializing the user from the key in the cookies


passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user local strategy', err);
            return done(err);
        }

        return done(null, user);
    });
});


//check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
    //if user is signed in ,then pass on the request to the next function controller action
    if (req.isAuthenticated()) {
        return next();
    }
    //if user not singned in
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains current user from current cookie and we are sending it to locals for the view

        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;