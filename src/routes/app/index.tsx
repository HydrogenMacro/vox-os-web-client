import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
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

    return (
        <div>{microphoneStream ? <MainMenu /> : <PermissionsDisplay />}</div>
    );
}

function MainMenu() {
    useEffect(() => {
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
        })();
    }, []);
    return (
        <div className="grid grid-rows-2 p-4 gap-4">
            <Item asChild>
                <Link to="/app">
                    <ItemContent>
                        <ItemTitle>Transcription</ItemTitle>
                        <ItemDescription>Transcribe text.</ItemDescription>
                    </ItemContent>
                </Link>
            </Item>
            <Item asChild>
                <Link to="/app">
                    <ItemContent>
                        <ItemTitle>Translation</ItemTitle>
                        <ItemDescription>Transcribe text.</ItemDescription>
                    </ItemContent>
                </Link>
            </Item>
            <Item asChild>
                <Link to="/app">
                    <ItemContent>
                        <ItemTitle>Chat</ItemTitle>
                        <ItemDescription>Transcribe text.</ItemDescription>
                    </ItemContent>
                </Link>
            </Item>
        </div>
    );
}
function PermissionsDisplay() {
    const setMicrophoneStream = usePermissionsStore(
        (state) => state.setMicrophoneStream,
    );
    async function getMicrophonePermissions() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            setMicrophoneStream(stream);
        } catch {
            toast("gay");
        }
    }
    return (
        <Empty>
            <EmptyHeader>
                <EmptyTitle>Set Up Permissions</EmptyTitle>
                <EmptyDescription>
                    Microphone permissions are neccesary to use this app.
                </EmptyDescription>
                <Button onClick={getMicrophonePermissions}></Button>
            </EmptyHeader>
        </Empty>
    );
}
