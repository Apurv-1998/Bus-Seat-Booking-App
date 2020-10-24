import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusDetailsComponent } from './bus-details.component';

describe('BusDetailsComponent', () => {
  let component: BusDetailsComponent;
  let fixture: ComponentFixture<BusDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
