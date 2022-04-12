import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtyperequestComponent } from './addtyperequest.component';

describe('AddtyperequestComponent', () => {
  let component: AddtyperequestComponent;
  let fixture: ComponentFixture<AddtyperequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtyperequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtyperequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
