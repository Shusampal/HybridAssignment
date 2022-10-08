const User = require('../models/user');
const bcrypt = require('bcryptjs');

const buyerGetAllSellersService = async () => {
    try {

        const allSellersRaw = await User.find({userType:'seller'}).lean();

        let allSellersMapped = [];

        allSellersMapped =  allSellersRaw.map((seller)=>{
            const { username , userType ,uid} = seller;
            return {
                sellerId : uid,
                username
            }
        })

        return allSellersMapped;

    } catch (error) {
        if(error.statusCode && error.message){
            throw error;
        }
        console.log(error);
        throw new Error("database error");
    }
}


module.exports.buyerGetAllSellersService = buyerGetAllSellersService;
// module.exports.authLoginService = authLoginService;