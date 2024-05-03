import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000';

  signUpUser(formData: any) {
    return this.http.post(`${this.baseUrl}/users/signup`, formData);
  }

  loginUser(formData: any) {
    return this.http.post(`${this.baseUrl}/users/login`, formData);
  }

  createStudent(formData: any) {
    return this.http.post(`${this.baseUrl}/students`, formData);
  }

  viewStudent(studentId: number) {
    return this.http.get(`${this.baseUrl}/students/${studentId}`);
  }

  editStudent(formData: any, studentId: number) {
    return this.http.patch(`${this.baseUrl}/students/${studentId}`, formData);
  }

  getAllStudents() {
    return this.http.get(`${this.baseUrl}/students`);
  }

  deleteStudent(studentId: number) {
    return this.http.delete(`${this.baseUrl}/students/${studentId}`);
  }
}
