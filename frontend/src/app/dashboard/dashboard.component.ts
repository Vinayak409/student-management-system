import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { RoutesNames } from '../constants/routes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  student = {
    name: '',
    email: '',
    dob: '',
    semester: null,
    branch: '',
    photo: '',
  };

  students: any[] = [];

  constructor(private router: Router) {
    console.log('this is contructor');
    fetch('http://localhost:3000/students', {
      mode: 'cors',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (response) => {
        if (response.ok) {
          const resolvedResponse = await response.json();
          this.students = resolvedResponse;
          console.log(resolvedResponse);
          if (resolvedResponse !== null) {
            console.log(resolvedResponse);
            // this.router.navigate([RoutesNames.dashboard]);
            console.log('students api workging');
          } else {
            console.log('user is not logged in');
          }
          return resolvedResponse;
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('There was an error sending the form data to the server');
      });
  }

  viewStudentDetail(studentId: number) {
    this.router.navigate([RoutesNames.viewStudentDetail, studentId]);
  }

  editStudentDetail(studentId: number) {
    this.router.navigate([RoutesNames.editStudentDetail, studentId]);
  }

  deleteStudentDetail(studentId: number) {
    fetch(`http://localhost:3000/students/${studentId}`, {
      mode: 'cors',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (response) => {
        if (response.ok) {
          const resolvedResponse = await response.json();
          // this.student.dob = this.student.dob.split('-').reverse().join('-')
          this.students = this.students.filter(
            (student) => student.id !== studentId
          );
          console.log('Student successfully deleted');
          return resolvedResponse;
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('There was an error sending the form data to the server');
      });
  }

  createNewStudent() {
    this.router.navigate([RoutesNames.createStudent]);
  }

  onChange(event: any, studentId: number) {
    console.log('logging from onchange');

    this.student.photo = event.target.files[0];

    const requestBody = new FormData();
    requestBody.append('photo', this.student.photo);
    console.log(
      ' this.student.photo',
      this.student.photo,
      requestBody,
      requestBody.get('photo')
    );

    fetch(`http://localhost:3000/students/upload/${studentId}`, {
      mode: 'cors',
      method: 'POST',
      body: requestBody,
    })
      .then(async (response) => {
        if (response.ok) {
          const resolvedResponse = await response.json();
          console.log(resolvedResponse);
          if (resolvedResponse !== null) {
            console.log(resolvedResponse);
            this.student.photo = resolvedResponse.filePath;
            // this.router.navigate([RoutesNames.dashboard]);
            console.log('students api workging');
          } else {
            console.log('user is not logged in');
          }
          return resolvedResponse;
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('There was an error sending the form data to the server');
      });
  }

  uploadPhoto(studentId: number) {
    document.getElementById('fileInput')?.click();
    console.log('photo is selectd ', this.student.photo);
  }
}
