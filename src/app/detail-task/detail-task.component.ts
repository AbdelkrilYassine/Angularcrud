import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
  })
  export class DetailTaskComponent implements OnInit {

  task=new Task();
  errorMessage:String;

  constructor(private taskService:TaskService,private route:ActivatedRoute) { }
  
ngOnInit() {
    let taskId=this.route.snapshot.params["indexTask"];
    this.taskService.getTaskById(taskId).subscribe(data => this.task=data,error => this.errorMessage=error);   
  }
  }
  
