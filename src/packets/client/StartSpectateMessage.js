import { PiranhaMessage } from "../PiranhaMessage.js";
import { operator_new, StartSpectateMessage_StartSpectateMessage } from "../../utils/functions/functions.js";
import { MessageManager } from "../../utils/MessageManager.js";
import { HashTagCodeGenerator } from "../../utils/HashTagCodeGenerator.js";

export class StartSpectateMessage extends PiranhaMessage {
    static create(tag, status) {
        const id = HashTagCodeGenerator.toId(tag);
        const logicLong = Memory.alloc(8);

        logicLong.writeInt(id[0]);
        logicLong.add(4).writeInt(id[1]);

        const message = operator_new(160);
        StartSpectateMessage_StartSpectateMessage(message, logicLong, status ? 1 : 0);
        return message;
    }

    static send(tag, status) {
        const message = this.create(tag, status);
        MessageManager.sendPacket(message);
    }
}
