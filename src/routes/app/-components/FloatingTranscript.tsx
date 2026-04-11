import { createTogglableStore } from "@/lib/togglableStore";
import { cn } from "@/lib/utils/cn";
import {
    Bot,
    BotOff,
    Cctv,
    CctvOff,
    ChevronUp,
    Megaphone,
    MegaphoneOff,
    Mic,
    MicOff,
} from "lucide-react";
import { type CSSProperties, type Ref } from "react";
import { appConfig } from "../-state/appConfig";

export const useFloatingTranscriptStore = createTogglableStore();
export function FloatingTranscript({
    ref,
    style,
}: {
    ref?: Ref<HTMLDivElement>;
    style?: CSSProperties;
}) {
    const isOpen = useFloatingTranscriptStore((s) => s.isOn);
    const toggleOpen = useFloatingTranscriptStore((s) => s.toggle);
    return (
        <div
            ref={ref}
            style={style}
            className={cn(
                "w-[calc(100%-16px)] h-50 flex flex-col items-stretch backdrop-blur-[2px] transition-[height,opacity] duration-500 overflow-hidden opacity-95",
                !isOpen && "h-0 opacity-0",
            )}
        >
            <div className="flex">
                {(
                    [
                        [<Mic />, <MicOff />, appConfig.useMicEnabled],
                        [<Bot />, <BotOff />, appConfig.useChatBotEnabled],
                        [
                            <Megaphone />,
                            <MegaphoneOff />,
                            appConfig.useAnnouncingEnabled,
                        ],
                        [<Cctv />, <CctvOff />, appConfig.useRecordingEnabled],
                    ] as const
                ).map(([icon, disabledIcon, useConfigOptionEnabled], i) => {
                    const configOptionEnabled = useConfigOptionEnabled();
                    return (
                        <button
                            className={cn(
                                "flex-1 aspect-square h-auto btn btn-soft rounded-none active:translate-none",
                                !configOptionEnabled.isOn && "btn-active",
                            )}
                            onClick={configOptionEnabled.toggle}
                            key={i}
                        >
                            {configOptionEnabled.isOn ? icon : disabledIcon}
                        </button>
                    );
                })}
            </div>
            <div
                className={cn(
                    "flex flex-col-reverse flex-1 overflow-y-auto overflow-x-none p-2 text-lg",
                )}
            >
                <div>Line 1</div>
                <div>Line 2</div>
                <div>Line 3</div>
                <div>Line 4</div>
                <div>Line 5</div>
            </div>

            <button
                className={cn(
                    "h-8 flex items-center justify-center bg-base-200/50 transition-colors",
                )}
                onClick={toggleOpen}
            >
                <ChevronUp />
            </button>
        </div>
    );
}
