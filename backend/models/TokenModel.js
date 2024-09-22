const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    id:{
        type : Schema.Types.ObjectId,
        required : true
    },
    token :{
        type : String,
        required : true
    },
});

const TokenModel = mongoose.model("Token", TokenSchema);

module.exports = TokenModel;