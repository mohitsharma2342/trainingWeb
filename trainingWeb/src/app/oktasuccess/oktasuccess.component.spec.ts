import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OktasuccessComponent } from './oktasuccess.component';

describe('OktasuccessComponent', () => {
  let component: OktasuccessComponent;
  let fixture: ComponentFixture<OktasuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OktasuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OktasuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
