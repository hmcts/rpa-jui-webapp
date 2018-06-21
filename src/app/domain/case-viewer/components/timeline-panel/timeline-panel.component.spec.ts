import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TimelinePanelComponent} from './timeline-panel.component';

xdescribe('TimelinePanelComponent', () => {
  let component: TimelinePanelComponent;
  let fixture: ComponentFixture<TimelinePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
