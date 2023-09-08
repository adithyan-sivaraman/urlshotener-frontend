/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import AlertDialog from "../Dialog";
import { UserContext } from "../../Context/UserContext";
import { apiEndpoint } from "../../Config";

const ActivateEmail = ()=>{

    const [params,] = useSearchParams();
    let token = params.get('token');
    const {setDialogOpen,setDialogText,dialogOpen}  = UserContext()
    const navigate = useNavigate();

    const verifyLink = async()=>{
        const req = await fetch(`${apiEndpoint}/activate`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token: token})
        })
        const response = await req.json();

        if(response.message==="link expired"){
            setDialogOpen(true);
            setDialogText("Activation link expired! A new activation link has been sent");
            navigate('/');
            
        }
        else if(response.message==="link invalid"){
            setDialogOpen(true);
            setDialogText("Activation link is not valid");
            setTimeout(()=>{
                setDialogOpen(false);
                window.close();
            },2000)

        }
        else if(response.message==="already activated"){
            setDialogOpen(true);
            setDialogText("User already activated ! Proceed to login");
            token ="";
            navigate('/');

        }
        else {
            setDialogOpen(true);
            setDialogText("User Activated successfully! Proceed to login");
            token ="";
            navigate('/');
        }
    }
    
    useEffect(()=>{
        if(token!==""){
            verifyLink();
        }
    },[token])

    if(dialogOpen){
        return(
            <AlertDialog />
            )
    }
    
}

export default ActivateEmail;