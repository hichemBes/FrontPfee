import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcatfunctionComponent } from './viewcatfunction.component';

describe('ViewcatfunctionComponent', () => {
  let component: ViewcatfunctionComponent;
  let fixture: ComponentFixture<ViewcatfunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcatfunctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcatfunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
