import { FC, PropsWithChildren, forwardRef } from 'react'

type propsType = {
    style?: string
} & PropsWithChildren
export const Modal = forwardRef<HTMLDialogElement, propsType>(({ children, style }, ref) => {


    return (
        <>

            <dialog ref={ref} id='my_modal_1' className="modal">
                <div className={`modal-box ${style ? style : ""}`}>
                    {children}
                </div>
            </dialog >
        </>
    )
})

