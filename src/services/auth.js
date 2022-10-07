const User = require('../models/user');

const authRegisterService = async (username, password, userType) => {
    try {
        const isUserInDb = await User.exists({ username });

        if (isUserInDb) {
            throw {
                'statusCode': 400,
                'message': 'user already registered'
            }
        }

        const userObj = { username, password, userType };

        await new User(userObj).save();

    } catch (error) {
        console.log('database error in authRegisterService');
        throw new Error("internal server error");
    }
}


const authLoginService = (username, password) => {



}


module.exports.authRegisterService = authRegisterService;
module.exports.authLoginService = authLoginService;