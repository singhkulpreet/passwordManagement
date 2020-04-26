url_string=window.location.href
var url = new URL(url_string);
var id = url.searchParams.get("id");

function newOrEdit(){
    showSpinner()
    console.log("--id--",id);
    if(id!=null){
        document.getElementById('save').style.display='none'
        document.getElementById('edit').style.display='block'


        let request=new XMLHttpRequest();
        request.open("POST","http://localhost:3000/credentials/particular-credential",true)
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("token", localStorage.getItem("token"));
        request.send(JSON.stringify({id:id}));
        request.onload=()=>{
            hideSpinner()
            console.log(JSON.parse(request.response));
    
            //var queryString = "?para1=" + email;
            //location.href='./verifyEmail.html'+queryString
            document.getElementById('uname').value=JSON.parse(request.response).data[0].email
            document.getElementById('psw').value=JSON.parse(request.response).data[0].password
            document.getElementById('note').value=JSON.parse(request.response).data[0].note
            
        if(JSON.parse(request.response).data[0].category=="GAMING APPS")
        category="1"

        else if(JSON.parse(request.response).data[0].category=='BUSINESS APPS')
        category="2"
        
        else if(JSON.parse(request.response).data[0].category=="EDUCATIONAL APPS")
        category="3"
        
        else if(JSON.parse(request.response).data[0].category=="LIFESTYLE APPS")
        category="4"
        
        else if(JSON.parse(request.response).data[0].category=="ENTERTAINMENT APPS")
        category="5"
        
        else if(JSON.parse(request.response).data[0].category=="UTILITY APPS")
        category="6"
        
        else if(JSON.parse(request.response).data[0].category=="TRAVEL APPS")
        category="7"  
            document.getElementById('category').value=category
        }
    

    }
    else{ document.getElementById('save').style.display='block'
          document.getElementById('edit').style.display='none'  
    }
}

function editDetails(){
    showSpinner()

    var email=document.getElementById("uname").value
    var password=document.getElementById("psw").value
    var note=document.getElementById("note").value
    var category=document.getElementById("category").value

    data=JSON.stringify({
        email:email,
        password:password,
        category:category,
        note:note,
        id:id
    })
    console.log(data);
    

    let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/credentials/update-credential",true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("token", localStorage.getItem("token"));
    request.send(data);
    request.onload=()=>{
        hideSpinner()
        console.log(JSON.parse(request.response));
        snackbar(JSON.parse(request.response).message)
        //var queryString = "?para1=" + email;
        //location.href='./verifyEmail.html'+queryString

    }
}



function saveDetails(){
    showSpinner()

    var uname=document.getElementById('uname').value
    var password=document.getElementById('psw').value
    var category=document.getElementById('category').value
    var note=document.getElementById('note').value
    
    data=JSON.stringify({
        email:uname,
        password:password,
        category:category,
        note:note
    })

    console.log(data);
    

    let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/credentials/",true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("token", localStorage.getItem("token"));
    request.send(data);
    request.onload=()=>{
        hideSpinner()
        console.log(JSON.parse(request.response));
        snackbar(JSON.parse(request.response).message)
        //var queryString = "?para1=" + email;
        //location.href='./verifyEmail.html'+queryString

    }

}
