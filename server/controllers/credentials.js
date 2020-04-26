const credentialModel=require('../models/credentials')

exports.saveCredential=(data)=>{
    return new Promise((resolve,reject)=>{

        credentialModel.create(data).then((result)=>{

            if(result!=null && result._id){
                resolve("Created Succesfully")
            }
            else resolve("Not Created Succesfully")

        }).catch((err)=>{
            console.log(err);
            reject(err)
        })

    })
}



exports.updateCredential=(data,id)=>{


    console.log(data);
    console.log(id);
    
    
    return new Promise((resolve,reject)=>{

        credentialModel.findOneAndUpdate({_id:id},{$set:{email:data.email,password:data.password,category:data.category,note:data.note}}).then((result)=>{

            console.log(result);
            

            if(result="")
                resolve("not updated")
            else resolve("Updated successfully")
        })

    })

}

exports.deleteCredential=(data)=>{
    return new Promise((resolve,reject)=>{

        credentialModel.findOneAndRemove({_id:data}).then((result)=>{
            console.log(result);
            
            if(result==null)
            resolve("not deleted")

        else resolve("Deleted successfully")

        })
    })
}

exports.allCredential=(data,category)=>{
    return new Promise((resolve,reject)=>{

        if(category!=null){

            credentialModel.find({userEmail:data,category:category},'email password category note').then((result)=>{
                console.log(result);
    
                if(result==null)
                    resolve("Empty")
    
            else resolve(result)
            })
    

        }
        else{
        credentialModel.find({userEmail:data},'email password category note').then((result)=>{
            console.log(result);

            if(result==null)
                resolve("Empty")

        else resolve(result)
        })
    }
    })
}

exports.particularCredential=(data)=>{
    console.log(data);
    
    return new Promise((resolve,reject)=>{
        credentialModel.find({_id:data},'email password category note').then((result)=>{
            console.log(result);

            if(result==null)
                resolve("Empty")

        else resolve(result)
        })
    })
}