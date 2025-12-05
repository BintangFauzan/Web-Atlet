import { useContext } from "react"
import { CaborContext } from "../../context/ManagerCaborContext"
import Button from "../../ui/Button"

export default function HapusCabor(){
    const {submitHapusCabor,handleCloseModalHapusCabor} = useContext(CaborContext)
    return(
         <div className="justify-center items-center p-5 m-5">
                 <h2 className="text-center text-lg font-medium">Apa anda yakin ingin menghapus cabor ini?</h2>
                 <div className="items-center flex justify-center space-x-4 mt-4">
                    <Button onClick={submitHapusCabor}>Hapus</Button>
                    <Button onClick={handleCloseModalHapusCabor}>Batal</Button>
                 </div>
            </div>
    )
}