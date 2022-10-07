const User = require('../models/user');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
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

        const hash = bcrypt.hashSync(password, salt);
        const userObj = { username, hash, userType };

        await new User(userObj).save();

    } catch (error) {
        console.log('database error in authRegisterService');
        throw new Error("internal server error");
    }
}


const authLoginService = async (username, password) => {
    try {
        const UserInDb = await User.findOne({ username }).exec();

        if (!UserInDb) {
            throw {
                'statusCode': 400,
                'message': 'user not registered'
            }
        }

        const dbHash = UserInDb.hash;

        const isPasswordMatched = bcrypt.compareSync(password, dbHash);

        if(isPasswordMatched){
            return jwtBuilder(username);
        }

        throw {
            'statusCode': 400,
            'message': 'username or password is wrong'
        }
        

    } catch (error) {
        console.log('database error in authRegisterService');
        throw new Error("internal server error");
    }

}


module.exports.authRegisterService = authRegisterService;
module.exports.authLoginService = authLoginService;