import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmphellComponent } from './tmphell.component';

describe('TmphellComponent', () => {
  let component: TmphellComponent;
  let fixture: ComponentFixture<TmphellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmphellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmphellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
