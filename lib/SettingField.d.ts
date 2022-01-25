import { SettingType } from "./SettingManager";
export declare type SettingFieldOption<T> = {
    type: SettingTypeString;
    key: string;
    defaultValue?: T;
};
declare type SettingTypeString = 'Integer' | 'Array' | 'String' | 'Boolean';
export declare function getSettingType(string: SettingTypeString): SettingType;
export declare type SettingField<T> = string | SettingFieldOption<T>;
export declare function isSettingFieldOption<T>(field: SettingField<T>): field is SettingFieldOption<T>;
export declare function isString<T>(field: SettingField<T>): field is string;
export declare function parseToSettingFieldOption<T>(key: string, defaultValue?: T): SettingFieldOption<T>;
export {};
