import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwSelectComponent } from './sw-select.component';

describe('SwSelectComponent', () => {
  let component: SwSelectComponent;
  let fixture: ComponentFixture<SwSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
