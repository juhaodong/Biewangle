import {SettingStorage, MutableSettingStorage} from "./MutableSettingStorage";
import {
    getSettingType,
    isSettingFieldOption,
    parseToSettingFieldOption,
    SettingField,
} from "./SettingField";


export enum SettingType {
    Integer,
    Array,
    String,
    Boolean
}


export class SettingManagerFactory {

    typeMap: Map<string, SettingType> = new Map()
    cacheMap: Map<string, { createTime: number, value: string }> = new Map()

    primarySettingStorage: MutableSettingStorage
    referenceStorage: SettingStorage[] = []
    mainStorageRank: number

    constructor(settingStorage: MutableSettingStorage, referenceStorage: SettingStorage[] = [], mainStorageRank = 0) {
        this.primarySettingStorage = settingStorage
        this.referenceStorage.length = 0
        this.referenceStorage.push(...referenceStorage)
        this.mainStorageRank = mainStorageRank
    }

    updateSetting(key: string, value: any, filterNeededKey = true) {
        const type = this.typeMap.get(key)
        let valueString = value
        switch (type) {
            case SettingType.Array:
                valueString = value.join(',')
                break;
            case SettingType.Boolean:
                valueString = value ? "true" : "false"
                break;
        }
        if (!filterNeededKey || this.neededKeys().includes(key)) {
            this.cacheMap.delete(key)
            this.primarySettingStorage.set(key, valueString)
        }
    }

    getBestValue(key: string, defaultValue: any = null): string | null {
        const obj = new Map<number, string | null>()
        if (this.referenceStorage.length > 0) {
            for (const i in this.referenceStorage) {
                obj.set(parseFloat(i), this.referenceStorage[i].get(key))
            }
        }
        obj.set(this.mainStorageRank, this.primarySettingStorage.get(key))
        return obj.get(Math.max(...obj.keys())) ?? defaultValue ?? null
    }

    getSetting(key: string): any | null {
        let value
        const stringValue = this.cacheMap.get(key)?.value ?? this.getBestValue(key)
        if (!stringValue) {
            return null
        } else {
            const type = this.typeMap.get(key)
            switch (type) {
                case SettingType.Array:
                    value = stringValue.split(',')
                    break;
                case SettingType.Boolean:
                    value = stringValue === "true"
                    break;
                case SettingType.Integer:
                    value = parseInt(stringValue)
                    break;
                default:
                    value = stringValue
            }
            return value
        }


    }

    config(configObj: any): any {
        return this.manage(Object.keys(configObj), configObj)
    }

    manage(settingFields: SettingField<any>[], overrideDefaultObj?: any): any {
        const _this = this
        const getBestValue = function <T>(key: string, defaultValue: T): T {
            return _this.getSetting(key) ?? overrideDefaultObj?.[key] ?? defaultValue
        }

        const configObject = settingFields.reduce<any>((obj, f) => {
            const field = isSettingFieldOption(f) ? f : parseToSettingFieldOption(f)
            this.typeMap.set(field.key, getSettingType(field.type))
            obj[field.key] = getBestValue(field.key, field.defaultValue)
            return obj
        }, {})


        return new Proxy(configObject, {
            get(target: any, p: string | symbol, receiver: any): any {
                return _this.getSetting(p.toString()) ?? target[p] ?? null
            },
            set(target: any, p: string | symbol, value: any, receiver: any): boolean {
                _this.updateSetting(p.toString(), value, true)
                target[p] = value
                return true
            }

        })
    }

    neededKeys(): string[] {
        return Array.from(this.typeMap.keys())
    }
}

