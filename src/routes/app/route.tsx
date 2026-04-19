import { cn } from "@/lib/utils/cn";
import {
    AppSidebar,
    AppSidebarButton,
} from "@/routes/app/-components/AppSidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { StatusToast } from "./-components/StatusToast";
import { Navbar } from "./-components/Navbar";

export const Route = createFileRoute("/app")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <div className="w-dvw h-dvh overflow-hidden flex flex-col">
                <Navbar />
                <Outlet />
            </div>
            <AppSidebar></AppSidebar>
            <StatusToast />
        </>
    );
}
