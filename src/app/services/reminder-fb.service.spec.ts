import { TestBed, inject } from '@angular/core/testing';

import { ReminderFbService } from './reminder-fb.service';

describe('ReminderFbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReminderFbService]
    });
  });

  it('should be created', inject([ReminderFbService], (service: ReminderFbService) => {
    expect(service).toBeTruthy();
  }));
});
