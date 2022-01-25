import { SettingStorage, MutableSettingStorage } from "./MutableSettingStorage";
import { SettingField } from "./SettingField";
export declare enum SettingType {
    Integer = 0,
    Array = 1,
    String = 2,
    Boolean = 3
}
export declare class SettingManagerFactory {
    typeMap: Map<string, SettingType>;
    cacheMap: Map<string, {
        createTime: number;
        value: string;
    }>;
    primarySettingStorage: MutableSettingStorage;
    referenceStorage: SettingStorage[];
    mainStorageRank: number;
    constructor(settingStorage: MutableSettingStorage, referenceStorage?: SettingStorage[], mainStorageRank?: number);
    updateSetting(key: string, value: any, filterNeededKey?: boolean): void;
    getBestValue(key: string, defaultValue?: any): string | null;
    getSetting(key: string): any | null;
    config(configObj: any): any;
    manage(settingFields: SettingField<any>[], overrideDefaultObj?: any): any;
    neededKeys(): string[];
}
