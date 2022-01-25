import {LocalSettingStorage} from "./MutableSettingStorage";
import {SettingManagerFactory} from "./SettingManagerFactory";

export const LocalSettingManager = new SettingManagerFactory(new LocalSettingStorage())
