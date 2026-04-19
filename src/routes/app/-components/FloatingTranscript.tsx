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
import { statusToastStore } from "./StatusToast";
import { useSnapshot } from "valtio";

export const floatingTranscriptStore = createTogglableStore();
export function FloatingTranscript({
    ref,
    style,
}: {
    ref?: Ref<HTMLDivElement>;
    style?: CSSProperties;
}) {
    const statusToastSnap = useSnapshot(statusToastStore);
    const floatingTranscriptSnap = useSnapshot(floatingTranscriptStore);
    return (
        <div
            ref={ref}
            style={style}
            className={cn(
                "w-[calc(100%-16px)] h-72 flex flex-col items-stretch backdrop-blur-[2px] transition-[height,opacity] duration-500 overflow-hidden opacity-95",
                !floatingTranscriptSnap.isOn && "h-0 opacity-0",
            )}
        >
            <div className="flex">
                {(
                    [
                        [<Mic />, <MicOff />, appConfig.useMicEnabled, "Microphone"],
                        [<Bot />, <BotOff />, appConfig.useChatBotEnabled, "Agent Listening"],
                        [
                            <Megaphone />,
                            <MegaphoneOff />,
                            appConfig.useAnnouncingEnabled,
                            "Agent Speaking"
                        ],
                        [<Cctv />, <CctvOff />, appConfig.useRecordingEnabled, "Transcribing"],
                    ] as const
                ).map(([icon, disabledIcon, configOptionStore, controlName], i) => {
                    const configOptionSnap = useSnapshot(configOptionStore);
                    return (
                        <button
                            className={cn(
                                "flex-1 aspect-square h-auto btn btn-soft rounded-none active:translate-none",
                                configOptionSnap.isOn && "btn-active",
                            )}
                            onClick={() => {
                                configOptionSnap.toggle();
                                statusToastStore.showMessage(`${controlName}:\n${configOptionSnap.isOn ? "Enabled" : "Disabled"}`, "short");
                            }}
                            key={i}
                        >
                            {!configOptionSnap.isOn ? icon : disabledIcon}
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
                <div>Line 6</div>
            </div>

            <button
                className={cn(
                    "h-8 flex items-center justify-center bg-base-200/50 transition-colors",
                )}
                onClick={statusToastSnap.hide}
            >
                <ChevronUp />
            </button>
        </div>
    );
}
