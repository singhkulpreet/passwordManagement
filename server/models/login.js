var mongoose=require('mongoose')
var schema=mongoose.Schema
mongoose.connect('mongodb://localhost:27017/PasswordManagement', {useNewUrlParser: true, useUnifiedTopology: true});

var user=new schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    phone:String,
    is_verified:{type:Boolean,default:false}
})

var userModel=mongoose.model('userInfo',user)

module.exports=userModel