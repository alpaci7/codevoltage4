const UserModel = require("../models/UserModel");
const sendEmail = require("../utils/sendEmail");
const TokenModel = require("../models/TokenModel");
const session = require("express-session");

const crypto = require("crypto");
const bcrypt = require("bcrypt");

const logIn = async(req,res)=>{
    const {username, password} = req.body;
    const emailCheck = await UserModel.findOne({email : username});
    const usernameCheck = await UserModel.findOne({username : username});
    if(!emailCheck && !usernameCheck){
        return res.status(404).json({message : "not found"});
    }else if(emailCheck){
        bcrypt.compare(password, emailCheck.password, async(err,result)=>{
            if(err){
                return res.status(500).json({message : "server error"})
            }
            if(result){
                if(emailCheck.phone === null){
                    return res.status(200).json({message : "edit profile", user : emailCheck});
                }
                else{
                    return res.status(200).json({message : "success",user : emailCheck});

                }            }
            else{
                return res.status(401).json({message : "password incorrect"})
            }
        })
    }else if(usernameCheck){
        bcrypt.compare(password, usernameCheck.password, async(err,result)=>{
            if(err){
                return res.status(500).json({message : "server error"})
            }
            if(result){
                if(usernameCheck.phone === null){
                    return res.status(200).json({message : "edit profile", user : usernameCheck});
                }
                else{
                    return res.status(200).json({message : "success",user : usernameCheck});

                }
            } 
            else{
                return res.status(401).json({message : "password incorrect"})
            }
        })
    }
    else{
        return res.status(404).json({message : "not found"});
    }
}

const signUp = async(req,res) =>{
    const {username, password, fullname, email, phone, address, birthDate, gender, language} = req.body;
    const checkEmail = await UserModel.findOne({email : email});
    const checkUsername = await UserModel.findOne({username : username});

    if(checkEmail){
        return res.status(404).json({message : "email exist"});
    }
    else if(checkUsername){
        return res.status(404).json({message : "username exist"});    
    }
    else if(!checkEmail && !checkUsername){
        bcrypt.hash(password, 10, async(err, passwordHash)=>{
            if(err){
                console.error(err);
                return res.status(500).json({message : "server error"})
            }
            else{
                const lastDocument = await UserModel.find({}).sort({id : -1}).limit(1);     
                const user = await UserModel.create({
                    id : lastDocument[0].id + 1, 
                    username : username, 
                    fullname : fullname, 
                    email : email, 
                    password : passwordHash , 
                    phone : phone,
                    address : address, 
                    birthDate : birthDate,
                    gender : gender, 
                    verified : false, 
                    subscriptionDate : Date.now()
                });
                if(user){
                    const token = crypto.randomBytes(32).toString("hex");
                    await TokenModel.create({id : user._id, token : token});   
                    const url = `${process.env.BASE_URL}/verifyEmail/${user._id}/${token}`;
                    if(language === "fr"){
                       await sendEmail(email, "Vérification d'Email",url, user, "none");
                    }
                    else if(language === "en"){
                       await sendEmail(email, "Verify Email",url, user, "none");
                    }
                    
                    return res.status(201).json({message : "success", user : user})
                }
                else{
                    return res.status(500).json({message : "Server Error"});
                }
            }
        });
    }

}



const forgetPassword = async(req, res)=>{
    const {email , language} = req.body;
    const user = await UserModel.findOne({email : email});

    if(!user){
        return res.status(404).json({message : "not found"});
    }
    else{
        const token = crypto.randomBytes(32).toString("hex");
        await TokenModel.deleteMany({id : user._id});
        await TokenModel.create({id : user._id, token : token});   
        const url = `${process.env.BASE_URL}/changePassword/${user._id}/${token}`;
        if(language === "fr"){
            await sendEmail(email, "Changer le mot de passe", url, user);
        }
        else{
            await sendEmail(email, "Change password", url, user);

        }
        return res.status(200).json({message : "success"});
    }

}


const changePassword = async (req, res)=>{
    const {password, id} = req.body;
    const userCheck = await UserModel.findOne({_id : id});
    if(!userCheck){
        return res.status(404).json({message : "not found"});
    }
    else{
        bcrypt.hash(password, 10, async(err, passwordHash)=>{
            if(err){
                console.error(err);
                return res.status(500).json({message : "server error"})
            }
            else{
                const user = await UserModel.findOne({_id : id});
                if(user){
                    await UserModel.updateOne({_id : id},{password : passwordHash});
                    const token = crypto.randomBytes(32).toString("hex");
                    await TokenModel.deleteMany({id : user._id});
                    await TokenModel.create({id : user._id, token : token});   
                    const url = `${process.env.BASE_URL}/editProfile/${user._id}/${token}`;     
                    await sendEmail(user.email,"Edit Profile", url, user, password);
                    return res.status(200).json({message : "success"});
                }
                else{
                    return res.status(404).json({message : "not found"});

                }
                
            }
        });
    }
}



module.exports = {
    logIn,
    signUp,
    forgetPassword,
    changePassword
}