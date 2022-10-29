const env = require("./environment");

module.exports = (app) => {
    app.locals.assetPath = function (filePath) {
        if (env.name == 'development') {
            return '/' + filePath;
        }
    }
}