import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyperequestcatgComponent } from './typerequestcatg.component';

describe('TyperequestcatgComponent', () => {
  let component: TyperequestcatgComponent;
  let fixture: ComponentFixture<TyperequestcatgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyperequestcatgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TyperequestcatgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
