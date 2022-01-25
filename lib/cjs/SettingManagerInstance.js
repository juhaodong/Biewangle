"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalSettingManager = void 0;
const MutableSettingStorage_1 = require("./MutableSettingStorage");
const SettingManager_1 = require("./SettingManager");
exports.LocalSettingManager = new SettingManager_1.SettingManager(new MutableSettingStorage_1.LocalSettingStorage());
