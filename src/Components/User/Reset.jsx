/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faEye } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from "../../Context/UserContext";
import AlertDialog from "../Dialog";
import { apiEndpoint } from "../../Config";


const ResetScreen = () => {
    const initialValues = {
        email: "",
        password: "",
        confirmpwd: "",
    }

    const [formData, setFormData] = useState(initialValues)
    const [resetForm, setResetForm] = useState(false);
    const [passwordType, setPasswordType] = useState(true)
    const [error,setError] = useState(false);
    const [conformPasswordType, setConfirmPasswordType] = useState(true)
    const {dialogOpen, setDialogOpen, setDialogText } = UserContext()
    const navigate = useNavigate();
    const [params,] = useSearchParams();
    const token = params.get('token') || "";

    const verifyToken = async () => {

        if (token) {
            const request = await fetch(`${apiEndpoint}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token }),
            });
            const response = await request.json();
            
            if (response.message === "valid link") {
                setResetForm(true)
                setFormData({ ...formData, email: response.email });

            }
            else if (response.message === "link expired " || response.message === "link invalid") {
                setDialogOpen(true)
                setDialogText(`Password reset ${response.message}! Please try password reset again`)
                navigate('/reset')
                return;
            }
        }

    }

    useEffect(() => {
        verifyToken();
    }, [token])
    
    useEffect(()=>{
        window.addEventListener('keydown', (e)=>{
            if(e.key==="Escape" && dialogOpen){
                setDialogOpen(false)
            }
        })
    },[dialogOpen,setDialogOpen])

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
        
        if (name === 'confirmpwd' && formData.password !== value) {
            setError("Passwords not matching");
        } else if (name === 'confirmpwd' && formData.password === value) {
            setError(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(formData.password && !regex.test(formData.password)){
            setDialogOpen(true)
            setDialogText("Please enter a valid password")
            return;
        }

        const request = await fetch(`${apiEndpoint}/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: formData.email,password: formData.password,token:token}),
        });

        const response = await request.json();
        if(request.status ===500){
            setDialogOpen(true)
            setDialogText("Unable to process your request. Please try again")
            return;
        }
        else if (response.message === "user not found") {
            setDialogOpen(true)
            setDialogText("Email ID entered is invalid. Please enter a valid Email ID")
            return;
        }
        else if (response.message === "user not active") {
            setDialogOpen(true)
            setDialogText("User ID not activated. Please activate your account")
            return;
        }
        else if (response.message === "password reset") {
            setDialogOpen(true)
            setDialogText("Password reset successfully! Please login with new password")
            setTimeout(() => {
                navigate('/')
            },2000);
            return;
        }
        setDialogOpen(true)
        setDialogText("Password reset mail sent successfully! Please check your email")
        setFormData(initialValues)

    }
    if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))) {
        return <Navigate to={'/dashboard'} replace />
    }
    return (
        <div className="container select-none">
        {dialogOpen && <AlertDialog />}
            <form
                onSubmit={handleSubmit}
                className="reset-form">
                <FontAwesomeIcon icon={faLock} className="lock-icon" />
                <p className="reset-header">Forgot your Password?</p>

                <div className="relative input-group">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <input className="form-input"
                        onInput={handleInput}
                        value={formData.email}
                        readOnly={resetForm}
                        required
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Enter your Email" />
                </div>

                {resetForm && (
                    <div className="relative input-group">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input className="form-input"
                            onInput={handleInput}
                            value={formData.password}
                            name="password"
                            required={resetForm}
                            type={passwordType ? 'password' : 'text'}
                            placeholder="Enter new password" />
                        <FontAwesomeIcon
                            icon={faEye}
                            className="password-icon"
                            onClick={() => setPasswordType(!passwordType)}
                        />
                    </div>
                )}

                {resetForm && (
                    <div className="relative input-group">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input className="form-input"
                            onInput={handleInput}
                            value={formData.confirmpwd}
                            name="confirmpwd"
                            required={resetForm}
                            type={conformPasswordType ? 'password' : 'text'}
                            placeholder="Confirm your new password" />
                        <FontAwesomeIcon
                            icon={faEye}
                            className="password-icon"
                            onClick={() => setConfirmPasswordType(!conformPasswordType)}
                        />
                    </div>
                )}
                
                {error && <span className="error-message">* {error}</span>}
                <div className="pwd-rules">
                <span className="">Password must be atleast 8 characters and atleast</span>
                <span className="">1 Capital Letter</span>
                <span className="">1 Small Letter</span>
                <span className="">1 Number</span>
                <span className="">1 Special Character ( ! @ # $ & * )</span>
            </div>
                <button
                    disabled={error!==false}
                    className="reset-btn btn btn-grad"
                    type="submit">
                    Reset
                </button>
                
                {!resetForm && (
                    <p className="login-text"
                        onClick={() => navigate('/')}>
                        Have an account ? <u>Sign in</u>
                    </p>
                )}


            </form>
        </div>

    )
}

export default ResetScreen;