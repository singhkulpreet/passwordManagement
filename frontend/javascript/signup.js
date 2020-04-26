

function tokenExistence(){
    
    showSpinner()

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
        hideSpinner()
        console.log(request.response);
        if(request.response=="Token verified"){
            //window.location.replace("");
            location.href='./dashboard.html'
        }
        else localStorage.removeItem("token")
    }   

}
}





function signup(){

    showSpinner()


    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var firstName=document.getElementById('firstName').value;
    var lastName=document.getElementById('lastName').value;
    var phone=document.getElementById('phone').value;
    //alert(email)

    signup=JSON.stringify({
        'email':email,
        'password':password,
        'firstName':firstName,
        'lastName':lastName,
        'phone':phone
    })

    // token=localStorage.getItem("token")

    let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/auth/signup",true)
    // request.withCredentials = true
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // request.setRequestHeader("token",token)
    request.send(signup);


    request.onload=()=>{

        hideSpinner()

        console.log(JSON.parse(request.response));
       // console.log(JSON.parse(request.response).message);

       if(JSON.parse(request.response).message=='verification email sent'){
        var queryString = "?para1=" + email;
        location.href='./verifyEmail.html'+queryString
       }
       else snackbar(JSON.parse(request.response).message)
    }
}


