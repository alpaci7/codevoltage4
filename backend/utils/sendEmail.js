require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, url, user, password)=>{
    try {
        const transporter = nodemailer.createTransport({
            host : process.env.HOST,
            service : process.env.SERVICE,
            port : Number(process.env.EMAIL_PORT),
            secure : Boolean(process.env.SECURE),
            auth : {
                user : process.env.USER_EMAIL,
                pass : process.env.USER_PASSWORD
            }
        })
        let html;
        if(subject === "Vérification d'Email"){
            html = `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                            }
                            .container {
                                max-width: 550px;
                                margin : 10px auto;
                                padding: 20px;
                                padding-left: 8%;
                                background-color: #f0f0f0;
                                border-radius: 5px;
                            }
                            .button{
                                display: inline-block;
                                padding: 10px 20px;
                                background-color: #bdd5dd;
                                color: black;
                                text-decoration: none;
                                border-radius: 5px;
                                margin : 10px 10%;
                                width : 100px;
                                
                            }
                            .button:hover{
                                background-color : #7cb9cd;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>Bienvenue ${user.fullname} au site web codevoltage.com</h2>
                            <p>Veuillez cliquer sur le boutton pour vérifier votre compte</p>
                            <a class="button" href="${url}">Vérifier mon compte</a>
                        </div>
                    </body>
                </html>
            `;
        }
        else if(subject === "Verify Email"){
            html = `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                            }
                            .container {
                                max-width: 550px;
                                margin : 10px auto;
                                padding: 20px;
                                padding-left: 8%;
                                background-color: #f0f0f0;
                                border-radius: 5px;
                            }
                            .button{
                                display: inline-block;
                                padding: 10px 20px;
                                background-color: #bdd5dd;
                                color: black;
                                text-decoration: none;
                                border-radius: 5px;
                                margin : 10px 10%;
                                width : 100px;
                                
                            }
                            .button:hover{
                                background-color : #7cb9cd;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>Welcome ${user.fullname} to codevoltage.com</h2>
                            <p>Please click the button to verify your account.</p>
                            <a class="button" href="${url}">Verify my Account</a>
                        </div>
                    </body>
                </html>
            `;
        }
        else if(subject === "Edit Profile"){
            html = `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                            }
                            .container {
                                max-width: 550px;
                                margin : 10px auto;
                                padding: 20px;
                                padding-left: 8%;
                                background-color: #f0f0f0;
                                border-radius: 5px;
                            }
                            .button{
                                display: inline-block;
                                padding: 10px 20px;
                                background-color: #bdd5dd;
                                color: black;
                                text-decoration: none;
                                border-radius: 5px;
                                margin : 10px 10%;
                                width : 100px;
                                
                            }
                            .button:hover{
                                background-color : #7cb9cd;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                         <h2>Welcome ${user.fullname} to codevoltage.com</h2>
                            <h3>Your password is : </h3>
                            <h4>${password}</h4>
                            <p>Please click the button to edit your account.</p>
                            <a class="button" href="${url}">Edit my Account</a>
                            
                        </div>
                    </body>
                </html>
            `;
        }
        else if(subject === "Changer le mot de passe"){
            html = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 550px;
                        margin : 10px auto;
                        padding: 20px;
                        padding-left: 8%;
                        background-color: #f0f0f0;
                        border-radius: 5px;
                    }
                    .button{
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #bdd5dd;
                        color: black;
                        text-decoration: none;
                        border-radius: 5px;
                        margin : 10px 10%;
                        width : 100px;
                        
                    }
                    .button:hover{
                        background-color : #7cb9cd;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Bienvenue ${user.fullname}  au site web codevoltage.com</h1>
                    <p>Veuillez cliquer sur le boutton pour Changer votre mot de passe</p>
                    <a class="button" href="${url}">Changer le mot de passe</a>
                </div>
            </body>
            </html>
        `;
        }
        else{
            html = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 550px;
                        margin : 10px auto;
                        padding: 20px;
                        padding-left: 8%;
                        background-color: #f0f0f0;
                        border-radius: 5px;
                    }
                    .button{
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #bdd5dd;
                        color: black;
                        text-decoration: none;
                        border-radius: 5px;
                        margin : 10px 10%;
                        width : 100px;
                        
                    }
                    .button:hover{
                        background-color : #7cb9cd;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Welcome ${user.fullname} to codevoltage.com</h1>
                    <p>Click the button to change password</p>
                    <a class="button" href="${url}">Change passsword</a>
                </div>
            </body>
            </html>
        `;
        }
        
        await transporter.sendMail({
            from : {
                name : "codevoltage.com", 
                address : process.env.USER_EMAIL,
            },
            to : email,
            subject : subject,
            html : html
        })
    } catch (error) {
        console.log(error.message);
        
    }
}
module.exports = sendEmail;