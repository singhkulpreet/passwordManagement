const express=require('express')
const router=express.Router()
var credentialCtrl=require('../controllers/credentials')
const validators=require('../validators/credentials')
const cors=require('cors')
const bodyParser = require('body-parser');
var jwtDecode = require('jwt-decode');
const jwt=require('../middlewares/jwt')
const request = require('request');



// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors())


router.post('/',validators.credentialCheck,(req,res)=>{


    // if(req.headers.token!=undefined){
    //     res.json({message:'Token Required',
    //     data:""}) 
    //  }
    //token=req.headers
    console.log("---token---",req.headers.token);
    
     var result=jwt.verifyJWT(req.headers)
     console.log("------x=======",result);
        
if(result=='Token verified'){


    var category=parseInt(req.body.category)

    console.log(category);
    
        if(category==1)
        category="GAMING APPS"

        else if(category==2)
        category="BUSINESS APPS"
        
        else if(category==3)
        category="EDUCATIONAL APPS"
        
        else if(category==4)
        category="LIFESTYLE APPS"
        
        else if(category==5)
        category="ENTERTAINMENT APPS"
        
        else if(category==6)
        category="UTILITY APPS"
        
        else if(category==7)
        category="TRAVEL APPS"  
        
        var userEmail=jwtDecode(req.headers.token)


    data={
        email:req.body.email,
        password:req.body.password,
        category:category,
        note:req.body.note,
        userEmail:userEmail.email
    }
    console.log("---data---",data);
    console.log("---header---",jwtDecode(req.headers.token));
    console.log("---header---",userEmail.email);
    
    

     credentialCtrl.saveCredential(data).then((result)=>{
           res.json({
               message:result,
               data:""
           }) 
     })

    }
    else res.json({
        message:'token not valid',
        data:""
    })
})


router.post('/update-credential',validators.updateCredential,(req,res)=>{

    console.log("---token---",req.headers.token);
    
    var result=jwt.verifyJWT(req.headers)
    console.log("------x=======",result);
       
    if(result=='Token verified'){


    var category=parseInt(req.body.category)

    console.log(category);
    
        if(category==1)
        category="GAMING APPS"

        else if(category==2)
        category="BUSINESS APPS"
        
        else if(category==3)
        category="EDUCATIONAL APPS"
        
        else if(category==4)
        category="LIFESTYLE APPS"
        
        else if(category==5)
        category="ENTERTAINMENT APPS"
        
        else if(category==6)
        category="UTILITY APPS"
        
        else if(category==7)
        category="TRAVEL APPS" 

    console.log(req.body);
    data={
        email:req.body.email,
        password:req.body.password,
        category:category,
        note:req.body.note,
        //userEmail:userEmail.email
    }
    console.log(data);

    credentialCtrl.updateCredential(data,req.body.id).then((result)=>{

        console.log(result);

        res.json({
            message:result,
            data:''
        })

    })

} else res.json({
    message:'token not valid',
    data:""
})

})


router.post('/delete-credential',(req,res)=>{
    
        console.log((req.body));

    console.log("---token---",req.headers.token);
    
    var result=jwt.verifyJWT(req.headers)
    console.log("------x=======",result);
       
    if(result=='Token verified'){

    

        if(req.body==""){
            res.json({
                message:"id required",
                data:result
            })
        }
        else{
        
    credentialCtrl.deleteCredential(req.body).then((result)=>{

        console.log(result);
        res.json({
            message:result,
            data:''
        })

    })
}
    }
    else res.json({
        message:'token not valid',
        data:""
    })

})


router.post('/get-credential',validators.allCredential,(req,res)=>{


    
    console.log("---token---",req.headers.token);
    
    var result=jwt.verifyJWT(req.headers)
    console.log("------x=======",result);
       
    if(result=='Token verified'){

   
    console.log('-take---',req.headers.token);
    take=jwtDecode(req.headers.token)

var category=null
    if(req.body.category!=null){
         category=parseInt(req.body.category)

        if(category<1 || category>7){
            res.json({
                message:'Invalid category',
                data:''
            })
            return
        }

        else{
        console.log(category);
    
        if(category==1)
        category="GAMING APPS"

        else if(category==2)
        category="BUSINESS APPS"
        
        else if(category==3)
        category="EDUCATIONAL APPS"
        
        else if(category==4)
        category="LIFESTYLE APPS"
        
        else if(category==5)
        category="ENTERTAINMENT APPS"
        
        else if(category==6)
        category="UTILITY APPS"
        
        else if(category==7)
        category="TRAVEL APPS" 
        }
    }
    
    

    console.log("------req.body.category-------",req.body.category);
    
    
    credentialCtrl.allCredential(take.email,category).then((result)=>{
        console.log("------result-------",result);
        res.json({
            message:"all records",
            data:result
        })
    })
    }else res.json({
        message:'token not valid',
        data:''
    })
    
})

router.post('/particular-credential',(req,res)=>{


    console.log("---token---",req.headers.token);
    
    var result=jwt.verifyJWT(req.headers)
    console.log("------x=======",result);
       
    if(result=='Token verified'){
  
    if(typeof req.body.id==undefined){
        res.json({
            message:"id required",
            data:result
        })
    }
    else{
    credentialCtrl.particularCredential(req.body.id).then((result)=>{
        console.log("------result-------",result);
        res.json({
            message:"all records",
            data:result
        })
    })
}
    }else res.json({
        message:'token not valid',
        data:''
    })

})



router.post('/weather',(req,res)=>{

    console.log("hhhh");
promise=new Promise((resolve,reject)=>{

    lat=req.lat,
    long=req.long

    // request('http://api.openweathermap.org/data/2.5/weather?q=India,delhi&APPID=a0e1091675504e32984f635f1a6ed492&mode=json&units=imperial',(err,res,data)=>{
        request('http://api.openweathermap.org/data/2.5/weather?q=India,delhi&lat='+lat+'&lon='+long+'&APPID=a0e1091675504e32984f635f1a6ed492&mode=json&units=imperial',(err,res,data)=>{
     
        if(err)
        console.log(err);
       else{
        console.log(res.statusCode);
        resolve(data)    
       }    
    })
})

promise.then((msg)=>{
    console.log(msg);
    res.json({
        message:'Weather details',
        data:JSON.parse(msg)
    })    
}).catch((err)=>{
    console.log(err);
})

})

module.exports=router