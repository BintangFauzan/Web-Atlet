import { useContext } from "react";
import Button from "../../ui/Button";
import { AdminContext } from "../../context/AdminContextStore";

export default function HapusForm(){
    const {closeModalDelete,submitDeleteTim, openModal, closeModalDeleteAtlet, submitDeleteAtlet,id} = useContext(AdminContext)
    let message
    console.log("ID hapus atlet", id);
    if(openModal.type === "hapusAtlet"){
        message = (
            <div className="justify-center items-center p-5 m-5">
                 <h2 className="text-center text-lg font-medium">Apa anda yakin ingin menghapus {id.idDeleteAtlet?.name} ini?</h2>
                 <div className="items-center flex justify-center space-x-4 mt-4">
                    <Button onClick={submitDeleteAtlet}>Hapus</Button>
                    <Button onClick={closeModalDeleteAtlet}>Batal</Button>
                 </div>
            </div>
        )
        return message
    }else if(openModal.type === "delete"){
        message = <div className="justify-center items-center p-5 m-5">
                 <h2 className="text-center text-lg font-medium">Apa anda yakin menghapus tim ini?</h2>
                 <div className="items-center flex justify-center space-x-4 mt-4">
                    <Button onClick={submitDeleteTim}>Hapus</Button>
                    <Button onClick={closeModalDelete}>Batal</Button>
                 </div>
            </div>
        return message
    }
    return(
        <>
            {message}
        </>
    )
}