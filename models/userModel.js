const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    userId:String,
    user_role:String,
    password:String
})

const User = mongoose.model("User",userSchema);
module.exports = User