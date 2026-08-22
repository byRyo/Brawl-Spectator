import { base } from "../utils.js";

export const operator_new = new NativeFunction(base.add(0x10EFAF0), "pointer", ["ulong"]);
export const memset = new NativeFunction(Module.findExportByName(null, "memset") || Module.getExportByName("libc.so", "memset"), "pointer", ["pointer", "int", "size_t"]);

export const StartSpectateMessage_StartSpectateMessage = new NativeFunction(base.add(0xB754A4), "pointer", ["pointer", "pointer", "char"]);
export const HashTagCodeGenerator_toCode = new NativeFunction(base.add(0xBD0E70), "pointer", ["pointer", "pointer"]);

export const String_String = new NativeFunction(base.add(0xDCF8F0), "pointer", ["pointer", "pointer"]);
export const GUI_getInstance = new NativeFunction(base.add(0x591644), "pointer", []);
export const GUI_showPopup = new NativeFunction(base.add(0x592C24), "pointer", ["pointer", "pointer", "char", "char", "char"]);

export const GenericPopup_GenericPopup = new NativeFunction(base.add(0x6C38B8), "pointer", ["pointer", "pointer", "char", "char", "pointer", "pointer", "pointer", "pointer", "pointer"]);
export const GenericPopup_setTitleTid = new NativeFunction(base.add(0x6C3D70), "pointer", ["pointer", "pointer"]);
export const GenericPopup_addPopupButton = new NativeFunction(base.add(0x6C442C), "pointer", ["pointer", "pointer", "int"]);

export const MovieClip_getTextFieldByName = new NativeFunction(base.add(0xC1D7B0), "pointer", ["pointer", "pointer"]);
export const TextField_reset = new NativeFunction(base.add(0xC49844), "pointer", ["pointer"]);

export const GameInputField_GameInputField = new NativeFunction(base.add(0x599EF4), "pointer", ["pointer", "pointer", "pointer"]);
export const GameInputField_setMaxTextLength = new NativeFunction(base.add(0xE12BCC), "pointer", ["pointer", "int"]);
