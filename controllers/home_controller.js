const User = require('../models/user');



module.exports.homePage = async function (req, res) {

    return res.render('home', {
        title: "SiteName | Home",
    });
}
