"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingManagerFactory = exports.SettingType = void 0;
const SettingField_1 = require("./SettingField");
var SettingType;
(function (SettingType) {
    SettingType[SettingType["Integer"] = 0] = "Integer";
    SettingType[SettingType["Array"] = 1] = "Array";
    SettingType[SettingType["String"] = 2] = "String";
    SettingType[SettingType["Boolean"] = 3] = "Boolean";
})(SettingType = exports.SettingType || (exports.SettingType = {}));
class SettingManagerFactory {
    constructor(settingStorage, referenceStorage = [], mainStorageRank = 0) {
        this.typeMap = new Map();
        this.cacheMap = new Map();
        this.referenceStorage = [];
        this.primarySettingStorage = settingStorage;
        this.referenceStorage.length = 0;
        this.referenceStorage.push(...referenceStorage);
        this.mainStorageRank = mainStorageRank;
    }
    updateSetting(key, value, filterNeededKey = true) {
        const type = this.typeMap.get(key);
        let valueString = value;
        switch (type) {
            case SettingType.Array:
                valueString = value.join(',');
                break;
            case SettingType.Boolean:
                valueString = value ? "true" : "false";
                break;
        }
        if (!filterNeededKey || this.neededKeys().includes(key)) {
            this.cacheMap.delete(key);
            this.primarySettingStorage.set(key, valueString);
        }
    }
    getBestValue(key, defaultValue = null) {
        var _a, _b;
        const obj = new Map();
        if (this.referenceStorage.length > 0) {
            for (const i in this.referenceStorage) {
                obj.set(parseFloat(i), this.referenceStorage[i].get(key));
            }
        }
        obj.set(this.mainStorageRank, this.primarySettingStorage.get(key));
        return (_b = (_a = obj.get(Math.max(...obj.keys()))) !== null && _a !== void 0 ? _a : defaultValue) !== null && _b !== void 0 ? _b : null;
    }
    getSetting(key) {
        var _a, _b;
        let value;
        const stringValue = (_b = (_a = this.cacheMap.get(key)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : this.getBestValue(key);
        if (!stringValue) {
            return null;
        }
        else {
            const type = this.typeMap.get(key);
            switch (type) {
                case SettingType.Array:
                    value = stringValue.split(',');
                    break;
                case SettingType.Boolean:
                    value = stringValue === "true";
                    break;
                case SettingType.Integer:
                    value = parseInt(stringValue);
                    break;
                default:
                    value = stringValue;
            }
            return value;
        }
    }
    config(configObj) {
        return this.manage(Object.keys(configObj), configObj);
    }
    manage(settingFields, overrideDefaultObj) {
        const _this = this;
        const getBestValue = function (key, defaultValue) {
            var _a, _b;
            return (_b = (_a = _this.getSetting(key)) !== null && _a !== void 0 ? _a : overrideDefaultObj === null || overrideDefaultObj === void 0 ? void 0 : overrideDefaultObj[key]) !== null && _b !== void 0 ? _b : defaultValue;
        };
        const configObject = settingFields.reduce((obj, f) => {
            const field = (0, SettingField_1.isSettingFieldOption)(f) ? f : (0, SettingField_1.parseToSettingFieldOption)(f, overrideDefaultObj);
            this.typeMap.set(field.key, (0, SettingField_1.getSettingType)(field.type));
            obj[field.key] = getBestValue(field.key, field.defaultValue);
            return obj;
        }, {});
        return new Proxy(configObject, {
            get(target, p, receiver) {
                var _a, _b;
                return (_b = (_a = _this.getSetting(p.toString())) !== null && _a !== void 0 ? _a : target[p]) !== null && _b !== void 0 ? _b : null;
            },
            set(target, p, value, receiver) {
                _this.updateSetting(p.toString(), value, true);
                target[p] = value;
                return true;
            }
        });
    }
    neededKeys() {
        return Array.from(this.typeMap.keys());
    }
}
exports.SettingManagerFactory = SettingManagerFactory;
