import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammedashComponent } from './programmedash.component';

describe('ProgrammedashComponent', () => {
  let component: ProgrammedashComponent;
  let fixture: ComponentFixture<ProgrammedashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammedashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
