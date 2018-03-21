import { TestBed, inject } from '@angular/core/testing';

import { AppConfigService } from './app-config.service';
import { extend } from 'webdriver-js-extender';

class MockBufferWrapper extends Buffer {
  private stringToReturn : string
  constructor(stringToReturn : string){
    super(stringToReturn)
    this.stringToReturn = stringToReturn;
  }

  toString() : string {
    return this.stringToReturn;
  }
}

describe('AppConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppConfigService]
    });
  });

  it('should be created', inject([AppConfigService], (service: AppConfigService) => {
    expect(service).toBeTruthy();
  }));

  it('should have properties from the appconfig.json file', inject([AppConfigService], (service: AppConfigService) => {
    expect(service).toBeTruthy();
  }));
});
