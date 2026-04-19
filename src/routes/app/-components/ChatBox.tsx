import type { ReactNode } from "react";
import type { Message } from "../-state/chat";

export function UserChatBox({ text }: { text: string }) {
    return (
        <div className="max-w-8/12 text-pretty whitespace-break-spaces bg-neutral-600/50 p-3 self-end">
            {text}
        </div>
    );
}
export function AgentChatBox({ text }: { text: string }) {
    return (
        <div className="w-full wrap-break-word whitespace-break-spaces p-2">
            {text}
        </div>
    );
}
export function createChatBoxFromMessage(message: Message, i: number): ReactNode {
    switch (message.type) {
        case "agent":
            return <AgentChatBox text={message.text} key={i} />;
        case "user":
            return <UserChatBox text={message.text} key={i} />;
    }
}
