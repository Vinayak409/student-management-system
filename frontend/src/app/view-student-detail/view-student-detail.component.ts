import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../api-service/http.service';

@Component({
  selector: 'app-view-student-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './view-student-detail.component.html',
  styleUrl: './view-student-detail.component.css',
})
export class ViewStudentDetailComponent implements OnInit {
  studentId!: number;
  student: any = {};

  constructor(private route: ActivatedRoute, private httpService: HttpService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.studentId = params['id'];
      this.fetchStudentDetails(this.studentId);
    });
  }

  fetchStudentDetails(studentId: number) {
    // fetch(`http://localhost:3000/students/${studentId}`, {
    //   mode: 'cors',
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // })
    //   .then(async (response) => {
    //     if (response.ok) {
    //       const resolvedResponse = await response.json();
    //       this.student = resolvedResponse;
    //       console.log(this.student);
    //       if (resolvedResponse !== null) {
    //         console.log(resolvedResponse);
    //         // this.router.navigate([RoutesNames.dashboard]);
    //         console.log('students api workging');
    //       } else {
    //         console.log('response is null');
    //       }
    //       return resolvedResponse;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log('There was an error sending the form data to the server');
    //   });

    this.httpService.viewStudent(studentId).subscribe({
      next: (response) => {
        console.log('students api workging');
        this.student = response;
        console.log(this.student);
        return response;
      },
      error: (error) => {
        console.log('There was an error sending the form data to the server');
        console.log(error);
      },
    });
  }
}
