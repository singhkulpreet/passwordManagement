exports.verifyAccount=(req,res,next)=>{
    if(req.body.email==""){
        res.json({
            message:'email is required',
            data:''
        })
    }   
    
        
    else if(!(/\S+@\S+\.\S+/.test(req.body.email))){
        res.json({
            message:'email not valid',
            data:''
        })        
    } 

    else if(req.body.otp==""){
        res.json({
            message:'otp is required',
            data:''
        })
    }

    else if(!Number.isInteger(parseInt(req.body.otp))){
        res.json({
            message:'otp should be integer only',
            data:''
        })
    }
   else{ next() }
}

exports.loginCheck=(req,res,next)=>{
    if(req.body.email==""){
        res.json({
            message:'email is required',
            data:''
        })
    }   
    
        
        else if(!(/\S+@\S+\.\S+/.test(req.body.email))){
        res.json({
            message:'email not valid',
            data:''
        })        
    } 

    else if(req.body.password==""){
        res.json({
            message:'password is required',
            data:''
        })
    }

   else next()
}

exports.signup=(req,res,next)=>{

    if(req.body.email==''){
        res.json({
            message:'email is required',
            data:''
        })
    }
    
    else if(!(/\S+@\S+\.\S+/.test(req.body.email))){
       res.json({
           message:'email not valid',
           data:''
       })        
   } 

   else if( req.body.password==''){
        res.json({
            message:'password is required',
            data:''
        })
    }

    else if((req.body.password).length<5){
        res.json({
            message:'password length should be more than 5',
            data:''
        })
    }

    else if(  req.body.firstName==''){
        res.json({
            message:'firstName is required',
            data:''
        })
    }
    else if(!(/^[A-Za-z]+$/.test(req.body.firstName))){
        res.json({
            message:'firstname is not valid',
            data:''
        })
    }

    else if(  req.body.lastName==''){
        res.json({
            message:'lastName is required',
            data:''
        })
    }
    else if(!(/^[A-Za-z]+$/.test(req.body.lastName))){
        res.json({
            message:'lastname is not valid',
            data:''
        })
    }

    else if(  req.body.phone==''){
        res.json({
            message:'phone is required',
            data:''
        })
    }

    else if(!Number.isInteger(parseInt(req.body.phone))){
        res.json({
            message:'Invalid phone no.',
            data:''
        })
    }


    else next()
}

exports.forgotMail=(req,res,next)=>{

    if(req.body.email==''){
        res.json({
            message:'email is required',
            data:''
        })
    }
    
    else if(!(/\S+@\S+\.\S+/.test(req.body.email))){
       res.json({
           message:'email not valid',
           data:''
       })        
   }
   
            
   else next()

}

exports.changepasswordForgot=(req,res,next)=>{
    if(req.body.email==''){
        res.json({
            message:'email is required',
            data:''
        })
    }
    
    else if(!(/\S+@\S+\.\S+/.test(req.body.email))){
       res.json({
           message:'email not valid',
           data:''
       })        
   }


   else if(  req.body.newPassword==''){
    res.json({
        message:'newPassword is required',
        data:''
    })
    }

    else if(  req.body.newPassword.length>4){
        res.json({
            message:'newPassword is required',
            data:''
        })
        }

        else if(  req.body.confirmPassword==''){
            res.json({
                message:'confirmPassword is required',
                data:''
            })
            }    

    else if(  req.body.confirmPassword.length>4){
            res.json({
                message:'confirmPassword is required',
                data:''
            })
            }



   else if(req.body.otp==""){
    res.json({
        message:'otp is required',
        data:''
    })
}

else if(!Number.isInteger(parseInt(req.body.otp))){
    res.json({
        message:'otp should be integer only',
        data:''
    })
}
else{ next() }


}

exports.changepassword=(req,res,next)=>{

    if(typeof req.headers.token == 'undefined'){
        res.json({
            message:'token is required',
            data:''
        })
        return
    }

     if( req.body.new==''){
        res.json({
            message:'New password is required',
            data:''
        })
    }

    else if((req.body.new).length<5){
        res.json({
            message:'New password length should be more than 5',
            data:''
        })
    }
    else if( req.body.confirm==''){
        res.json({
            message:'confirm password is required',
            data:''
        })
    }

    else if((req.body.confirm).length<5){
        res.json({
            message:'confirm password length should be more than 5',
            data:''
        })
    }

}   