const cryptoJS = require('crypto-js')
// encryption email
module.exports = (req, res, next) => {
    const email = req.body.email
    const encryptedEmail = cryptoJS.HmacSHA256(email, 'secret key 123').toString()
    req.email = encryptedEmail
    next();
}