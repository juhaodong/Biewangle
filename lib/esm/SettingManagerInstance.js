"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalSettingManager = void 0;
const MutableSettingStorage_1 = require("./MutableSettingStorage");
const SettingManagerFactory_1 = require("./SettingManagerFactory");
exports.LocalSettingManager = new SettingManagerFactory_1.SettingManagerFactory(new MutableSettingStorage_1.LocalSettingStorage());
