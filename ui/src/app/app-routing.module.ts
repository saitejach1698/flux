import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { UserdataComponent } from './userdata/userdata.component';
import { AuthGuard } from './services/auth.guard';
import {EmployeeProfileComponent} from "./employee-profile/employee-profile.component";
import {EmployeesListComponent} from "./employees-list/employees-list.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: AuthComponent },
    { path: 'signup', component: RegisterComponent },
    { path: 'userdata', component: UserdataComponent, canActivate: [AuthGuard] },
    { path: 'employee/:id', component: EmployeeProfileComponent, canActivate: [AuthGuard] },
    { path: 'employees-list', component: EmployeesListComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
