"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalSettingStorage = exports.UrlSettingStorage = exports.isMutableSettingStorage = void 0;
function isMutableSettingStorage(storage) {
    return storage.set !== undefined;
}
exports.isMutableSettingStorage = isMutableSettingStorage;
class UrlSettingStorage {
    constructor() {
        this.storage = this.loadUrl();
    }
    loadUrl() {
        const searchParams = location.search.substr(1).split('&');
        return searchParams.reduce((obj, i) => {
            const [k, v] = i.split('=');
            obj[k] = v;
            return obj;
        }, {});
    }
    get(key) {
        return this.storage[key];
    }
}
exports.UrlSettingStorage = UrlSettingStorage;
class LocalSettingStorage {
    delete(key) {
        localStorage.removeItem(key);
    }
    get(key) {
        var _a;
        return (_a = localStorage.getItem(key)) !== null && _a !== void 0 ? _a : "";
    }
    set(key, value) {
        localStorage.setItem(key, value);
    }
}
exports.LocalSettingStorage = LocalSettingStorage;
