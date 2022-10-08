const express = require('express');
const buyerRouter = express.Router();
const errorObjectBuilder = require('../utils/errorObjectBuilder');
const checkToken = require('../middlewares/checkToken');
const { buyerGetAllSellersService , buyerGetCatalogBySellerService } = require('../services/buyer');

const baseurl = '/api/buyer'

buyerRouter.get(`${baseurl}/list-of-sellers` , checkToken , async (req, res) => {
    try {
        const allSellers = await buyerGetAllSellersService();
        
        return res.status(200).json({
            error: false,
            message: 'list of all sellers',
            data:{
                sellers: allSellers
            }
        })

    } catch (error) {

        if (error.statusCode && error.message) {
            return res.status(error.statusCode).json(errorObjectBuilder(error.statusCode, error.message))
        } else {
            return res.status(500).json(errorObjectBuilder(500, 'internal server error'))
        }
    }
})

buyerRouter.get(`${baseurl}/seller-catalog/:seller_id` , checkToken , async (req, res) => {
    try {
        const catalog = await buyerGetCatalogBySellerService(req.params.seller_id);
        
        return res.status(200).json({
            error: false,
            message: 'list of catalogue of a seller',
            data:{
                sellerId : req.params.seller_id,
                catalog
            }
        })

    } catch (error) {

        if (error.statusCode && error.message) {
            return res.status(error.statusCode).json(errorObjectBuilder(error.statusCode, error.message))
        } else {
            return res.status(500).json(errorObjectBuilder(500, 'internal server error'))
        }
    }
})


module.exports = buyerRouter;