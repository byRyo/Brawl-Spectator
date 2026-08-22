export class PiranhaMessage {
    static encode(msg) {
        return new NativeFunction(msg.readPointer().add(2 * Process.pointerSize).readPointer(), "pointer", ["pointer"])(msg);
    }

    static decode(msg) {
        return new NativeFunction(msg.readPointer().add(3 * Process.pointerSize).readPointer(), "pointer", ["pointer"])(msg);
    }

    static getServiceNodeType(msg) {
        return new NativeFunction(msg.readPointer().add(4 * Process.pointerSize).readPointer(), "int", ["pointer"])(msg);
    }

    static getMessageType(msg) {
        return new NativeFunction(msg.readPointer().add(5 * Process.pointerSize).readPointer(), "int", ["pointer"])(msg);
    }

    static getMessageTypeName(msg) {
        return new NativeFunction(msg.readPointer().add(6 * Process.pointerSize).readPointer(), "pointer", ["pointer"])(msg);
    }
}
