import { useContext } from "react";
import TimManagementTable from "./component/TimManagementTable";
import { AdminContext } from "../context/AdminContextStore";
import AthleteManagementTable from "./component/AthleteManagementTable";
import { Modal } from "../ui/ModalDialog";
import Button from "../ui/Button";
import HapusForm from "./component/HapusForm";
import FormComponent from "./component/FormComponent";
import FormAtlet from "./component/FormAtlet";

export default function DashboardAdmin(){
    const {openModal,closeModalDelete} = useContext(AdminContext)
    const token = localStorage.getItem('AuthToken')
    console.log("token", token);
    return(
       <>
       <Modal isOpen={openModal.type !== null} onClose={closeModalDelete} className="max-w-xl p-6">
       {(openModal.type === "delete" || openModal.type === "hapusAtlet") && (
         <HapusForm/>
       )}
       {openModal.type === "input" && (
         <FormComponent/>
       )}
       {openModal.type === "inputAtlet" && (
         <FormAtlet/>
       )}
       </Modal>
       <TimManagementTable/>
       <AthleteManagementTable/>
       </>
    )
}