import {LocalSettingStorage} from "./MutableSettingStorage";
import {SettingManager} from "./SettingManager";

export const LocalSettingManager = new SettingManager(new LocalSettingStorage())
