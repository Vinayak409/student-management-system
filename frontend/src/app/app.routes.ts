import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RoutesNames } from './constants/routes';
import { ViewStudentDetailComponent } from './view-student-detail/view-student-detail.component';
import { EditStudentDetailComponent } from './edit-student-detail/edit-student-detail.component';
import { CreateStudentComponent } from './create-student/create-student.component';

export const routes: Routes = [
  { path: RoutesNames.login, component: LoginComponent },
  { path: '', redirectTo: RoutesNames.login, pathMatch: 'full' },
  { path: RoutesNames.signup, component: SignupComponent },
  {
    path: RoutesNames.dashboard,
    component: DashboardComponent,
  },
  {
    path: `${RoutesNames.dashboard}/${RoutesNames.viewStudentDetail}/:id`,
    component: ViewStudentDetailComponent,
  },

  // {
  //   path: `${RoutesNames.viewStudentDetail}/:id`,
  //   component: ViewStudentDetailComponent,
  // },
  {
    path: `${RoutesNames.editStudentDetail}/:id`,
    component: EditStudentDetailComponent,
  },
  { path: RoutesNames.createStudent, component: CreateStudentComponent },
];
