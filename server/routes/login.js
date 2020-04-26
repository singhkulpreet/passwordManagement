const express=require('express')
const router=express.Router();
const loginCtrl=require('../controllers/login')
const cors=require('cors')
const jwt=require('../middlewares/jwt')
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var validators=require('../validators/login')
var jwtDecode = require('jwt-decode');


// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));


router.use(cors())

// validation done
//response done
router.post('/account-verify',validators.verifyAccount,(req,res)=>{
    data={
        name:req.body.email,
        otp:req.body.otp
    }
     loginCtrl.verifyAcoount(data).then((result)=>{
        console.log("res",result);
        res.json({
            message:result,
            data:''})
    },function(err){
        console.log(err);
        res.json({
                    message:err,
                    data:''})
     })
    //.catch((err)=>{
    //     console.log(err);
    //     res.json({
    //         message:err,
    //         data:''})
    // })
})


// validation done
// response done
router.post('/',validators.loginCheck,(req,res)=>{
    console.log(req.body);
    loginData={
        email:req.body.email,
        password:req.body.password
    }

    loginCtrl.login(loginData).then((data)=>{
        console.log("=-===data.result====",data.result);
        if(data.result!=undefined){
            console.log("ddd");
            
            //res.send('user Login')
            jwtPayload={
                email:data.result.email,
                firstName:data.result.firstName
            }

           var take= jwt.generateJWT(jwtPayload)
           res.json({
            message:"valid credentials",
            data:take})
           console.log("---take---",take);
           
        }
                
        else    { console.log("aa");
        
            res.json({
            message:'wrong credentials',
            data:""})
        }
    })
})


// validation done
// response done
router.post('/signup',validators.signup,(req,res)=>{
        
    signup={
        'email':req.body.email,
        'password':cryptr.encrypt(req.body.password),
        'firstName':req.body.firstName,
        'lastName':req.body.lastName,
        'phone':req.body.phone
    }

    loginCtrl.signup(signup).then((data)=>{
        console.log("--data---",data);
             res.json({
            message:data,
            data:""
        }) 
        
    }).catch((err)=>{
        console.log(err);
    })

 })


 router.post('/check-token-existence',(req,res)=>{
     console.log(req.body);

     if(!req.body.token || req.body.token==""){
        res.json({message:'Token Required',
        data:""}) 
     }

     var result=jwt.verifyJWT(req.body)
     console.log("------x======= ",result);
        
     res.json({message:'',
         data:result})
    
 })


 router.post('/forgot-mail',validators.forgotMail,(req,res)=>{

    console.log(req.body.email);

    loginCtrl.forgotMail(req.body.email).then((result)=>{

        console.log(result);
        
        res.json({
            message:result,
            data:""
        })

    })

 })


router.post('/password-change',validators.changepasswordForgot,(req,res)=>{

    console.log(req.body);
    
    loginCtrl.changepasswordForgot(req.body).then((result)=>{
        console.log(result);
        
        res.json({
            message:result,
            data:""
        })
    })

})

router.post('/change-password',validators.changepassword,(req,res)=>{
    console.log("---token---",req.headers.token);
    
     var result=jwt.verifyJWT(req.headers)
     console.log("------x=======",result);
        
     take=jwtDecode(req.headers.token)
    
     console.log(take);
     

     if(result=='Token verified'){

         loginCtrl.passwordChange(req.body,take.email).then(result=>{

            console.log("---result---",result);
            res.json({
                message:result,
                data:''
            })

        })

     }
})




module.exports=router