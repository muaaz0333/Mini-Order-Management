const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
})

UserSchema.methods.toJSON = function(){
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

module.exports = mongoose.model("User",UserSchema);