const express = require('express');
const sellerRouter = express.Router();
const errorObjectBuilder = require('../utils/errorObjectBuilder');
const checkToken = require('../middlewares/checkToken');
const { sellerCreatecatalog , sellerListOfOrders} = require('../services/seller');

const baseurl = '/api/seller'

sellerRouter.post(`${baseurl}/create-catalog` , checkToken , async (req, res) => {
    try {

        const { catalog } = req.body;

        if(!catalog){
            throw{
                statusCode: 400,
                message: 'catalog needs to be send as body'
            }
        }

        await sellerCreatecatalog(req.user,catalog);
        
        return res.status(200).json({
            error: false,
            message: 'create catalog for a seller',
            data:{}
        })

    } catch (error) {

        if (error.statusCode && error.message) {
            return res.status(error.statusCode).json(errorObjectBuilder(error.statusCode, error.message))
        } else {
            return res.status(500).json(errorObjectBuilder(500, 'internal server error'))
        }
    }
})

sellerRouter.get(`${baseurl}/orders` , checkToken , async (req, res) => {
    try {

        const orders = await sellerListOfOrders(req.user);

        return res.status(200).json({
            error: false,
            message: 'list of orders for a seller',
            data:{orders}
        })

    } catch (error) {

        if (error.statusCode && error.message) {
            return res.status(error.statusCode).json(errorObjectBuilder(error.statusCode, error.message))
        } else {
            return res.status(500).json(errorObjectBuilder(500, 'internal server error'))
        }
    }
})





module.exports = sellerRouter;