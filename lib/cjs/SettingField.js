"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseToSettingFieldOption = exports.isString = exports.isSettingFieldOption = exports.getSettingType = void 0;
const SettingManager_1 = require("./SettingManager");
function getSettingType(string) {
    switch (string) {
        case "Array":
            return SettingManager_1.SettingType.Array;
        case "Boolean":
            return SettingManager_1.SettingType.Boolean;
        case "Integer":
            return SettingManager_1.SettingType.Integer;
        case "String":
            return SettingManager_1.SettingType.String;
    }
}
exports.getSettingType = getSettingType;
function isSettingFieldOption(field) {
    return typeof field != 'string';
}
exports.isSettingFieldOption = isSettingFieldOption;
function isString(field) {
    return typeof field == 'string';
}
exports.isString = isString;
function parseToSettingFieldOption(key, defaultValue) {
    return {
        type: 'String',
        key: key,
        defaultValue: defaultValue
    };
}
exports.parseToSettingFieldOption = parseToSettingFieldOption;
