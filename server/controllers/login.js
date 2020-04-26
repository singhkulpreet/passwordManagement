const userModel=require('../models/login')
const accountModel=require('../models/accountVerify')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var nodemailer = require("nodemailer");


exports.login=function(data){

    console.log("----data----",data); 
    return new Promise((resolve,reject)=>{

      
    userModel.findOne({email:data.email}).then((result)=>{
        console.log("----result----",result);

       if(result==null){
           resolve("wrong credentials")
       } 

       else if(typeof result.email!== undefined){
            console.log(result.password);
            
            if(cryptr.decrypt(result.password)==data.password){
                console.log("-----controller-----",result);
                resolve({result:result})
            }

            else resolve ("wrong credentials");


        }
        else resolve("wrong credentials");

        //return data;
    }).catch((err)=>{
        console.log(err);
    })  

})
}




exports.signup=(data)=>{
    console.log(data);

    return new Promise((resolve,reject)=>{

        //checking is users data is already stored in collection or not
    userModel.findOne({email:data.email}).then((result)=>{

    console.log("----result----",result);
    
        //if not available then store all details
    if(result==null){ 
      userModel.create(data).then((data)=>{

        console.log(data);
        
    }).catch((err)=>{
        console.log(err);
        reject(err)
    })


}
    // if details already available in collection and it's verified too then simply stop the execution of the rest of the code
else if(result.is_verified==true)
    {resolve('user already registered')
    return
}


            console.log("-----controller-----",data);
            
            //creating random no. which will use as a otp
             rand=Math.floor((Math.random() * 100) + 54);


             // all neccassary things for sending mail
             host='smpt.gmail.com';
             link="http://"+host+"/verify?id="+rand;
         
             mailOptions={
                 to : data.email,
                 subject : "Please confirm your Email account",
                 html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a><br><h1>OTP:"+rand+"<h1>"
             }
             console.log(mailOptions);
         
         
             mailConfig = {
                 service: "gmail",
                 host: 'smpt.gmail.com',
                 port: 465,
                 secure: true,
                 auth: {
                     user: 'xxxxxx@gmail.com',
                     pass: 'xxxxx'
                 }
             };
         
             let transporter = nodemailer.createTransport(mailConfig);
                
             transporter.sendMail(mailOptions, function(error, info){
                  
                 if(error){
                        console.log("-----error----",error);
                    reject("error");
                 }else if(info){
    
                     console.log(info);
                     

                     //store details for verifying otp and it will automatically delete after given time in model  using expire
                     accountModel.create({name:data.email,otp:rand,role:'accountVerify'}).then((resu)=>{
                         console.log("-------accountverifies --------",resu);
                         resolve("verification email sent");
                     }).catch((err)=>{
                         console.log("----verifies error----",err);
                         reject ("otp not sent try again");
                     })        
                      }
             });         
             

    
    })  
})
}



exports.forgotMail=(data)=>{

    return new Promise((resolve,reject)=>{

        userModel.findOne({email:data,is_verified:true}).then((result)=>{

            console.log(result);
            

            if(result!=null && typeof result._id!== undefined){

            console.log("-----controller-----",data);
            
            //creating random no. which will use as a otp
             rand=Math.floor((Math.random() * 100) + 54);

             // all neccassary things for sending mail
             host='smpt.gmail.com';
             link="http://"+host+"/verify?id="+rand;
         
             mailOptions={
                 to : data,
                 subject : "Please confirm your Email account",
                 html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a><br><h1>OTP:"+rand+"<h1>"
             }
             console.log(mailOptions);
         
         
             mailConfig = {
                 service: "gmail",
                 host: 'smpt.gmail.com',
                 port: 465,
                 secure: true,
                 auth: {
                    user: 'xxxxxx@gmail.com',
                    pass: 'xxxxx'
                }
             };
         
             let transporter = nodemailer.createTransport(mailConfig);
                
             transporter.sendMail(mailOptions, function(error, info){
                  
                 if(error){
                        console.log("-----error----",error);
                    reject("error");
                 }else if(info){
    
                     console.log(info);  
                     
                     accountModel.create({name:data,otp:rand,role:'forgot'}).then((resu)=>{
                        console.log("-------forgot--------",resu);
                        resolve({email:resu.name});
                    }).catch((err)=>{
                        console.log("----verifies error----",err);
                        reject ("otp not sent try again");
                    })

                 }

            }
            //else reject('not a registered user')
             )}

             else resolve("Email id id not registered")

    })

    })

}



exports.verifyAcoount=(data)=>{
    console.log(data);


   return new Promise((resolve,reject)=>{
  
    accountModel.findOne(data).then((result)=>{
        console.log("-----verifyAcoount-------",result);
        // return result

        if(result!=null){

        
             if(result._id){
                console.log("hhhhhhh");
                 userModel.findOneAndUpdate({email:data.name,is_verified:false},{$set:{is_verified:true}}).then((result2)=>{
                    console.log("result2  ",result2);
                    if(result2!=null && result2._id){
                        resolve("Account is succesfully verified")
                    } 
                    else resolve ("Account is already verified")
                })
            }
        }
        else resolve ("Otp is incorrect or expired")

    }).catch((err)=>{
        console.log(err);
    })

})
    
}


exports.passwordChange=(data,id)=>{
    console.log(data);
    console.log(id);
    console.log(cryptr.encrypt(data.current));
    
    
    return new Promise((resolve,reject)=>{

        userModel.findOne({email:id}).then((result)=>{

            console.log(result);
            

            if(result==null)
                resolve('Incorrect email')
            
            else {

                if(cryptr.decrypt(result.password)==data.current){

                    if(data.current==data.new){
                        resolve("New Password should be different from current password")
                    }
                    else{
                        
                    if(data.new==data.confirm){

                        console.log("----id-----",id);
                        

                        userModel.findOneAndUpdate({email:id},{$set:{password:cryptr.encrypt(data.new)}}).then((result2)=>{
    
                            console.log('----result2---',result2);
                            
                            if(typeof result2._id==undefined){
                                resolve("not updated")
                            }
                            else {
                                resolve("updated succesfully")
                            }
    
                        })
    
                    }
                    else resolve("New Password and Confirm Password isn't same")

                    }
    

                }

                else resolve("Current password not correct")

            }    

        })

    })
}

exports.changepasswordForgot=(data)=>{

    console.log(data);
    
    return new Promise((resolve,reject)=>{

        if(data.newPassword===data.confirmPassword){

        accountModel.findOne({name:data.email,otp:data.otp,role:'forgot'}).then(result=>{

            console.log("--result---",result);
            

        if(result!==null && typeof result.name!== undefined){   
            console.log("fff");
             
            password=cryptr.encrypt(data.newPassword)
        userModel.findOneAndUpdate({email:data.email,is_verified:true},{$set:{password:password}}).then((result)=>{

            console.log('----result---- ',result);
            
            if(result==null){
                resolve('password not updated')

            }
            else   resolve('password updated successfully')

        })
    }
    else resolve("Otp is wrong or expired")

    })  

    }

    else resolve("New password and confirm password are not same")

    })

}

