/**
 * @description A ring buffer that wraps to the starting element on overflow when appending elements.
 * This has O(1) insertions and deletions as a stack. Although it also supports other O(1) operations,
 * they are not implemented here since this is meant to just be used as FIFO.
 */
export class RingBuffer<T> {
    public maxSize: number;
    public length: number = 0;
    buffer: T[] = [];
    startElIdx: number = 0;
    constructor(maxSize: number) {
        this.maxSize = maxSize;
        this.buffer.length = maxSize;
    }
    get(idx: number): T | null {
        if (idx > this.length - 1) return null;
        return this.buffer[(this.startElIdx + this.length) % this.maxSize];
    }
    pushEnd(el: T) {
        this.buffer[(this.startElIdx + this.length) % this.maxSize] = el;
        if (this.length == this.maxSize) {
            if (this.startElIdx + this.length > this.maxSize - 1) {
                if (this.startElIdx === this.maxSize - 1) {
                    this.startElIdx = 0;
                } else {
                    this.startElIdx += 1;
                }
            }
        } else {
            this.length += 1;
        }
    }
    popStart() {
        if (this.length == 0) return;
        this.length -= 1;
        if (this.startElIdx === this.maxSize - 1) {
            this.startElIdx = 0;
        } else {
            this.startElIdx += 1;
        }
    }
    map<K>(mappingFn: (el: T, idx: number) => K): K[] {
        let out = [];
        let currentIdx = this.startElIdx;
        for (let i = 0; i < this.length; i++) {
            out.push(mappingFn(this.buffer[currentIdx], i));
            if (currentIdx == this.maxSize - 1) {
                currentIdx = 0;
            } else {
                currentIdx += 1;
            }
        }
        return out;
    }
}
