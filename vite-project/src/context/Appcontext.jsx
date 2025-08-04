import { createContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext()


const AppContextProvider = (props)=>{

const [user, setUser] = useState(null);

const [showLogin, setShowLogin] = useState(false);

const [token, setToken] = useState(localStorage.getItem('token'))

const [credit , setCredit] = useState(0)

const backendUrl = import.meta.env.VITE_BACKEND_URL

const navigate = useNavigate();


const loadCreditData = async () => {
  try {
     
const {data} = await axios.get(backendUrl + '/api/user/credits', {headers:{token}})
 
if(data.success){
  setCredit(data.credits)
  setUser(data.user)
}

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }


}

// function to call image generate api

const generateImage = async (prompt) => {
  try {
    
  const {data} = await axios.post(backendUrl + '/api/image/generateimage', {prompt}, {headers: {token}})

   if(data.success){

   loadCreditData()

   return data.resultImage

   }else{
    toast.error(data.message)
   loadCreditData()

  if(data.creditBalance === 0){
    navigate('/buy')
  }
   }


  } catch (error) {
    toast.error(error.message)
  }
  
}



const logout = ()=>{

  localStorage.removeItem('token');
  setToken('')
   setUser(null)
}





useEffect(()=>{
if(token){
  loadCreditData()
}
},[token])


const value = {
user, setUser,showLogin,setShowLogin, backendUrl ,token, setToken , credit , setCredit , loadCreditData , logout , generateImage
};
return (
  <AppContext.Provider value ={value}>
      {props.children}
  </AppContext.Provider>
)
 
}

export default AppContextProvider;