import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgLayoutComponent } from './bg-layout.component';

describe('BgLayoutComponent', () => {
  let component: BgLayoutComponent;
  let fixture: ComponentFixture<BgLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BgLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
