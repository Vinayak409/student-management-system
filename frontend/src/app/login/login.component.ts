import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { RoutesNames } from '../constants/routes';
import { HttpService } from '../api-service/http.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;

    // fetch('http://localhost:3000/users/login', {
    //   mode: 'cors',
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    //   .then(async (response) => {
    //     if (response.ok) {
    //       const resolvedResponse = await response.json();
    //       console.log(resolvedResponse);
    //       if (resolvedResponse !== null) {
    //         this.router.navigate([RoutesNames.dashboard]);
    //         console.log('User has been successfully logged in');
    //       } else {
    //         console.log('user is not logged in');
    //       }
    //       return resolvedResponse;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log('There was an error sending the form data to the server');
    //   });

    this.httpService.loginUser(formData).subscribe({
      next: (response) => {
        this.router.navigate([RoutesNames.dashboard]);
        console.log('User has been successfully logged in');
        return response;
      },
      error: (error) => {
        console.log('There was an error sending the form data to the server');
        console.log(error);
      },
    });
  }

  redirectToSignupPage() {
    this.router.navigate([RoutesNames.signup]);
  }
}
