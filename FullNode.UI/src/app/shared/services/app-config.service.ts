import { Injectable } from '@angular/core';
import { resolve } from 'path'
//import { FsWrapperService } from './fs-wrapper.service';
import fs from 'fs-extra'

@Injectable()
export class AppConfigService {

  constructor(){
    let resolvedPath = resolve('appconfig.json');
    let jsonConfig = fs.readFileSync(resolvedPath).toString();
    // let parsedConfig = JSON.parse(jsonConfig)
    // this.apiUrl = new URL(parsedConfig.apiUrl || "http://localhost:38220/api");
    // this.startNode = !parsedConfig.hasOwnProperty('startNode')
    //                     || parsedConfig.startNode;
  }
  public apiUrl : URL
  public startNode : boolean

}
