import { cn } from "@/lib/utils/cn";
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import { Ellipsis, Settings2, SlidersHorizontal, CircleQuestionMark, Star, Lightbulb } from "lucide-react";
import { useState } from "react";
import { AppSidebarButton } from "./AppSidebar";
import { floatingTranscriptStore, FloatingTranscript } from "./FloatingTranscript";
import { VoiceVisualizer } from "./VoiceVisualizer";
import { useSnapshot } from "valtio";

export function Navbar() {
    const { refs: optionsRefs, floatingStyles: optionsStyles } = useFloating({
        placement: "bottom",
        middleware: [offset(8)],
        whileElementsMounted: autoUpdate
    });
    const {
        refs: floatingTranscriptRefs,
        floatingStyles: floatingTranscriptStyles,
    } = useFloating({
        placement: "bottom",
        middleware: [offset(8)],
        whileElementsMounted: autoUpdate
    });
    const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
    const floatingTranscriptSnap = useSnapshot(
        floatingTranscriptStore
    );
    return (
        <>
            <div
                className="w-full h-16 flex p-2 items-center justify-between bg-base-200 overflow-clip relative"
                ref={(ref) => {
                    floatingTranscriptRefs.setReference(ref);
                }}
            >
                <div className="flex-1">
                    <AppSidebarButton />
                </div>
                <button
                    className="w-7/12 h-6 flex items-center group"
                    onClick={floatingTranscriptSnap.toggle}
                >
                    <VoiceVisualizer />
                    <div
                        className={cn(
                            "absolute top-11 left-1/2 -translate-x-1/2 opacity-50 group-hover:opacity-70 group-active:opacity-90 transition-opacity",
                            floatingTranscriptSnap.isOn && "opacity-0",
                        )}
                    >
                        <Ellipsis size={20} />
                    </div>
                </button>
                <div className="flex-1 min-h-0 flex items-center justify-end">
                    <button
                        className="flex-0 p-2 btn btn-ghost"
                        onClick={() => setOptionsMenuOpen((s) => !s)}
                        ref={optionsRefs.setReference}
                    >
                        <Settings2 />
                    </button>
                </div>
            </div>
            <div
                ref={optionsRefs.setFloating}
                style={optionsStyles}
                className={cn(
                    "flex transition-[max-height] overflow-hidden",
                    optionsMenuOpen ? "max-h-[calc(32px+3*24px+(3-1)*16px)]" : "max-h-0",
                )}
            >
                <div className="flex-1 flex flex-col p-4 gap-4 rounded-lg bg-neutral-500/30 backdrop-blur-sm ">
                    <SlidersHorizontal className="flex-none" />
                    <CircleQuestionMark className="flex-none" />
                    <Lightbulb className="flex-none" />
                </div>
            </div>
            <FloatingTranscript
                ref={floatingTranscriptRefs.setFloating}
                style={floatingTranscriptStyles}
            />
        </>
    );
}
