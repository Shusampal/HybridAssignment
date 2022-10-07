const User = require('../models/user');
const jwtBuilder = require('../utils/jwtBuilder');

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


const authLoginService = async (username, password) => {
    try {
        const isUserInDb = await User.findOne({ username }).exec();

        if (!isUserInDb) {
            throw {
                'statusCode': 400,
                'message': 'user not registered'
            }
        }

        //TODO:- decode the password and check if password correct or not


        return jwtBuilder(username);

    } catch (error) {
        console.log('database error in authRegisterService');
        throw new Error("internal server error");
    }


}


module.exports.authRegisterService = authRegisterService;
module.exports.authLoginService = authLoginService;