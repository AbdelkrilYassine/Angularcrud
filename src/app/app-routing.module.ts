import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { NewTaskComponent } from 'src/app/new-task/new-task.component';
import { DetailTaskComponent } from 'src/app/detail-task/detail-task.component';
import { DeleteTaskComponent } from 'src/app/delete-task/delete-task.component';
import { ListTaskComponent } from 'src/app/list-task/list-task.component';
import { EditTaskComponent } from 'src/app/edit-task/edit-task.component';
import { UserLoginComponent } from 'src/app/user-login/user-login.component';
import { AuthGuard } from 'src/app/authentication/auth.guard';


const routes: Routes = [
  {path:'login',component:UserLoginComponent},
  {path:'home',component:HomeComponent, canActivate: [AuthGuard]},
  {path:'new',component:NewTaskComponent, canActivate: [AuthGuard]},
  {path:'detail/:indexTask',component:DetailTaskComponent, canActivate: [AuthGuard]},
  {path:'delete/:indexTask',component:DeleteTaskComponent, canActivate: [AuthGuard]},
  {path:'list',component:ListTaskComponent, canActivate: [AuthGuard]},
  {path:'edit/:indexTask',component:EditTaskComponent, canActivate: [AuthGuard]},
  {path:'',component:UserLoginComponent}, 
  {path: '**', redirectTo: ''} 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
