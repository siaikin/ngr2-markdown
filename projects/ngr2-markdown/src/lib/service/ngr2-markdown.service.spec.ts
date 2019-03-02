import { TestBed } from '@angular/core/testing';

import { Ngr2MarkdownService } from './ngr2-markdown.service';

describe('Ngr2MarkdownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ngr2MarkdownService = TestBed.get(Ngr2MarkdownService);
    expect(service).toBeTruthy();
  });
});
