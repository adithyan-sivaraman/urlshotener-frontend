import { useEffect, useState } from "react";
import UrlIcon from '../../assets/url-144.png'
import AlertDialog from "../Dialog";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { apiEndpoint } from "../../Config";

const ShortenUrl = () => {
    const { dialogOpen, setDialogOpen, setDialogText,setUrlData } = UserContext()
    const [longUrl, setLongUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('');
    const [spinner,setSpinner] = useState(false)
    const [isUrlVisibility, setIsUrlVisibility] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        window.addEventListener('keydown', (e)=>{
            
            if(e.key==="Escape"){
                navigate('/dashboard')
            }
            
        })
    },[dialogOpen,setDialogOpen,navigate])
    const resetForm = ()=>{
        setLongUrl('')
        setShortUrl('')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem('user'));
        setSpinner(true);
        const request = await fetch(`${apiEndpoint}/url/shorten`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userData.email, longUrl: longUrl }),
        });
        const response = await request.json();
        setSpinner(false);
        if(request.status === 500){
            setDialogOpen(true);
            setDialogText("Error Occured in Shortening URL! Please try again later");
            return;
        }
        if (response.message === "exists") {
            setDialogOpen(true);
            setDialogText("This URL has already been shortened.");
            return;
        }
        
        setLongUrl('')
        const data = response.data;
    
        setShortUrl(data.shortUrl)
        setUrlData((prevData)=>[...prevData, {...data,shortUrl: data.shortUrl.split('/')[4]}]);
        setIsUrlVisibility(true);
    };


    return (
        
        
        <div className="dialog-parent select-none">
            {dialogOpen && <AlertDialog />}
            <form
                className="dialog-url"
                onSubmit={handleSubmit}>
                <img src={UrlIcon} alt="" width={70} height={70} />
                <div className="flex flex-row justify-between w-full">
                    <p className="text-center text-xl font-bold w-full">Shorten an URL</p>
                    <button 
                    onClick={()=>navigate('/dashboard')}
                    className="text-lg hover:bg-blue-500 hover:text-white px-2"
                    type="button">X</button>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row w-full sm:items-start px-4">
                    <label
                        className=" w-1/6 text-gray-700 text-sm lg:text-base tracking-wider font-bold mb-2"
                        htmlFor="longUrl">Long URL:</label>
                    <textarea
                        className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full sm:w-5/6 h-28 resize-none overflow-auto"
                        spellCheck={false}
                        id="longUrl"
                        name="longUrl"
                        rows="4"
                        cols="50"
                        value={longUrl}
                        onInput={(e) => setLongUrl(e.target.value)}
                        required
                    />
                </div>
                
                {isUrlVisibility && (
                    <div className="mt-4 flex flex-col sm:flex-row w-full sm:items-center px-4">
                        <label
                            className=" w-1/6 text-gray-700 text-sm lg:text-base tracking-wider font-bold mb-2"
                            htmlFor="shortUrl">Short URL:</label>
                        <input
                            className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full sm:w-5/6"
                            type="text"
                            id="shortUrl"
                            name="shortUrl"
                            value={shortUrl}
                            readOnly
                        />
                    </div>
                )}

                <div className="mt-4 flex flex-row w-full sm:items-center justify-between px-4">
                    <button
                        className="select-none btn btn-grad mt-4   tracking-wider  text-white font-bold py-1 px-4 rounded "
                        type="submit">Submit</button>

                        <div className={spinner?'spinner':''}></div>
                        <button
                        className="select-none btn btn-grad mt-4   tracking-wider  text-white font-bold py-1 px-4 rounded "
                        type="reset" onClick={resetForm}>Clear</button>
                </div>
            </form>
        </div>
        
    )
}

export default ShortenUrl;