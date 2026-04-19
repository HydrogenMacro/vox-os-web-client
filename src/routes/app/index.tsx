import { cn } from "@/lib/utils/cn";
import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { proxy, useSnapshot } from "valtio";
import { createChatBoxFromMessage } from "./-components/ChatBox";
import { chatStore } from "./-state/chat";
import { startVAD } from "./-state/voice";

export const Route = createFileRoute("/app/")({
    component: App,
});

const permissionsStore = proxy<{
    microphoneStream: MediaStream | null;
    setMicrophoneStream: (stream: MediaStream) => void;
}>({
    microphoneStream: null,
    setMicrophoneStream(stream: MediaStream) {
        permissionsStore.microphoneStream = stream;
    },
});

function App() {
    const { microphoneStream } = useSnapshot(permissionsStore);

    return <ChatTab />;
}

function ChatTab() {
    const chatSnap = useSnapshot(chatStore);
    const [inputText, setInputText] = useState("");
    useEffect(() => {
        startVAD();
    }, []);
    return (
        <div className="flex-1 flex flex-col items-stretch min-h-0">
            <div className="flex-1 flex flex-col-reverse p-4 text-sm gap-4 overflow-scroll min-h-0">
                {chatSnap.messages.map(createChatBoxFromMessage)}
            </div>
            <div className="flex bg-base-200 p-4 gap-4 text-sm items-end">
                <div
                    contentEditable
                    className={cn(
                        inputText == "" &&
                            "after:content-['Type_A_Message...'] after:text-base-content/60 after:absolute",
                        "text flex-1 flex flex-col scroll-p-2.5 p-2.5 bg-neutral-500/50 min-w-0 wrap-break-word overflow-auto max-h-[calc((var(--text-sm--line-height)*var(--text-sm)-var(--spacing)*2)+var(--text-sm--line-height)*4*var(--text-sm))]",
                    )}
                    onInput={(ev) =>
                        setInputText((ev.target as HTMLDivElement).textContent)
                    }
                ></div>
                <div className="btn btn-primary btn-circle">
                    <Send size={16} />
                </div>
            </div>
        </div>
    );
}
