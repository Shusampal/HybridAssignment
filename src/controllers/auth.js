const express = require('express');
const authRouter = express.Router();
const errorObjectBuilder = require('../utils/errorObjectBuilder');
const { authRegisterService , authLoginService } = require('../services/auth');

const baseurl = '/api/auth'

authRouter.post(`${baseurl}/register`, async (req, res) => {
    try {

        const { username , password , userType } = req.body;

        if(!username || !password || !userType) {
            throw {
                'statusCode': 400,
                'message': 'required parameters missing'
            }
        }

        await authRegisterService(username,password,userType);
        
        return res.status(200).json({
            error: false,
            message: 'user signup done',
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


authRouter.post(`${baseurl}/login`, async (req, res) => {
    try {

        const { username , password } = req.body;

        if(!username || !password ) {
            throw {
                'statusCode': 400,
                'message': 'required parameters missing'
            }
        }

        const token = await authLoginService(username,password);

        //TODO:- add token to cookie

        return res.status(200).json({
            error: false,
            message: 'user login done',
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

module.exports = authRouter;