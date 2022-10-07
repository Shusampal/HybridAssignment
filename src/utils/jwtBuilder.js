var jwt = require('jsonwebtoken');

const jwtBuilder = (username) => {

    return jwt.sign({username}, "This is a JWT SECRET");
}

module.exports = jwtBuilder;