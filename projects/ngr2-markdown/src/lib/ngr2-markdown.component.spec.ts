import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ngr2MarkdownComponent } from './ngr2-markdown.component';

describe('Ngr2MarkdownComponent', () => {
  let component: Ngr2MarkdownComponent;
  let fixture: ComponentFixture<Ngr2MarkdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ngr2MarkdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ngr2MarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
