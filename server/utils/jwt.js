const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require('../constants');

function createAccessToken(user){
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 1);

    const payload = {
        token_tye: 'access',
        user_id: user._id,
        exp: expToken.getTime(),
    };

    return jwt.sign(payload, JWT_SECRET_KEY);

}

function createRefreshToken(user){
    const expToken = new Date();
    expToken.setMonth(expToken.getMonth() + 1);

    const payload = {
        token_tye: 'refresh',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),

    };

    return jwt.sign(payload, JWT_SECRET_KEY);
}

function decodeToken(token){
    return jwt.verify(token, JWT_SECRET_KEY, true,(err, decoded) => {
        if (err) return null;
        return decoded;
    });
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decodeToken
}