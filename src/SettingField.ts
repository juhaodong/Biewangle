import {SettingType} from "./SettingManager"

export type SettingFieldOption<T> = {
    type: SettingTypeString,
    key: string,
    defaultValue?: T
}
type SettingTypeString = 'Integer' | 'Array' | 'String' | 'Boolean'

export function getSettingType(string: SettingTypeString): SettingType {
    switch (string) {
        case "Array":
            return SettingType.Array

        case "Boolean":
            return SettingType.Boolean
        case "Integer":
            return SettingType.Integer
        case "String":
            return SettingType.String
    }
}

export type SettingField<T> = string | SettingFieldOption<T>

export function isSettingFieldOption<T>(field: SettingField<T>): field is SettingFieldOption<T> {
    return typeof field != 'string'
}

export function isString<T>(field: SettingField<T>): field is string {
    return typeof field == 'string'
}

export function parseToSettingFieldOption<T>(key: string, defaultValue?: T): SettingFieldOption<T> {
    return {
        type: 'String',
        key: key,
        defaultValue: defaultValue
    }
}
