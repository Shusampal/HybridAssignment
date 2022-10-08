const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    try {

        const token = req.cookies.auth;
        if (!token) {
            throw new Error('user not authenticated');
        }
        const decoded = jwt.verify(token, "This is a JWT SECRET");

        if(decoded){
            req.user = decoded.username;
            next();
        } else {
            throw new Error('user not authenticated');
        }

    } catch (err) {

        res.status(403);
        res.json({
            error: true,
            message: 'user not authenticated',
            statusCode: 403
        })

    }

}


module.exports = checkToken;