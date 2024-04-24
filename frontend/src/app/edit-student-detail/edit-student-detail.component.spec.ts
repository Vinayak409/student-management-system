import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentDetailComponent } from './edit-student-detail.component';

describe('EditStudentDetailComponent', () => {
  let component: EditStudentDetailComponent;
  let fixture: ComponentFixture<EditStudentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStudentDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditStudentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
