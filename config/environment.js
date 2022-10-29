
const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'inshita',
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: "587",
        secure: "false",
        auth: {
            user: 'email',
            pass: 'password'
        }
    },
}

module.exports = development;

