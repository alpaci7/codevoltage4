const UserModel = require("../models/UserModel");
const TokenModel = require("../models/TokenModel");

const {ObjectId} = require("mongodb");


const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require('../utils/sendEmail');




const editProfile = async (req,res)=>{
    const {id, username, password, fullname, email, phone, address, birthDate, gender} = req.body;
    bcrypt.hash(password, 10, async(err, passwordHash)=>{
        if(err){
            console.error(err);
            return res.status(500).json({message : "server error"})
        }
        else{
            const usernameCheck = await UserModel.findOne({username : username, _id : {$ne : id}});
            const emailCheck = await UserModel.findOne({email : email, _id : {$ne : id}});

            
            if(emailCheck){
                return res.status(404).json({message : "email exist"});

            }
            else if(usernameCheck){
                return res.status(404).json({message : "username exist"});
            } 
            else if(!usernameCheck && !emailCheck){
                const user = await UserModel.findOne({_id : id});
                if(user){
                    await UserModel.updateOne({_id : id},
                        {
                            username : username, 
                            fullname : fullname, 
                            email : email, 
                            password : passwordHash , 
                            phone : phone,
                            address : address, 
                            birthDate : birthDate,
                            gender : gender, 
                        }
                    );
                    const token = crypto.randomBytes(32).toString("hex");
                    await TokenModel.deleteMany({id : id});
                    await TokenModel.create({id : id, token : token});   
                    const url = `${process.env.BASE_URL}/editProfile/${id}/${token}`;
                    await sendEmail(email, "Edit Profile", url, user, password);
                    return res.status(200).json({message : "success", user : user});
                
                } 
                else {
                    return res.status(404).json({message : "No Acount"});
                }
            }
        }
        
            
    });
}



const verifyAccount = async (req,res)=>{
    const {id, token} = req.body;
    try {
        const objId = new ObjectId(id);
    } catch (error) {
       return res.status(404).json({message : "Bad Id"});
    }
    const userCheck = await UserModel.findOne({_id : id});
    const tokenCheck = await TokenModel.findOne({id : id});
    if(!userCheck){
        return res.status(404).json({message : "No Account"});
    }
    else if(!tokenCheck){
        return res.status(404).json({message : "Expired Token"});
    }
    else if(userCheck && tokenCheck){
        if(tokenCheck.token === token){
            await TokenModel.deleteOne({id : id});
            const user = await UserModel.updateOne({_id : id}, {verified : true});
            return res.status(200).json({message : "success", user: user})
        }
        else{
            return res.status(404).json({message : "Wrong Token"})
        }
    }
}

const checkToken = async(req,res)=>{
    const {id, token} = req.body;
    try {
        const objId = new ObjectId(id);
    } catch (error) {
       return res.status(404).json({message : "Bad Id"});
    }
    const tokenCheck = await TokenModel.findOne({id : id});
    if(!tokenCheck){
        return res.status(404).json({message : "Expired Token"});
    }
    else if(tokenCheck){
        if(tokenCheck.token === token){
            await TokenModel.deleteOne({id : id});
            const user = await UserModel.findOne({_id : id});
            return res.status(200).json({message : "success", user: user})
        }
        else{
            return res.status(404).json({message : "Wrong Token"})
        }
    }
}
module.exports = {
    editProfile,
    verifyAccount,
    checkToken
}