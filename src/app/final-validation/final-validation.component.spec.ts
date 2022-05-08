import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalValidationComponent } from './final-validation.component';

describe('FinalValidationComponent', () => {
  let component: FinalValidationComponent;
  let fixture: ComponentFixture<FinalValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
