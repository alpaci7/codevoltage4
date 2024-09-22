require("dotenv").config();
const connectRouter = require("./routes/connectRoutes");
const oauthRouter = require("./routes/oauthRoutes");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
//const session = require("express-session");

//const MongoDBSession = require("connect-mongodb-session")(session);
const app = express();


/*const store = new MongoDBSession({
    uri: process.env.MONGO_URI,
    collection : "Sessions",
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie : {
        secure: true,
        maxAge: 3600000,
    }
}))*/
  
app.use(cors());
app.use(express.json());

app.use('/api',connectRouter);
app.use('/api/auth',oauthRouter);
app.use('/api',userRouter);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT , ()=> {
        console.log("Connected to Database and server is listening on port ", process.env.PORT);
    });
    
})
.catch((err)=>{
    console.log(err);
})
