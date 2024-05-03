import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../api-service/http.service';

@Component({
  selector: 'app-edit-student-detail',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './edit-student-detail.component.html',
  styleUrl: './edit-student-detail.component.css',
})
export class EditStudentDetailComponent implements OnInit {
  studentId!: number;
  student: any = {};

  constructor(
    public dialogRef: MatDialogRef<EditStudentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.studentId = this.data.studentId;
    this.fetchStudentDetails(this.studentId);
  }

  fetchStudentDetails(studentId: number) {
    fetch(`http://localhost:3000/students/${studentId}`, {
      mode: 'cors',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (response) => {
        if (response.ok) {
          const resolvedResponse = await response.json();
          this.student = resolvedResponse;
          console.log(this.student);
          if (resolvedResponse !== null) {
            console.log(resolvedResponse);
            // this.router.navigate([RoutesNames.dashboard]);
            console.log('students api workging');
          } else {
            console.log('response is null');
          }
          return resolvedResponse;
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('There was an error sending the form data to the server');
      });
  }

  onSubmit(studentId: number) {
    console.log(this.studentId);
    console.log(studentId);

    const formData = this.student;
    console.log(formData);

    // fetch(`http://localhost:3000/students/${studentId}`, {
    //   mode: 'cors',
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    //   .then(async (response) => {
    //     if (response.ok) {
    //       const resolvedResponse = await response.json();
    //       // this.student.dob = this.student.dob.split('-').reverse().join('-')
    //       console.log('Student successfully updated');
    //       return resolvedResponse;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log('There was an error sending the form data to the server');
    //   });

    this.httpService.editStudent(formData, studentId).subscribe({
      next: (response) => {
        console.log('Student successfully updated');
        return response;
      },
      error: (error) => {
        console.log('There was an error sending the form data to the server');
        console.log(error);
      },
    });
  }
}
