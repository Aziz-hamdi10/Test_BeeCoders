const mongoose=require('mongoose');
const user=mongoose.model('user',{
    name:{type:String},
email:{type:String},
password:{type:String}, 
image:{
    type:String
}});
module.exports=user;