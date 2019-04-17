import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptywishlistComponent } from './emptywishlist.component';

describe('EmptywishlistComponent', () => {
  let component: EmptywishlistComponent;
  let fixture: ComponentFixture<EmptywishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptywishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptywishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
