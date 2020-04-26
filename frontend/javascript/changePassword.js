function changePassword(){
    
showSpinner()
    data={
        current:document.getElementById('current').value,
        new:document.getElementById('new').value,
        confirm:document.getElementById('confirm').value
    }

    console.log("change ---- ",data);
    let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/auth/change-password",true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("token", localStorage.getItem("token"));
    request.send(JSON.stringify(data));
    request.onload=()=>{
        hideSpinner()
        console.log(JSON.parse(request.response));
        snackbar(JSON.parse(request.response).message)
    }
}

