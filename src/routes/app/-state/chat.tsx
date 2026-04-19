import { proxy } from "valtio";

export type UserMessage = { type: "user"; text: string };
export type AgentMessage = { type: "agent"; complete: boolean; text: string };
export type Message = UserMessage | AgentMessage;
interface ChatStore {
    messages: Message[];
}

export const chatStore = proxy<ChatStore>({
    messages: [
        ...[
            "Lorem ispum sit dolor amet. ".repeat(5),
            "Lorem ispum sit dolor amet. ".repeat(17),
            "Lorem ispum sit dolor amet. ".repeat(4),
            "Lorem ispum sit dolor amet. ".repeat(19),
            "Lorem ispum sit dolor amet. ".repeat(7),
            "Lorem ispum sit dolor amet. ".repeat(22),
        ].map((s, i) =>
            i % 2
                ? { type: "agent" as const, text: s, complete: true }
                : { type: "user" as const, text: s },
        ),
    ],
});
