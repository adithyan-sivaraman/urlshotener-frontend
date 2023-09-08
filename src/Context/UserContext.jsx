/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";
import { apiEndpoint } from "../Config";

const Context = createContext()

export function ContextProvider({ children }) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogText, setDialogText] = useState(false)
    const [urlData, setUrlData] = useState([]); // Initialize urlData with null
    const getData = async()=>{
        const userData = JSON.parse(localStorage.getItem('user'));
        const userId = userData.userId;

        const request = await fetch(`${apiEndpoint}/url/fetch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId }),
        });
        const response = await request.json();
        
        if (response.message === "found") {
            setUrlData(response.urlData);
        }
        
    }
    useEffect(() =>{
        if(localStorage.getItem('user')){
            getData();
            
        }
        
    },[])

    return (

        <Context.Provider value={{dialogOpen,setDialogOpen,dialogText,setDialogText,urlData,setUrlData}}>
            {children}
        </Context.Provider>
    )
}

export function UserContext() {
    return useContext(Context);
  }
  