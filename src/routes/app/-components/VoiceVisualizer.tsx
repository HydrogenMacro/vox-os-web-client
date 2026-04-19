import { micAudio, runVoiceSimulation } from "@/routes/app/-state/voice";
import { useEffect, useRef, useState } from "react";

export function VoiceVisualizer() {
    const cvsRef = useRef<HTMLCanvasElement>(null!);
    const [signal, setSignalVal] = useState(true);

    useEffect(() => {
        const dpr = window.devicePixelRatio;
        const gapWidth = 3 * dpr;
        const ctx = cvsRef.current.getContext("2d")!;
        const cvsWidth = (cvsRef.current.width =
            cvsRef.current.clientWidth * dpr);
        const cvsHeight = (cvsRef.current.height =
            cvsRef.current.clientHeight * dpr);
        const segmentsCount = 20;
                
        const ro = new ResizeObserver(() => setSignalVal((s) => !s));
        ro.observe(cvsRef.current);

        let drawLoopActive = true;
        function drawLoop() {
            runVoiceSimulation();

            ctx.clearRect(0, 0, cvsWidth, cvsHeight);
            ctx.reset();
            ctx.fillStyle = "white";
            const segmentWidth =
                (cvsWidth - gapWidth * (segmentsCount - 1)) / segmentsCount;
            let x = 0;
            for (let i = 0; i < segmentsCount; i++) {
                const segmentHeight =
                    (micAudio[
                        Math.floor((i / segmentsCount) * micAudio.length)
                    ] /
                        255) *
                    (cvsHeight - segmentWidth);
                ctx.beginPath();
                ctx.arc(
                    x + segmentWidth / 2,
                    cvsHeight / 2 - segmentHeight / 2,
                    segmentWidth / 2,
                    0,
                    2 * Math.PI,
                    true,
                );
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.arc(
                    x + segmentWidth / 2,
                    cvsHeight / 2 + segmentHeight / 2,
                    segmentWidth / 2,
                    0,
                    2 * Math.PI,
                );
                ctx.closePath();
                ctx.fill();
                ctx.fillRect(x, cvsHeight / 2 - segmentHeight / 2, segmentWidth, segmentHeight)
                x += segmentWidth + gapWidth;
            }
            if (drawLoopActive) requestAnimationFrame(drawLoop);
        }
        drawLoop();
        return () => {
            ctx.clearRect(0, 0, cvsWidth, cvsHeight);
            ctx.reset();
            ro.disconnect();
            drawLoopActive = false;
        };
    }, [signal]);
    return <canvas ref={cvsRef} className="w-full h-full flex gap-1"></canvas>;
}
