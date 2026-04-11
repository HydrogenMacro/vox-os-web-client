import { createTogglableStore } from "@/lib/togglableStore";

export const appConfig = {
    useMicEnabled: createTogglableStore(),
    useChatBotEnabled: createTogglableStore(),
    useAnnouncingEnabled: createTogglableStore(),
    useRecordingEnabled: createTogglableStore(),
};
