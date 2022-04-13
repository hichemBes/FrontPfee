import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtyperequestcatComponent } from './viewtyperequestcat.component';

describe('ViewtyperequestcatComponent', () => {
  let component: ViewtyperequestcatComponent;
  let fixture: ComponentFixture<ViewtyperequestcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtyperequestcatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtyperequestcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
