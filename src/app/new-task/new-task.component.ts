import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  task=new Task();
  errorMessage:String;

  constructor(private taskService:TaskService,private router: Router) { }

  ngOnInit() {
  }

submitForm(f: NgForm){
this.taskService.createTask(JSON.stringify(this.task)).subscribe(data => {this.router.navigate(["/list"]);
},error => this.errorMessage=error); 
}

}


