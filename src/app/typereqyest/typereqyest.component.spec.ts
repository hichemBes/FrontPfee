import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypereqyestComponent } from './typereqyest.component';

describe('TypereqyestComponent', () => {
  let component: TypereqyestComponent;
  let fixture: ComponentFixture<TypereqyestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypereqyestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypereqyestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
