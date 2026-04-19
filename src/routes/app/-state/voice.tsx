import { MicVAD } from "@ricky0123/vad-web";
import { proxy } from "valtio";

interface VoiceStore {
    micAudio: Uint8Array;
}

export const micAudio = new Uint8Array(1024);

export function runVoiceSimulation() {
    const a = Date.now() / 500;
    for (let i = 0; i < 1024; i++) {
        /*
        micAudio[i] = Math.floor(
            Math.sin(2 * 2 * Math.PI * (i / 1024) + a) ** 2 * 256,
        );*/
    }
}

const useVoiceStore = proxy({});
export async function startVAD() {
    const a = await navigator.mediaDevices.getUserMedia({
        audio: {
            channelCount: 1,
            sampleRate: 16000,
        },
    });
    const audioCtx = new AudioContext({
        sampleRate: 16000,
    });
    const analyserNode = new AnalyserNode(audioCtx, {
        fftSize: 1024,
        maxDecibels: -10,
        //minDecibels: -90,
    });
    const source = audioCtx.createMediaStreamSource(a);
    source.connect(analyserNode);

    function abc() {
        analyserNode.getByteFrequencyData(micAudio);
        requestAnimationFrame(abc);
    }
    abc();

    const vadInstance = await MicVAD.new({
        onSpeechStart: () => {
            console.log("Speech start detected");
        },
        onSpeechEnd: (a: Float32Array) => {
            console.log(a.length);
        },
        onnxWASMBasePath:
            "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/",
        baseAssetPath:
            "https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.29/dist/",
    });
    vadInstance.start();
}
