/* eslint-disable react/no-unescaped-entities */

import Menu from "../User/Menu";
import { UserContext } from "../../Context/UserContext";
import { apiEndpoint } from "../../Config";
const ViewUrl = () => {
    const { urlData, setUrlData } = UserContext();  
    const formatDate = (date) => {
        const createdDt = new Date(date);
        const formatDt = createdDt.getDate().toString().padStart(2, "0") + "-" + (createdDt.getMonth() + 1).toString().padStart(2, "0") + "-" + createdDt.getFullYear();
        return formatDt;
    }

    const updateCount = (id) => {

        setUrlData((prevData) =>
            prevData.map((item) =>
                Number(item.id)=== Number(id) ? { ...item, visitedCount: item.visitedCount ?item.visitedCount+1 : 1 } : item
            )
        );
    };

    return (
        <div className="view-url-parent">
            <Menu />
            <div className="view-url">
                <h4>List of URL's Shortened</h4>
                {urlData && (
                    <table>
                        <thead>
                            <tr className="tr-list">
                                <th className="border !w-12 px-2 ">Sl.</th>
                                <th className="border w-1/2  px-2 ">Short URL</th>
                                <th className="border w15  px-2">Date</th>
                                <th className="border w10  px-2">Visited Count</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {urlData.length > 0 ? urlData.map((data,index) => (
                                <tr key={index+1} className="text-sm lg:text-lg hover:bg-cyan-500">
                                    <td className="w-12 border text-center ">{index+1}</td>
                                    <td
                                        className="w-2/3 border px-2">
                                        <a target="_blank"
                                            onClick={() => updateCount(data.id)}
                                            rel="noreferrer"
                                            href={`${apiEndpoint}/url/${data.shortUrl}`}
                                            title="click to open link">{apiEndpoint}/url/{data.shortUrl}</a></td>
                                    <td className="w15 border text-center">{formatDate(data.created)}</td>
                                    <td className="w15 border text-center">{data.visitedCount || 0}</td>
                                </tr>
                            )) :
                                <tr>
                                    <td className="td-none"
                                        colSpan={4}>You have not Shortened any URL. No Data found</td>
                                </tr>}
                        </tbody>
                    </table>
                )}
                
            </div>
            
        </div>
    )
}

export default ViewUrl;