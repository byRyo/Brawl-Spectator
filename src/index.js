import { StartSpectateMessage } from "./packets/client/StartSpectateMessage.js";
import { CustomButton_onButtonPressed } from "./utils/addresses/addresses.js";
import { showPopup, extractTypedTag, uiState } from "./utils/popup.js";

Interceptor.attach(CustomButton_onButtonPressed, {
    onEnter(args) {
        const pressed = args[0];

        if (!!uiState.spectateButton && !!pressed && pressed.equals(uiState.spectateButton)) {
            if (uiState.inputField && !uiState.inputField.isNull()) {
                
                let playerTag = extractTypedTag(uiState.textField, 300) || extractTypedTag(uiState.inputField, 200);
                
                if (playerTag) {
                    playerTag = playerTag.trim().toUpperCase();
                    
                    if (!playerTag.startsWith("#")) {
                        playerTag = "#" + playerTag;
                    }

                    StartSpectateMessage.send(playerTag, 1);
                }
            }
        }
    }
});

setImmediate(() => {
    showPopup();
});
