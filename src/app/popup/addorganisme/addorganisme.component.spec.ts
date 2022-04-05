import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddorganismeComponent } from './addorganisme.component';

describe('AddorganismeComponent', () => {
  let component: AddorganismeComponent;
  let fixture: ComponentFixture<AddorganismeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddorganismeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddorganismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
