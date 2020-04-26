
url_string=window.location.href
var url = new URL(url_string);
var category = url.searchParams.get("category");
console.log(category);



function allCredential(){

    showSpinner()
    

    let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/credentials/get-credential",true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("token", localStorage.getItem("token"));

    if(typeof category!==undefined)
        request.send(JSON.stringify({category:category}))

    else request.send();

    request.onload=()=>{

        hideSpinner()

        console.log(JSON.parse(request.response));

        credentials=JSON.parse(request.response).data

        if(credentials.length<1){
            snackbar("no records founded")
        }

        else{
        // var col = [];
        // for (var i = 0; i < credentials.length; i++) {
        //     for (var key in credentials[i]) {
        //             console.log("---key---",key);
        //             console.log(col.indexOf(key));
                    
                    
        //         if (col.indexOf(key) === -1) {
        //             col.push(key);
        //         }
        //     }
        // }

        //console.log(col);
        

        var table = document.getElementById("table");

        col=["_id","email","password","category","note","edit","delete"]

        for (var i = 0; i < credentials.length; i++) {


            

            tr = table.insertRow(-1);
            //console.log("------tr-------",tr);
            //console.log(credentials[0].col[0]);
            

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                //console.log("------tabCell-------",tabCell);
                if(j==0)
                    tabCell.innerHTML=i+1

                else if(j==5){
                                        
                    var button = document.createElement('input');
                    button.type = "button";
                    button.className = "btn btn-warning";
                    button.value = "Edit";
                    button.id=credentials[i]._id

                    button.addEventListener("click", function(e) {
                    console.log("Button Id: " + this.id);
                    editCredential(this.id)
                    }); 
                    
                    tabCell.appendChild(button) 
                }

                else if(j==6){
                                        
                    var button = document.createElement('input');
                    button.type = "button";
                    button.className = "btn btn-danger";
                    button.value = "Delete";
                    button.id=credentials[i]._id

                    button.addEventListener("click", function(e) {
                    console.log("Button Id: " + this.id);
                        deleteCredential(this.id)
                    });     

                    tabCell.appendChild(button) 
                }

                else tabCell.innerHTML = credentials[i][col[j]];
            }
        }

        var divShowData = document.getElementById('showData');
        divShowData.innerHTML = "";
        divShowData.appendChild(table);

    }

}

}

function deleteCredential(take){
    showSpinner()
    console.log("delete ---- ",take);
    let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/credentials/delete-credential",true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("token", localStorage.getItem("token"));
    request.send(JSON.stringify({_id:take}));
    request.onload=()=>{
        hideSpinner()
        console.log(JSON.parse(request.response).message);
        snackbar(JSON.parse(request.response).message)
    }
}

function editCredential(take){
        var queryString = "?id=" + take;
        location.href='./newCredential.html'+queryString
}
