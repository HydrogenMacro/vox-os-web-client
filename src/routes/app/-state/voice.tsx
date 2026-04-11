import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface VoiceStore {
    micAudio: Uint8Array
}

export const micAudio = new Uint8Array(1024);

export function runVoiceSimulation() {
    const a = Date.now() / 500;
    for (let i = 0; i < 1024; i++) {
        micAudio[i] = Math.floor(Math.sin(2 * 2 * Math.PI * (i / 1024) + a) ** 2 * 256);
    }
}