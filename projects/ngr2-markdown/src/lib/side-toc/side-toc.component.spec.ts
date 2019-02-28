import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideTocComponent } from './side-toc.component';

describe('SideTocComponent', () => {
  let component: SideTocComponent;
  let fixture: ComponentFixture<SideTocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideTocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
