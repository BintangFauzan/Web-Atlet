import { useEffect, useRef } from "react"

export default function ModalDialog({isModalOpen, children, onClose}){
    const modalOpen = useRef(null)

    useEffect(() => {
        if(isModalOpen){
            modalOpen.current.showModal()
        }else{
            modalOpen.current.close()
        }
    }, [isModalOpen])
    return(
        <>
         <dialog ref={modalOpen} onClose={onClose} className=' fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[30rem] rounded-xl shadow-xl z-50 overflow-auto p-6 backdrop:bg-black/50'>
        {children}
        </dialog>
        </>
    )
}