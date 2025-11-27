import Button from "../../ui/Button";

export default function HapusJadwal({onClick, onClose}){
    return(
        <>
            <div className="justify-center items-center p-5 m-5">
                 <h2 className="text-center text-lg font-medium">Apa anda yakin ingin menghapus jadwal latihan ini?</h2>
                 <div className="items-center flex justify-center space-x-4 mt-4">
                    <Button onClick={onClick}>Hapus</Button>
                    <Button onClick={onClose}>Batal</Button>
                 </div>
            </div>
        </>
    )
}