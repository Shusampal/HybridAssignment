const User = require('../models/user');

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

const buyerGetCatalogBySellerService = async (sellerId) => {
    try {
        const sellerDB = await User.findOne({ uid : sellerId }).lean();

        if(!sellerDB){
            throw {
                statusCode : 400,
                message : `seller with ${sellerId} not registered`
            }
        }

        return sellerDB.catalog || [];

    } catch (error) {
        if(error.statusCode && error.message){
            throw error;
        }
        console.log(error);
        throw new Error("database error");
    }
}

const buyerCreateOrder = async (sellerId , username , cart ) => {
    try {
        const sellerDB = await User.findOne({ uid : sellerId }).lean();

        // TODO

    } catch (error) {
        if(error.statusCode && error.message){
            throw error;
        }
        console.log(error);
        throw new Error("database error");
    }
}

module.exports.buyerGetAllSellersService = buyerGetAllSellersService;
module.exports.buyerGetCatalogBySellerService = buyerGetCatalogBySellerService;
module.exports.buyerCreateOrder = buyerCreateOrder;