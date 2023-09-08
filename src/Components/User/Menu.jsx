import { useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate();

    return (

        <div className="flex flex-row sm:flex-col border-2 bg-blue-300 w-full sm:h-ful sm:w-36  p-2 items-center justify-center  gap-8">
            <button
                onClick={() => navigate('/dashboard')}
                className="text-base w-full p-2 bg-black text-white " type="button" >Dashboard</button>

            <button
                onClick={() => navigate('/shorten')}
                className="text-base w-full p-2 bg-black text-white " type="button" >Shorten Url</button>

            <button
                onClick={() => navigate('/view')}
                className="text-base w-full p-2 bg-black text-white " type="button" >View Urls</button>
           
            <button
                className="text-base w-full p-2 bg-black text-white " type="button" onClick={() => {
                    localStorage.removeItem('user');
                    navigate('/');
                }}>Logout</button>

        </div>

    )
}

export default Menu;