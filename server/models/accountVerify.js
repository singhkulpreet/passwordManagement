var mongoose=require('mongoose')
var Schema=mongoose.Schema
mongoose.connect('mongodb://localhost:27017/PasswordManagement', {useNewUrlParser: true, useUnifiedTopology: true});

const accountVerify = new Schema({
    name:String,
    otp:String,
    role:String,
    expire_at: {
        type: Date, 
        default: Date.now
    , expires: '5m'
    },
   }, {
    timestamps: true,
   });

   //accountVerify.index({expire_at: 1}, {expireAfterSeconds: 5});

  var accountVerifyModel=mongoose.model('accountVerify',accountVerify)

   module.exports=accountVerifyModel


