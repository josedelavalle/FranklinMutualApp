import { TestBed, inject } from '@angular/core/testing';

import { AgentDataService } from './agent-data.service';

describe('AgentDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentDataService]
    });
  });

  it('should be created', inject([AgentDataService], (service: AgentDataService) => {
    expect(service).toBeTruthy();
  }));
});
