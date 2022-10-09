const User = require('../models/user');
const ShortUniqueId = require('short-unique-id')
const uniqueid = new ShortUniqueId({ length: 10 });

const buyerGetAllSellersService = async () => {
    try {

        const allSellersRaw = await User.find({ userType: 'seller' }).lean();

        let allSellersMapped = [];

        allSellersMapped = allSellersRaw.map((seller) => {
            const { username, userType, uid } = seller;
            return {
                sellerId: uid,
                username
            }
        })

        return allSellersMapped;

    } catch (error) {
        if (error.statusCode && error.message) {
            throw error;
        }
        console.log(error);
        throw new Error("database error");
    }
}

const buyerGetCatalogBySellerService = async (sellerId) => {
    try {
        const sellerDB = await User.findOne({ uid: sellerId }).lean();

        if (!sellerDB) {
            throw {
                statusCode: 400,
                message: `seller with ${sellerId} not registered`
            }
        }

        return sellerDB.catalog || [];

    } catch (error) {
        if (error.statusCode && error.message) {
            throw error;
        }
        console.log(error);
        throw new Error("database error");
    }
}

const buyerCreateOrder = async (sellerId, username, cart) => {
    try {

        const sellerDB = await User.findOne({ uid: sellerId }).exec();
        const userDB = await User.findOne({ username }).exec();

        
        const catalogItems = [];
        const catalogPrices = [];

        sellerDB.catalog.forEach(item => {
            catalogItems.push(item.name);
            catalogPrices.push(item.price);
        })

        let orderCart = [];

        let totalOrderPrice = 0;

        for (let i = 0; i < cart.length; i++) {
            const order = cart[i];

            const itemIndex = catalogItems.indexOf(order.name);

            if (itemIndex == -1) {
                throw {
                    statusCode : 400,
                    message : 'cart contains product which is not included in catalog . Order not placed . Please check'
                }
            } else {

                const newOrderObj = {
                    name: order.name,
                    quantity: order.quantity
                }

                orderCart.push(newOrderObj);
                totalOrderPrice += ( order.quantity * catalogPrices[itemIndex]);
            }

        }

        const order = {
            'customerName' : userDB.username,
            'orderNo' : uniqueid(),
            'totalOrderPrice' : totalOrderPrice,
            'cart' : orderCart
        }


        sellerDB.orders.unshift(order);

        await User.findByIdAndUpdate({_id : sellerDB._id} , {orders : sellerDB.orders}).exec();


    } catch (error) {
        if (error.statusCode && error.message) {
            throw error;
        }
        console.log(error);
        throw new Error("database error");
    }
}

module.exports.buyerGetAllSellersService = buyerGetAllSellersService;
module.exports.buyerGetCatalogBySellerService = buyerGetCatalogBySellerService;
module.exports.buyerCreateOrder = buyerCreateOrder;