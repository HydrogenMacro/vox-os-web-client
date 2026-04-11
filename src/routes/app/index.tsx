import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useEffect } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const Route = createFileRoute("/app/")({
    component: App,
});

const usePermissionsStore = create<{
    microphoneStream: MediaStream | null;
    setMicrophoneStream: (stream: MediaStream) => void;
}>()(
    immer((set) => ({
        microphoneStream: null,
        setMicrophoneStream: (stream: MediaStream) =>
            set((state) => {
                state.microphoneStream = stream;
            }),
    })),
);

function App() {
    const microphoneStream = usePermissionsStore(
        (state) => state.microphoneStream,
    );

    return <ChatTab />;
}

function ChatTab() {
    useEffect(() => {
        /*
        (async () => {
            const myvad = await vad.MicVAD.new({
                onSpeechStart: () => {
                    console.log("Speech start detected");
                },
                onSpeechEnd: () => {},
                onnxWASMBasePath:
                    "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/",
                baseAssetPath:
                    "https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.29/dist/",
            });
            myvad.start();
        })();*/
    }, []);
    return (
        <div className="flex-1 flex flex-col items-stretch min-h-0">
            <div className="flex-1 flex flex-col-reverse p-4 text-sm gap-4 overflow-scroll min-h-0">
                <div className="w-8/12 wrap-break-word whitespace-break-spaces bg-neutral-600/50 p-2 self-end">
                    {"Text ".repeat(50)}
                </div>
                <div className="w-full wrap-break-word whitespace-break-spaces bg-neutral-600/50 p-2">
                    {"Text ".repeat(50)}
                </div>
                <div className="w-8/12 wrap-break-word whitespace-break-spaces bg-neutral-600/50 p-2 self-end">
                    {"Text ".repeat(50)}
                </div>
                <div className="w-full wrap-break-word whitespace-break-spaces bg-neutral-600/50 p-2">
                    {"Text ".repeat(50)}
                </div>
                <div className="w-8/12 wrap-break-word whitespace-break-spaces bg-neutral-600/50 p-2 self-end">
                    {"Text ".repeat(50)}
                </div>
                <div className="w-full wrap-break-word whitespace-break-spaces bg-neutral-600/50 p-2">
                    {"Text ".repeat(50)}
                </div>
                <div className="w-8/12 wrap-break-word whitespace-break-spaces bg-neutral-600/50 p-2 self-end">
                    {"Text ".repeat(50)}
                </div>
                <div className="w-full wrap-break-word whitespace-break-spaces bg-neutral-600/50 p-2">
                    {"Text ".repeat(50)}
                </div>
            </div>
            <div className="flex h-20 bg-base-200 p-4 gap-4 text-sm">
                <input name="chat-input" type="text" placeholder="Type a question..." className="flex-1 p-4 bg-neutral-500/50"/>
                <div className="aspect-square flex items-center justify-center rounded-full bg-primary"><Send size={20}/></div>
            </div>
        </div>
    );
}
