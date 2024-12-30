import api from "./api"

interface SignUpData {
    username:string
    email:string
    password:string
}

interface LoginData {
   
    email:string
    password:string
}
export const signUp = async (data:SignUpData) => {
  try {
      const response = await api.post("/user/signup", data)
      console.log(data)
      if(!response.data){
          throw new Error("something went wrong");
          
      }
      return response.data
  } catch (error) {
    console.log(error)
  }
}

export const login = async (data:LoginData) => {
   try {
     const response = await api.post("/user/login", data)
    if(!response.data){
        throw new Error("something went wrong");
        
    }
    return response.data
} catch (error) {
  console.log(error)
}
}