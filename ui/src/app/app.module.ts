import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { UserdataComponent } from './userdata/userdata.component';

import { AuthService } from './services/auth.service';
import { CrudService } from './services/crudservice.service';
import { ToastService } from './services/toast.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import {EmployeeProfileComponent} from "./employee-profile/employee-profile.component";
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        RegisterComponent,
        UserdataComponent,
        EmployeeProfileComponent,
        EmployeesListComponent,
        UserProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    providers: [
        AuthService,
        CrudService,
        ToastService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
