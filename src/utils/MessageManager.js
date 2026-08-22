import { MessageManager as MessageManagerAddr } from "./addresses/addresses.js";

export class MessageManager {
    static sendPacket(packet) {
        const instance = MessageManagerAddr.readPointer();

        if (instance.isNull()) {
            return; 
        }

        const vtable = instance.readPointer().add(3 * Process.pointerSize).readPointer();
        const message = new NativeFunction(vtable, "long", ["pointer", "pointer"]);
        message(instance, packet);
    }
}
