url_string=window.location.href
    var url = new URL(url_string);
    var email = url.searchParams.get("para1");
    console.log(email);


function tokenExistence(){
    
    if(localStorage.getItem("token")){

        token=JSON.stringify({
            'token':localStorage.getItem("token"),
            
        })

        let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/auth/check-token-existence",true)
    // request.withCredentials = true
    // request.setRequestHeader('Content-Type', 'application/json')

    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(token);
    request.onload=()=>{
        console.log(request.response);
        if(request.response=="Token verified"){
            //window.location.replace("");
            location.href='./dashboard.html'
        }
        else localStorage.removeItem("token")
    }   

}

    if(email==null){
        console.log(email);
        
        document.getElementById('otp').style.display="none"
        document.getElementById('otp2').style.display="none"
        document.getElementById('otp3').style.display="none"

        //document.getElementsByClassName('forgot').style="block"
    }
    else {
        document.getElementById('forgot').style.display="none"
        document.getElementById('forgot2').style.display="none"
        document.getElementById('forgot3').style.display="none"
    }

}

function sendForgot(){

    console.log("spinner");
    
    showSpinner()

    email=document.getElementById('forgot').value;
    data=JSON.stringify({
        'email':email,
        
    })

    let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/auth/forgot-mail",true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(data);
    request.onload=()=>{
        hideSpinner()
    console.log(JSON.parse(request.response));
   if( JSON.parse(request.response).message.email!==undefined){
    parameter="?email="+JSON.parse(request.response).message.email   
    location.href="./forgot.html"+parameter
   }
   else snackbar(JSON.parse(request.response).message)    

}
}


function accountVerify(){
    showSpinner()
    var otp=document.getElementById('otp').value;
    //alert(otp)
    // var queryString = decodeURIComponent(window.location.search);
    // queryString = queryString.substring(1);
    // var email = queryString.split("&");
    // console.log(email[1]);

    
    
    
// for (var i = 0; i < queries.length; i++)
// {
//   document.write(queries[i] + "<br>");
// }
    let request=new XMLHttpRequest();
    data=JSON.stringify({
        email:email,
        otp:otp
    })

    console.log(data);
    

    request.open("POST","http://localhost:3000/auth/account-verify",true)
    // request.withCredentials = true
    // request.setRequestHeader('Content-Type', 'application/json')

    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(data);
    request.onload=()=>{
        hideSpinner()
        console.log(JSON.parse(request.response));
        if(JSON.parse(request.response).message=="Account is succesfully verified")
            location.href="./login.html"
        else snackbar(JSON.parse(request.response).message)    
    }
}


