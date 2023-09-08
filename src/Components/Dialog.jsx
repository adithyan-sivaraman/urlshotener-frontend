import { UserContext } from "../Context/UserContext";


const AlertDialog = () => {
    const {  setDialogOpen, dialogText } = UserContext();
    return (
        
        <dialog
            className="dialog-parent">
            <div className="dialog">
            <p className="text-xl font-bolder py-2">Alert !</p>
            <p className="text-lg font-bolder py-2">{dialogText}</p>
            <button
                className="bg-blue-500 text-white tracking-wider rounded-md px-4 py-1 mt-2"
                onClick={() => setDialogOpen(false)}
                type="button">Close</button>
            </div>
            
        </dialog>
        
    )

}
export default AlertDialog;