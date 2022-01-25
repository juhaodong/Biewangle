export interface MutableSettingStorage extends SettingStorage {
    set(key: string, value: string): void;
    delete(key: string): void;
}
export declare function isMutableSettingStorage(storage: SettingStorage): storage is MutableSettingStorage;
export interface SettingStorage {
    get(key: string): string | null;
}
export declare class UrlSettingStorage implements SettingStorage {
    loadUrl(): any;
    get(key: string): string;
    storage: any;
}
export declare class LocalSettingStorage implements MutableSettingStorage {
    delete(key: string): void;
    get(key: string): string;
    set(key: string, value: string): void;
}
