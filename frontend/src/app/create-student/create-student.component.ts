import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesNames } from '../constants/routes';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css',
})
export class CreateStudentComponent implements OnInit {
  createNewStudentForm!: FormGroup;
  studentId!: number;
  students!: any[];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createNewStudentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      branch: ['', Validators.required],
      semester: [null, Validators.required],
    });
  }

  onSubmit() {
    const formData = this.createNewStudentForm.value;
    console.log(formData);

    fetch('http://localhost:3000/students', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (response.ok) {
          const resolvedResponse = await response.json();
          this.router.navigate([RoutesNames.dashboard]);
          console.log('Student has been successfully created');
          return resolvedResponse;
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('There was an error sending the form data to the server');
      });
  }
}
