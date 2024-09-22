require('dotenv').config();
const axios = require('axios');
const qs = require('qs');
const UserModel = require('../models/UserModel');

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require('../utils/sendEmail');

const TokenModel = require("../models/TokenModel");



const oauthConnect = async(req,res)=>{

    const { code } = req.query;
    let birthDate = null;
    let gender = null;

    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: `${process.env.BASE_URL}/auth/google/redirect`,
            grant_type: 'authorization_code',
            code,
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const { access_token } = response.data;

        const profileResponse = await axios.get('https://people.googleapis.com/v1/people/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            params: {
                personFields: 'birthdays,genders,emailAddresses,names'
            }
        });
        const userProfile = profileResponse.data;
        const userCheck = await UserModel.findOne({email : userProfile.emailAddresses[0].value.toString()});
        if(userCheck){
            console.log(userCheck)
            if(userCheck.phone){
                return res.status(200).json({message : "login" , user : userCheck});
            }
            else{
                return res.status(200).json({message : "editProfile" , user : userCheck});
            }
            
        }
        else{
            if(userProfile.birthdays){
                if(userProfile.birthdays[0].date.year){
                    birthDate = userProfile.birthdays[0].date.day + '-' + userProfile.birthdays[0].date.month +'-' + userProfile.birthdays[0].date.year;
                }
            }
            if(userProfile.genders){
                gender = userProfile.genders[0].value;
            }
            const lastDocument = await UserModel.find({}).sort({id : -1}).limit(1);  
            const password =  crypto.randomBytes(4).toString("hex"); 
            bcrypt.hash(password, 10, async(err, passwordHash)=>{
                if(err){
                    console.error(err);
                    return res.status(500).json({message : "server error"})
                }
                else{  
                    const user = await UserModel.create({
                        id : lastDocument[0].id + 1, 
                        username : userProfile.names[0].displayName, 
                        password : passwordHash,
                        fullname : userProfile.names[0].familyName + ' ' + userProfile.names[0].givenName, 
                        email : userProfile.emailAddresses[0].value, 
                        birthDate : birthDate,
                        gender : gender, 
                        phone : null,
                        verified : true, 
                        subscriptionDate : Date.now()
                    });
                    const token = crypto.randomBytes(32).toString("hex");
                    await TokenModel.create({id : user._id, token : token});   
                    const url = `${process.env.BASE_URL}/editProfile/${user._id}/${token}`;
                    await sendEmail( userProfile.emailAddresses[0].value, "Edit Profile", url, user, password);
                    return res.status(200).json({message : "editProfile", user : user , password : password})
                }
            });
        }
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        return res.status(500).send('Authentication failed');
    }
}



module.exports = {
    oauthConnect
}