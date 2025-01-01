import { Content } from "@/recoil/contentAtoms";
import api from "./api";



export const getAllContent = async (token:string) => {
    const response = await api.get('/content',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    console.log(response)
    return response?.data?.content
    
}

export const addContent = async(content:{title:string, link?:string, contentType:string, content?:string}, token:string) =>{
    try {
        const response = await api.post('/content',content,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
         
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const deleteCard = async (token:string, cardId:string) => {
    try {
        const response = await api.delete(`/content/${cardId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return response.data.msg
        
    } catch (error) {
        console.log(error)
        
    }
    
}


export const shareBrain = async(token:string)=>{
    let myLink = "http://localhost:5173/shared/"
    try {
        const response = await api.post("/content/share", {},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(!response){
            return 
        }
        myLink += response.data.hash
        return myLink
    } catch (error) {
        console.log(error)
    }

}

export const getSharedContent = async (hash:string) => {
    try {
        const response = await api.get(`/content/shared/${hash}`);
        
        
        return response?.data?.content
    } catch (error) {
        console.log(error)
        return error
        
    }
    
}

export const deleteShareableLink = async(token:string)=>{
    try {
        const response = await api.delete("/content/share",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
console.log(response)
        if(response.status===200){
            return response.data
        }
        return
        
    } catch (error) {
        return error
    }

}