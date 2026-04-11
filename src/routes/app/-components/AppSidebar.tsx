import { cn } from "@/lib/utils/cn";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Book, Cog, Menu, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SidebarStore {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
    open: () => void;
}
export const useSidebarStore = create<SidebarStore>()(
    immer((set) => ({
        isOpen: false,
        toggle: () =>
            set((s) => {
                s.isOpen = !s.isOpen;
            }),
        close: () =>
            set((s) => {
                s.isOpen = false;
            }),
        open: () =>
            set((s) => {
                s.isOpen = true;
            }),
    })),
);
export function AppSidebar() {
    const closeSidebar = useSidebarStore((s) => s.close);
    const sidebarIsOpen = useSidebarStore((s) => s.isOpen);
    const router = useRouter();
    useEffect(() => {
        return router.subscribe("onResolved", () => {
            console.log(2);
            closeSidebar();
        });
    }, []);

    const pathname = useLocation({ select: (location) => location.pathname });
    return (
        <>
            <div
                className={cn(
                    "fixed left-0 top-0 w-full h-full bg-black/50 opacity-0 pointer-events-none transition-opacity duration-300",
                    sidebarIsOpen && "opacity-100 pointer-events-auto",
                )}
                onPointerDown={closeSidebar}
            ></div>
            <div
                className={cn(
                    "fixed left-0 top-0 flex flex-col w-8/12 h-full bg-base-100 -translate-x-[calc(100%+1px)] transition-transform duration-200",
                    sidebarIsOpen && "translate-x-0",
                )}
            >
                <div className="text-4xl p-4">VoxOS</div>
                {(
                    [
                        [<MessageCircle />, "Chat", "/app"],
                        [<Book />, "Records", "/app/records"],
                        [<Cog />, "Settings", "/app/records"],
                    ] as const
                ).map(([icon, text, path], i) => (
                    <Link
                        to={path}
                        key={i}
                        className={cn(
                            "text-2xl flex items-center gap-4 p-4",
                            pathname == path && "bg-secondary",
                        )}
                    >
                        {icon} {text}
                    </Link>
                ))}
            </div>
        </>
    );
}

export function AppSidebarButton() {
    const openSidebar = useSidebarStore((s) => s.open);
    return (
        <button className="btn btn-square btn-ghost" onClick={openSidebar}>
            <Menu />
        </button>
    );
}
