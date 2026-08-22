import { SpectatePopupVTable } from "./addresses/addresses.js";
import { 
    operator_new, memset, String_String, GUI_getInstance, GUI_showPopup, 
    GenericPopup_GenericPopup, GenericPopup_setTitleTid, GenericPopup_addPopupButton, 
    MovieClip_getTextFieldByName, TextField_reset, GameInputField_GameInputField, 
    GameInputField_setMaxTextLength 
} from "./functions/functions.js";

export const uiState = {
    spectateButton: null,
    inputField: null,
    textField: null
};

function scptr(str) {
    const p = operator_new(192);
    String_String(p, Memory.allocUtf8String(String(str || "")));
    return p;
}

export function showPopup() {
    const popup = operator_new(424);
    memset(popup, 0, 424);

    GenericPopup_GenericPopup(popup, scptr("gameroom_joincode_popup"), 0, 0, scptr(""), scptr(""), scptr(""), scptr(""), scptr(""));
    popup.writePointer(SpectatePopupVTable);
    
    GenericPopup_setTitleTid(popup, scptr("Spectate By Tag"));

    const spectateButton = GenericPopup_addPopupButton(popup, scptr("join_button"), 1);
    
    uiState.spectateButton = spectateButton; 
    spectateButton.add(136).writePointer(ptr(0));

    const spectateSetTextPtr = spectateButton.readPointer().add(432).readPointer();
    new NativeFunction(spectateSetTextPtr, "void", ["pointer", "pointer", "int"])(spectateButton, scptr("Spectate"), 1);

    const inputContainer = GenericPopup_addPopupButton(popup, scptr("team_code_input"), 2);

    const movieClip = inputContainer.add(96).readPointer();
    let textField = MovieClip_getTextFieldByName(movieClip, Memory.allocUtf8String("text"));
    if (textField.isNull()) {
        textField = MovieClip_getTextFieldByName(movieClip, Memory.allocUtf8String("teamcode_txt"));
    }

    TextField_reset(textField);
    textField.add(105).writeU8(1);

    uiState.textField = textField;

    const inputField = operator_new(0xC8);
    GameInputField_GameInputField(inputField, textField, popup);

    uiState.inputField = inputField;

    popup.add(408).writePointer(inputField);
    GameInputField_setMaxTextLength(inputField, 15);

    inputField.add(196).writeU8(1);

    const inputFieldVTable = inputField.readPointer();
    const setTextFuncPtr = inputFieldVTable.add(16).readPointer();
    new NativeFunction(setTextFuncPtr, "void", ["pointer", "pointer"])(inputField, scptr("")); 

    const pointer = Memory.alloc(Process.pointerSize);
    pointer.writePointer(popup);
    GUI_showPopup(GUI_getInstance(), pointer, 1, 0, 1);
}

export function extractTypedTag(basePtr, size) {
    if (!basePtr || basePtr.isNull()) return "";
    let candidates = [];
    
    for (let i = 0; i < size; i += 8) {
        let ptr = basePtr.add(i).readPointer();
        if (!ptr.isNull() && ptr.compare(0x10000) > 0) {
            let str = ptr.readUtf8String();
            if (str && /^[#]?[A-Z0-9]{2,15}$/i.test(str)) {
                if (str.toLowerCase() !== "text" && str.toLowerCase() !== "teamcode_txt" && str.toLowerCase() !== "join_button") {
                    candidates.push(str);
                }
            }
        }

        let strInline = basePtr.add(i).readUtf8String();
        
        if (strInline && /^[#]?[A-Z0-9]{2,15}$/i.test(strInline)) {
            if (strInline.toLowerCase() !== "text" && strInline.toLowerCase() !== "teamcode_txt" && strInline.toLowerCase() !== "join_button") {
                candidates.push(strInline);
            }
        }
    }
    
    if (candidates.length > 0) {
        candidates.sort((a, b) => b.length - a.length);
        return candidates[0];
    }
    return "";
}
