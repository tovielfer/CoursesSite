import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { isConnectedGuard } from './is-connected.guard';
import { isLactureGuard } from './is-lacture.guard';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "allCourses", component: AllCoursesComponent },
    { path: "add-edit", component: AddEditComponent},
    { path: "courseDetails", component: CourseDetailsComponent,canActivate:[isConnectedGuard] },
    { path: "**", component: NotFoundComponent }
];
