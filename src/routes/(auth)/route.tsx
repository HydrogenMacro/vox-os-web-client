import { RingBuffer } from '@/lib/utils/ringBuffer';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { XCircle } from 'lucide-react';
import { useEffect, useState, type PropsWithChildren } from 'react'
import { proxy, ref, useSnapshot } from 'valtio';

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
})



export type Toast = { expirationTimestamp: number, text: string }
export const toastsStore = proxy<{
  toasts: RingBuffer<Toast>,
  addToast: (toast: string) => void,
}>({
  toasts: new RingBuffer(3),
  addToast(text: string) {
    this.toasts.pushEnd({ text, expirationTimestamp: Date.now() + 3500 });
  }
});

function ToastContainer() {
    const { toasts } = useSnapshot(toastsStore);
    useEffect(() => {
      const intervalId = setInterval(() => {
        let oldestToast = toastsStore.toasts.get(0);
        if (!oldestToast) return;
        if (Date.now() > oldestToast.expirationTimestamp) {
          toastsStore.toasts.popStart();
        }
      }, 100);
      return () => {
        clearInterval(intervalId);
      }
    }, []);
    return <div className="toast toast-center toast-top">
        {toasts.map((toast, i) => <Toast key={i}>{toast.text}</Toast>)}
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
