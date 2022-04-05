import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcatfunctionComponent } from './addcatfunction.component';

describe('AddcatfunctionComponent', () => {
  let component: AddcatfunctionComponent;
  let fixture: ComponentFixture<AddcatfunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcatfunctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcatfunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
