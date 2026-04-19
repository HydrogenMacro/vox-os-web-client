import { createTogglableStore } from "@/lib/togglableStore";
import { cn } from "@/lib/utils/cn";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Book, Cog, History, Menu, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { useSnapshot } from "valtio";

export const sidebarStore = createTogglableStore(false);
export function AppSidebar() {
    const { off: closeSidebar, isOn: sidebarIsOpen } = useSnapshot(sidebarStore);
    const router = useRouter();
    useEffect(() => {
        return router.subscribe("onResolved", () => {
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
                        [<History />, "History", "/app/records"],
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
    const { on: openSidebar } = useSnapshot(sidebarStore);
    return (
        <button className="btn btn-square btn-ghost" onClick={openSidebar}>
            <Menu />
        </button>
    );
}
