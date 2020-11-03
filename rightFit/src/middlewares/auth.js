const jwt = require("jsonwebtoken");
const config = require('../config/config.json');
const {unauthorized} = require('http-server-res')

module.exports = (req, res, next) => {
    const authHeaders = req.header('Authorization');

    if(!authHeaders)
        return unauthorized(res, 'Não foi autorizado!!!!');

    try {
        const decoded = jwt.verify(authHeaders, config.secret);
        req.userId = decoded.id;

        next();
    } catch (error) {
        return unauthorized(res, 'Não foi autorizado!!!!');
    }
};