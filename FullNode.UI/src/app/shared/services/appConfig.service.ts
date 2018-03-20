import { Injectable } from '@angular/core';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppConfigService {

  constructor(filePath: string){
    let resolvedPath = path.resolve(filePath);
    let jsonConfig = fs.readFileSync(resolvedPath).toString();
    let parsedConfig = JSON.parse(jsonConfig)
    this.apiUrl = new URL(parsedConfig.apiUrl || "http://localhost:38220/api");
    this.startNode = !parsedConfig.hasOwnProperty('startNode')
                        || parsedConfig.startNode;
  }

  public apiUrl : URL
  public startNode : boolean

}
