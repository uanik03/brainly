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

export const addContent = async(content:Content, token:string) =>{
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


export const deleteCard = async (token:string) => {
    try {
        const response = await api.delete("/content",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return response.data.msg
        
    } catch (error) {
        console.log(error)
        
    }
    
}