import { createFileRoute, Outlet } from '@tanstack/react-router'
import { XCircle } from 'lucide-react';
import { useEffect, useState, type PropsWithChildren } from 'react'
import { proxy, useSnapshot } from 'valtio';

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
})

let id = 0;

export const toastsStore = proxy<{
  toasts: Record<string, string>,
  addToast: (toast: string) => number,
}>({
  toasts: {},
  addToast(toast: string) {
    const toastId = id++;
    toastsStore.toasts[toastId] = "" + toast + toastId;
    setTimeout(() => {
        delete toastsStore.toasts[String(toastId)];
    }, 3000);
    return toastId;
  }
});

function ToastContainer() {
    const { toasts } = useSnapshot(toastsStore)
    useEffect(() => {
      console.log(toasts)
    }, [toasts]);
    return <div className="toast toast-center toast-top">
        {Object.values(toasts).map((toastMessage, i) => <Toast key={i}>{toastMessage}</Toast>)}
    </div>
}
function Toast({ children }: PropsWithChildren<{}>) {
  return <div className="alert alert-error flex gap-4"><XCircle /><div className="flex-1">{children}</div></div>
}
function RouteComponent() {
  return <>
    <Outlet />
    <ToastContainer />
  </>
}
