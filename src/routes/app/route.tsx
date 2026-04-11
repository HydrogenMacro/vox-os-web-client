import {
    AppSidebar,
    AppSidebarButton,
} from "@/routes/app/-components/AppSidebar";
import { offset, useFloating } from "@floating-ui/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ChevronDown, Cog, Ellipsis } from "lucide-react";
import {
    FloatingTranscript,
    useFloatingTranscriptStore,
} from "./-components/FloatingTranscript";
import { VoiceVisualizer } from "./-components/VoiceVisualizer";
import { cn } from "@/lib/utils/cn";

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
        </>
    );
}

function Navbar() {
    const { refs, floatingStyles } = useFloating({
        placement: "bottom",
        middleware: [offset(8)],
    });
    const toggleFloatingTranscript = useFloatingTranscriptStore(s => s.toggle);
    const floatingTranscriptOn = useFloatingTranscriptStore(s => s.isOn);
    return (
        <>
        <div
            className="w-full h-16 flex p-2 items-center justify-between bg-base-200 overflow-clip relative"
            ref={refs.setReference}
        >
            <div className="flex-1">
                <AppSidebarButton />
            </div>
            <button className="w-7/12 h-6 flex items-center group" onClick={toggleFloatingTranscript}>
                <VoiceVisualizer segmentsCount={20} />
                <div className={cn("absolute top-11 left-1/2 -translate-x-1/2 opacity-50 group-hover:opacity-70 group-active:opacity-90 transition-opacity", floatingTranscriptOn && "opacity-0")}>
                    <Ellipsis size={20} />
                </div>
            </button>
            <div className="flex-1 min-h-0 flex items-center justify-end">
                <button className="flex-0 p-2 btn btn-ghost" onClick={() => 21}>
                    <Cog />
                </button>
            </div>
            
        </div>
        <FloatingTranscript ref={refs.setFloating} style={floatingStyles} />
        </>
    );
}
