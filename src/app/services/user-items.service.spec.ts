import { TestBed } from '@angular/core/testing';

import { UserItemsService } from './user-items.service';

describe('UserItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserItemsService = TestBed.get(UserItemsService);
    expect(service).toBeTruthy();
  });
});
