import { PropsWithChildren, forwardRef } from 'react'


export const Modal = forwardRef<HTMLDialogElement, PropsWithChildren>(({ children }, ref) => {


    return (
        <>

            <dialog ref={ref} id='my_modal_1' className="modal">
                <div className="modal-box">
                    {children}
                </div>
            </dialog >
        </>
    )
})

