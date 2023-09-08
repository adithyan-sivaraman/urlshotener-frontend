import { useState } from "react";
import Menu from "../User/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays,faPlus } from "@fortawesome/free-solid-svg-icons";
import { Chart } from "../Charts/BarChart";
import { VisitedChart } from "../Charts/Visited";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const {urlData} = UserContext();
    const curDt = new Date()
    const date = String(curDt.getFullYear()).padStart(2,"0")+"-"+String(curDt.getMonth()+1).padStart(2,"0");
    const [month,setMonth] = useState(date);
    const navigate = useNavigate()
    return (
        <div className="w-full h-full flex flex-col sm:flex-row select-none">
            <Menu />
            
            <div className="px-4 py-2 grow flex items-center flex-col overflow-auto bg-white">
            <h4>Dashboard</h4>
            {urlData.length===0 && (
                <div className="w-full bg-blue p-4 h-full flex-col flex items-center justify-center border-2">
                <p className="text-sm lg:text-lg">You have not Shortened any URL</p>
                <p 
                    className="text-sm lg:text-lg">
                    Click 
                    <FontAwesomeIcon 
                        className="px-4"
                        onClick={()=>navigate('/shorten')}
                        icon={faPlus} /> to Shorten an URL</p>
                </div>
            )}

            {urlData.length>0 && (
                <>
                <div className="flex flex-row py-4 w-56">
                    
                <FontAwesomeIcon icon={faCalendarDays} className="relative-icon" />
                <input
                    type="month"
                    className="form-input"
                    value={month}
                    title="Select Month"
                    onInput={(e)=>{
                        setMonth(e.target.value)
                    }}
                    
                />
              
            </div>
            <div className="flex flex-col items-center">
            <Chart chartMonth={month}  />
                <VisitedChart />
            </div>
            </>
            )}
            
            
                
            </div>
         
        </div>
    )
}

export default Dashboard;