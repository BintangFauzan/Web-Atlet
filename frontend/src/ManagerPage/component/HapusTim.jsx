import Button from "../../ui/Button";
import { Modal } from "../../ui/ModalDialog";

export default function HapusTim({openModalHapusTim, handleCloseModalHapusTim, submitHapusTim}){
    return(
        <Modal isOpen={openModalHapusTim} onClose={handleCloseModalHapusTim} className="max-w-xl p-6">
                  <div className="justify-center items-center p-5 m-5">
                         <h2 className="text-center text-lg font-medium">Apa anda yakin ingin menghapus tim ini?</h2>
                         <div className="items-center flex justify-center space-x-4 mt-4">
                            <Button onClick={submitHapusTim}>Hapus</Button>
                            <Button onClick={handleCloseModalHapusTim}>Batal</Button>
                         </div>
                    </div>
              </Modal>
    )
}