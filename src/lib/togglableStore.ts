import { proxy } from "valtio";
export interface Togglable {
    isOn: boolean;
    on: () => void;
    off: () => void;
    toggle: () => void;
}

export function createTogglableStore(initiallyOn = false) {
    const state = proxy({
        isOn: initiallyOn,
        on() {
            state.isOn = true;
        },
        off() {
            state.isOn = false;
        },
        toggle() {
            state.isOn = !state.isOn;
        },
    });
    return state;
}
