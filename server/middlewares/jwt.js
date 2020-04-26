const jwt=require('jsonwebtoken')

exports.generateJWT=(data)=>{
    console.log("---jwt middleware--- ",data);
    
    var token = jwt.sign(data, 'loginToken');
    return token;
}

//var token = jwt.sign({ data: 'bar',email:'ddd@gmail.com' }, 'loginToken');



    

exports.verifyJWT=(data)=>{
    console.log(data);
    
   return jwt.verify(data.token, 'loginToken',(err,data)=>{
    if(err)
      return 'Invalid Token';
    else return 'Token verified'  
      
  });
}