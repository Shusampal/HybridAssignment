const User = require('../models/user');

const sellerCreatecatalog = async (username,catalog) => {
    try {

        const sellerDB = await User.findOne({username}).exec();

        if(!sellerDB){
            throw{
                statusCode: 400,
                message: 'seller not registered'
            }
        }

        if(sellerDB.userType != 'seller'){
            throw{
                statusCode: 403,
                message: 'user is not seller.Not authorized'
            }
        }

        const oldCatalog = sellerDB.catalog;

        for(let i = 0 ; i<catalog.length ; i++){
            oldCatalog.unshift(catalog[i]);
        }

        await User.findByIdAndUpdate({'_id' : sellerDB._id} , {catalog : oldCatalog}).lean();

    } catch (error) {
        if(error.statusCode && error.message){
            throw error;
        }
        console.log(error);
        throw new Error("database error");
    }
}


const sellerListOfOrders = async (username) => {
    try {

        const sellerDB = await User.findOne({username}).exec();

        if(!sellerDB){
            throw{
                statusCode: 400,
                message: 'seller not registered'
            }
        }

        if(sellerDB.userType != 'seller'){
            throw{
                statusCode: 403,
                message: 'user is not seller.Not authorized'
            }
        }

        return sellerDB.orders;

    } catch (error) {
        if(error.statusCode && error.message){
            throw error;
        }
        console.log(error);
        throw new Error("database error");
    }
}


module.exports.sellerCreatecatalog = sellerCreatecatalog;
module.exports.sellerListOfOrders = sellerListOfOrders;