import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionofuserComponent } from './fonctionofuser.component';

describe('FonctionofuserComponent', () => {
  let component: FonctionofuserComponent;
  let fixture: ComponentFixture<FonctionofuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FonctionofuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FonctionofuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
