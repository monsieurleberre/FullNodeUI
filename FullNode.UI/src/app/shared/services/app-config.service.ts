import { Injectable } from '@angular/core';
import { resolve, parse, } from 'path';
import { FsService } from 'ngx-fs';
import { DefaultConfig } from './../../../assets/default-appconfig'
// import { remote } from 'electron'
// import { fs } from 'remote'


@Injectable()
export class AppConfigService {

  // constructor(private fsService: FsService) {
  //   const resolvedPath = resolve('./appconfig.json');
  //   let parsedConfig;
  //   if (fs.exists(resolvedPath)) {
  //     const jsonConfig = fs.readFileSync(resolvedPath).toString();
  //     parsedConfig = JSON.parse(jsonConfig);
  //   } else {
  //     parsedConfig = new DefaultConfig();
  //   }

  //   this.apiUrl = new URL(parsedConfig.apiUrl || "http://localhost:38220/api");
  //   this.startNode = !parsedConfig.hasOwnProperty('startNode')
  //     || parsedConfig.startNode;
  // }
  // public apiUrl: URL;
  // public startNode: boolean;
}
