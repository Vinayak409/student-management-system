import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RoutesNames } from '../constants/routes';
import { Router } from '@angular/router';
import { HttpService } from '../api-service/http.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.signupForm.value;
    console.log(formData);

    // fetch('http://localhost:3000/users/signup', {
    //   mode: 'cors',
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    //   .then(async (response) => {
    //     if (response.ok) {
    //       const resolvedResponse = await response.json();
    //       this.router.navigate([RoutesNames.login]);
    //       console.log('User has been successfully signed up');
    //       return resolvedResponse;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log('There was an error sending the form data to the server');
    //   });

    this.httpService.signUpUser(formData).subscribe({
      next: (response) => {
        this.router.navigate([RoutesNames.login]);
        console.log('User has been successfully signed up');
        return response;
      },
      error: (error) => {
        console.log('There was an error sending the form data to the server');
        console.log(error);
      },
    });
  }

  redirectToLoginPage() {
    this.router.navigate([RoutesNames.login]);
  }
}
