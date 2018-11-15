import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwOpeningCrawlComponent } from './sw-opening-crawl.component';

describe('SwOpeningCrawlComponent', () => {
  let component: SwOpeningCrawlComponent;
  let fixture: ComponentFixture<SwOpeningCrawlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwOpeningCrawlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwOpeningCrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
