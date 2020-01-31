import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

task=new Task();
taskId;
errorMessage:String;

constructor(private taskService:TaskService,private route:ActivatedRoute,private router: Router ) { }

  ngOnInit() {
    this.taskId=this.route.snapshot.params["indexTask"];
    this.taskService.getTaskById(this.taskId).subscribe(data => {this.task=data;}
    ,error => this.errorMessage=error); 
    
  }

  submitForm(f: NgForm){
    this.taskService.updateTask(this.taskId,this.task).subscribe(data => {this.router.navigate(["/list"]);
    },error => this.errorMessage=error); 
  }
    
}
