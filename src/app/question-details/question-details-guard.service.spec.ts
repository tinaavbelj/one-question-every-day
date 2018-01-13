import { TestBed, inject } from '@angular/core/testing';

import { QuestionDetailsGuardService } from './question-details-guard.service';

describe('QuestionDetailsGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionDetailsGuardService]
    });
  });

  it('should be created', inject([QuestionDetailsGuardService], (service: QuestionDetailsGuardService) => {
    expect(service).toBeTruthy();
  }));
});
