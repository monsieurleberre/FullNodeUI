import fs from 'fs-extra'
import { remote } from 'electron'
import * as app from 'app'
import { resolve } from 'path'
import { UiConfig } from './ui-config'

export class UiConfigSerialiser {
    // public readFile = Observable.fromCallback(fs.readFile)
    private static appDataPath : string;

    public static GetAppDataConfig(): UiConfig {
        if(!UiConfigSerialiser.appDataPath) UiConfigSerialiser.appDataPath = app.getPath('userData');
        const resolvedPath = resolve(UiConfigSerialiser.appDataPath, 'uiconfig.json')
        return UiConfigSerialiser.GetUiConfigFromFile(resolvedPath)
    }

    public static GetUiConfigFromFile(filePath: string): UiConfig {
        const resolvedPath = resolve(filePath);
        if (!fs.existsSync(resolvedPath)) throw { message: `file ${resolvedPath} not found` };
        const jsonConfig = fs.readFileSync(resolvedPath).toString();
        const uiConfig = new UiConfig(jsonConfig);
        return uiConfig;
    }

    public static SaveAppDataConfig(config: UiConfig) {
        if(!UiConfigSerialiser.appDataPath) UiConfigSerialiser.appDataPath = app.getPath('userData');
        const resolvedPath = resolve(UiConfigSerialiser.appDataPath, 'uiconfig.json')
        UiConfigSerialiser.SaveConfigToFile(config, resolvedPath)
    }

    public static SaveConfigToFile(config: UiConfig, filePath: string) {
        const resolvedPath = resolve(filePath);
        //if(!fs.exists(resolvedPath)) fs.unlinkSync(resolvedPath);
        const configAsJson = JSON.stringify(config, null, 2)
        fs.writeFileSync(resolvedPath, configAsJson, 'utf8');
    }

}