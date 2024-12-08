import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionConfirmModalComponent } from './action-confirm-modal.component';

describe('ActionConfirmModalComponent', () => {
  let component: ActionConfirmModalComponent;
  let fixture: ComponentFixture<ActionConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionConfirmModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
