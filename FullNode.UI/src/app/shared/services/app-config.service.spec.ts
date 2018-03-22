import { TestBed, inject } from '@angular/core/testing';
import { AppConfigService } from './app-config.service';
import { extend } from 'webdriver-js-extender';

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
    expect(service.apiUrl.toString()).toBe("http://localhostzzzzz:37220/api");
    expect(service.startNode).toBeTruthy();
  }));
});
