import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Togglable {
    isOn: boolean;
    on: () => void;
    off: () => void;
    toggle: () => void;
}
export function createTogglableStore() {
    return create<Togglable>()(
        immer((set) => ({
            isOn: true,
            on: () =>
                set((s) => {
                    s.isOn = true;
                }),
            off: () =>
                set((s) => {
                    s.isOn = false;
                }),
            toggle: () =>
                set((s) => {
                    s.isOn = !s.isOn;
                }),
        })),
    );
}