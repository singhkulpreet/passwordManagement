exports.credentialCheck=(req,res,next)=>{    

    if(typeof req.headers.token == 'undefined'){
        res.json({
            message:'token is required',
            data:''
        })
        return
    }


    if(req.body.email==""){
        res.json({
            message:'username is required',
            data:''
        })
    }   
    
        
    //     else if(!(/\S+@\S+\.\S+/.test(req.body.email))){
    //     res.json({
    //         message:'username not valid',
    //         data:''
    //     })        
    // } 

    else if(req.body.password==""){
        res.json({
            message:'password is required',
            data:''
        })
    }

    else if(req.body.category==""){
        res.json({
            message:'category is required',
            data:''
        })
    }
//|| req.body.category!="BUSINESS APPS" || req.body.category!="EDUCATIONAL APPS" || req.body.category!="LIFESTYLE APPS" || req.body.category!="ENTERTAINMENT APPS" || req.body.category!="UTILITY APPS" || req.body.category!="TRAVEL APPS"
    else if(parseInt(req.body.category)<1 && parseInt(req.body.category)>7){
        res.json({
            message:'category is invalid',
            data:''
        })
    }



   else next()
}

exports.allCredential=(req,res,next)=>{

    console.log(req.headers);
    
const x=req.headers
    if(typeof req.headers.token == 'undefined'){
        res.json({
            message:"header not available",
            data:''
        })
    }
    else next()
}

exports.updateCredential=(req,res,next)=>{

    console.log("req.body",req.body);
    console.log("req.headers.token",req.headers.token);
    
    

    if(typeof req.headers.token == 'undefined'){
        res.json({
            message:'token is required',
            data:''
        })
        return
    }

    if(req.body.email==""){
        res.json({
            message:'username is required',
            data:''
        })
    }   
    
        
    //     else if(!(/\S+@\S+\.\S+/.test(req.body.email))){
    //     res.json({
    //         message:'username not valid',
    //         data:''
    //     })        
    // } 

    else if(req.body.password==""){
        res.json({
            message:'password is required',
            data:''
        })
    }

    else if(req.body.category==""){
        res.json({
            message:'category is required',
            data:''
        })
    }
//|| req.body.category!="BUSINESS APPS" || req.body.category!="EDUCATIONAL APPS" || req.body.category!="LIFESTYLE APPS" || req.body.category!="ENTERTAINMENT APPS" || req.body.category!="UTILITY APPS" || req.body.category!="TRAVEL APPS"
    else if(parseInt(req.body.category)<1 && parseInt(req.body.category)>7){
        res.json({
            message:'category is invalid',
            data:''
        })
    }



   else next()


}