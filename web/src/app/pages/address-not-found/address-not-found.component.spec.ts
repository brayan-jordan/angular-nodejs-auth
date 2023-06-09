import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressNotFoundComponent } from './address-not-found.component';

describe('AddressNotFoundComponent', () => {
  let component: AddressNotFoundComponent;
  let fixture: ComponentFixture<AddressNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressNotFoundComponent]
    });
    fixture = TestBed.createComponent(AddressNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
