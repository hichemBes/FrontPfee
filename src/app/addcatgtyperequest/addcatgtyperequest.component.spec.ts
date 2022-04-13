import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcatgtyperequestComponent } from './addcatgtyperequest.component';

describe('AddcatgtyperequestComponent', () => {
  let component: AddcatgtyperequestComponent;
  let fixture: ComponentFixture<AddcatgtyperequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcatgtyperequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcatgtyperequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
