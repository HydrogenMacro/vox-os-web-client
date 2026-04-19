import type { Togglable } from "@/lib/togglableStore";
import { useEffect, useImperativeHandle, useRef, useState, type PropsWithChildren, type Ref } from "react";

export function Modal({ children, ref }: PropsWithChildren<{ ref?: Ref<{ isOpen: boolean, show: () => void, hide: () => void, toggle: () => void}> }>) {
    const modalRef = useRef<HTMLDialogElement>(null!);
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        const closeCb = () => {
            setIsOpen(false);
        };
        modalRef.current.addEventListener("close", closeCb);
        return () => 
        {
            modalRef.current.removeEventListener("close", closeCb);
        }
    }, )
    useImperativeHandle(ref, () => ({
        isOpen,
        show: () => setIsOpen(true),
        hide: () => setIsOpen(false),
        toggle: () => setIsOpen(s => !s),
    }), [isOpen]);
    return <dialog className="modal" ref={modalRef}>
        <div className="modal-box">
            {children}
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
}