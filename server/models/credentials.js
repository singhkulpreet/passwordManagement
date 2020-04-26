var mongoose=require('mongoose')
var Schema=mongoose.Schema
mongoose.connect('mongodb://localhost:27017/PasswordManagement', {useNewUrlParser: true, useUnifiedTopology: true})

var credentials=new Schema({
    email:String,
    password:String,
    category:String,
    note:String,
    userEmail:String
})

credentialModel=mongoose.model('credentials',credentials)

module.exports=credentialModel