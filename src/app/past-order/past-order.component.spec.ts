import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastOrderComponent } from './past-order.component';

describe('PastOrderComponent', () => {
  let component: PastOrderComponent;
  let fixture: ComponentFixture<PastOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});