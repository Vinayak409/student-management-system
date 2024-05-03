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
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpService } from '../api-service/http.service';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<CreateStudentComponent>,
    private httpService: HttpService 
  ) {}

  ngOnInit(): void {
    this.createNewStudentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      branch: ['', Validators.required],
      semester: [null, Validators.required],
      photo: [null, Validators.required],
    });
  }

  // onChange(event: any, fileld: any) {
  //   console.log('logging from onchange');

  //   this.student.photo = event.target.files[0];

  //   const requestBody = new FormData();
  //   requestBody.append('photo', this.student.photo);
  //   console.log(
  //     ' this.student.photo',
  //     this.student.photo,
  //     requestBody,
  //     requestBody.get('photo')
  //   );

  //   fetch(`http://localhost:3000/students/upload/${studentId}`, {
  //     mode: 'cors',
  //     method: 'POST',
  //     body: requestBody,
  //   })
  //     .then(async (response) => {
  //       if (response.ok) {
  //         const resolvedResponse = await response.json();
  //         console.log(resolvedResponse);
  //         if (resolvedResponse !== null) {
  //           console.log(resolvedResponse);
  //           this.student.photo = resolvedResponse.filePath;
  //           // this.router.navigate([RoutesNames.dashboard]);
  //           console.log('students api workging');
  //         } else {
  //           console.log('user is not logged in');
  //         }
  //         return resolvedResponse;
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.log('There was an error sending the form data to the server');
  //     });
  // }

  onChange(event: any) {
    console.log('logging from onchange');
    console.log('event', event);
    const file = (event.target as any).files[0];
    this.createNewStudentForm.patchValue({
      photo: file,
    });
  }

  onError(event: any) {
    console.log('there is an error in form');
  }

  onSubmit() {
    console.log('logging from onsubmit');

    const formData = new FormData();
    formData.append('name', this.createNewStudentForm.value.name);
    formData.append('email', this.createNewStudentForm.value.email);
    formData.append('dob', this.createNewStudentForm.value.dob);
    formData.append('branch', this.createNewStudentForm.value.branch);
    formData.append('semester', this.createNewStudentForm.value.semester);
    formData.append('file', this.createNewStudentForm.get('photo')?.value);
    console.log(formData.get('file'));

    // fetch('http://localhost:3000/students', {
    //   mode: 'cors',
    //   method: 'POST',
    //   // headers: { 'Content-Type': 'application/json' },
    //   body: formData,
    // })
    //   .then(async (response) => {
    //     if (response.ok) {
    //       const resolvedResponse = await response.json();
    //       this.router.navigate([RoutesNames.dashboard]);
    //       console.log('Student has been successfully created');
    //       return resolvedResponse;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log('There was an error sending the form data to the server');
    //   });

    this.httpService.createStudent(formData).subscribe({
      next: (response) => {
        this.router.navigate([RoutesNames.dashboard]);
        console.log('Student has been successfully created');
        return response;
      },
      error: (error) => {
        console.log('There was an error sending the form data to the server');
        console.log(error);
      },
    });
  }

  uploadPhoto() {
    document.getElementById('fileInput')?.click();
    // console.log('photo is selectd ', this.student.photo);
  }

  close() {
    this.dialogRef.close();
    this.router.navigate([RoutesNames.dashboard]);
  }
}
