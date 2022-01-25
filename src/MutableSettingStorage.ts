export interface MutableSettingStorage extends SettingStorage {
    set(key: string, value: string): void

    delete(key: string): void
}

export function isMutableSettingStorage(storage: SettingStorage): storage is MutableSettingStorage {
    return (<MutableSettingStorage>storage).set !== undefined
}

export interface SettingStorage {
    get(key: string): string|null
}


export class UrlSettingStorage implements SettingStorage {

    loadUrl() {
        const searchParams = location.search.substr(1).split('&')
        return searchParams.reduce<any>((obj, i) => {
            const [k, v] = i.split('=')
            obj[k] = v
            return obj
        }, {})
    }

    get(key: string): string {
        return this.storage[key]
    }

    storage = this.loadUrl()
}

export class LocalSettingStorage implements MutableSettingStorage {

    delete(key: string) {
        localStorage.removeItem(key)
    }

    get(key: string): string {
        return localStorage.getItem(key) ?? "";
    }

    set(key: string, value: string) {
        localStorage.setItem(key, value)
    }

}
