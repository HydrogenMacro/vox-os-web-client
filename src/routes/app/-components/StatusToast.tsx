import { cn } from "@/lib/utils/cn";
import { Loader } from "lucide-react";
import type { ReactNode } from "react";
import { proxy, useSnapshot } from "valtio";

type Lifetime = "short" | "long";

type StatusToastContent =
    | { type: "message"; message: string }
    | { type: "throbber"; caption: string };

export const statusToastStore = proxy<{
    isDisplayed: boolean;
    content: StatusToastContent | null;
    notifTimeoutId: number | null;
    hide: () => void;
    showContent: (content: StatusToastContent, lifetime: Lifetime) => void;
    showMessage: (message: string, lifetime: Lifetime) => void;
    showThrobber: (caption: string, lifetime: Lifetime) => void;
}>({
        isDisplayed: false,
        content: null,
        notifTimeoutId: null,
        hide() {
                statusToastStore.isDisplayed = false;
                const notifTimeoutId = statusToastStore.notifTimeoutId;
                if (notifTimeoutId) clearTimeout(notifTimeoutId);
                statusToastStore.notifTimeoutId = null;
            },
        showContent (content, lifetime)  {
            const notifTimeoutId = statusToastStore.notifTimeoutId;
            if (notifTimeoutId) clearTimeout(notifTimeoutId);
            let ms: number;
            switch (lifetime) {
                case "long":
                    ms = 2500;
                    break;
                case "short":
                    ms = 1500;
                    break;
            }
                statusToastStore.content = content;
                statusToastStore.notifTimeoutId = setTimeout(() => {
                    statusToastStore.hide();
                }, ms);
                statusToastStore.isDisplayed = true;
            
        },
        showMessage (message, lifetime)  {
            statusToastStore.showContent({ type: "message", message }, lifetime);
        },
        showThrobber(caption, lifetime) {
            statusToastStore.showContent({ type: "throbber", caption }, lifetime);
        },
});

export function StatusToast() {
    const  {content, hide: hideToast, isDisplayed} = useSnapshot(statusToastStore)
    let contentEl: ReactNode;
    switch (content?.type) {
        case "message":
            contentEl = <>{content.message}</>;
            break;
        case "throbber":
            contentEl = <div className="w-full h-full flex flex-col items-center justify-center">
                <Loader className="bg-"/>
                <div className="text-sm">{content.caption}</div>
            </div>;
            break;
        default:
            contentEl = <></>;
            break;
    }
    return (
        <div
            className={cn(
                "fixed top-1/2 left-1/2 -translate-1/2 select-none p-3 rounded-xl bg-neutral-700/90 max-w-1/2 text-center transition-opacity backdrop-blur-[2px]",
                !isDisplayed && "opacity-0",
            )}
            onClick={() => hideToast()}
        >
            {contentEl}
        </div>
    );
}
