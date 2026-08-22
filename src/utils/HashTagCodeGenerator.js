import { HashTagCodeGenerator_toCode } from "./functions/functions.js";

export class HashTagCodeGenerator {
    static playerChars = ["0", "2", "8", "9", "P", "Y", "L", "Q", "G", "R", "J", "C", "U", "V"];
    static teamChars = ["Q", "W", "E", "R", "T", "Y", "U", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "C", "V", "B", "N", "M", "2", "3", "4", "5", "6", "7", "8", "9"];

    static toCode(logicLong, useTeamChars = false) {
        const selectedChars = useTeamChars ? HashTagCodeGenerator.teamChars : HashTagCodeGenerator.playerChars;

        let id = HashTagCodeGenerator.getIdFromLogicLong(logicLong);
        let tag = "";

        while (id > 0) {
            const remainder = id % selectedChars.length;
            tag = selectedChars[remainder] + tag;
            id = (id - remainder) / selectedChars.length;
        }

        return tag;
    }

    static toId(hashtag, useTeamChars = false) {
        const TagChar = useTeamChars ? HashTagCodeGenerator.teamChars : HashTagCodeGenerator.playerChars;

        if (!hashtag.startsWith("#") && !hashtag.startsWith("X")) {
            return [0, 0];
        }

        const TagArray = hashtag.slice(1).toUpperCase().split("");
        let Id = 0;

        for (const Character of TagArray) {
            const CharIndex = TagChar.indexOf(Character);

            if (CharIndex === -1) {
                return [0, 0];
            }

            Id *= TagChar.length;
            Id += CharIndex;
        }

        const low = Id % 256;
        const high = (Id - low) / 256;

        return [low, high];
    }

    static patch(showTags = true) {
        Interceptor.replace(HashTagCodeGenerator_toCode, new NativeCallback(function (instance, logicLong) {
            const code = HashTagCodeGenerator_toCode(instance, logicLong);

            if (!showTags) {
                code.writeU8(0);
                code.add(8).writeInt(0);
            }

            return code;
        }, "pointer", ["pointer", "pointer"]));
    }

    static getIdFromLogicLong(logicLong) {
        if (logicLong instanceof NativePointer) {
            if (logicLong.isNull()) return 0;
            const low = logicLong.readInt();
            const high = logicLong.add(4).readInt();
            return low + high * 256;
        } else {
            return logicLong[0] + logicLong[1] * 256;
        }
    }
}
