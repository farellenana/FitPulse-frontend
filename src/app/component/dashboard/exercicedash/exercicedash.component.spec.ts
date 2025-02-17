import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicedashComponent } from './exercicedash.component';

describe('ExercicedashComponent', () => {
  let component: ExercicedashComponent;
  let fixture: ComponentFixture<ExercicedashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercicedashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercicedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
