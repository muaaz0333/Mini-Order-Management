const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    }
})

UserSchema.methods.toJSON = function(){
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;