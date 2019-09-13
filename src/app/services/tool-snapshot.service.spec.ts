import { TestBed } from '@angular/core/testing';

import { ToolSnapshotService } from './tool-snapshot.service';

describe('ToolSnapshotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolSnapshotService = TestBed.get(ToolSnapshotService);
    expect(service).toBeTruthy();
  });
});
