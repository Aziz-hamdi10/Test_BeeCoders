const mongoose=require('mongoose');
const course=mongoose.model('course',{
    name:{
        type:String
    },
    price:{
        type:Number

    },
   
    image:{
        type:String
    }
})
module.exports=course;