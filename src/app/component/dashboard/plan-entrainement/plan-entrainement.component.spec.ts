import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEntrainementComponent } from './plan-entrainement.component';

describe('PlanEntrainementComponent', () => {
  let component: PlanEntrainementComponent;
  let fixture: ComponentFixture<PlanEntrainementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEntrainementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanEntrainementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
