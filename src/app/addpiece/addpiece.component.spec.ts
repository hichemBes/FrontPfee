import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpieceComponent } from './addpiece.component';

describe('AddpieceComponent', () => {
  let component: AddpieceComponent;
  let fixture: ComponentFixture<AddpieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpieceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
