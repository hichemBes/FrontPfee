import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestWaitingvalidationComponent } from './request-waitingvalidation.component';

describe('RequestWaitingvalidationComponent', () => {
  let component: RequestWaitingvalidationComponent;
  let fixture: ComponentFixture<RequestWaitingvalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestWaitingvalidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestWaitingvalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
