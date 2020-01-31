import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  constructor(private taskService:TaskService,private renderer: Renderer, private router: Router) { 
  }

  ngOnInit() {
    let token=localStorage.getItem('token');
    this.dtOptions = {
      'ajax':{
        url:'http://localhost:8080/tasks',
        type:'GET',
        headers: {
          'Authorization': `${token}`,
        },
        dataSrc: '',
        "error": function(reason) {
          console.log("error encountered ! ");
      }
        },
        columns: [{title: 'ID', data: 'id'},
            {title: 'Title', data: 'title'},
            {title: 'Due date', data: 'dueDate' },
            {title: 'Description', data: 'description' },
            {title: 'Priority', data: 'priority' },
            {
              title: 'Action',
              render: function (data: any, type: any, full: any) {
                console.log(full.id);               
                return '<button type="button" class="btn btn-primary " indexTask ="'+full.id+'" id="edit" style="margin:10px;">Edit</button><button type="button" class="btn btn-danger " indexTask ="'+full.id+'" id="delete">Delete</button><button type="button" class="btn btn-info " indexTask ="'+full.id+'" id="detail" style="margin:10px;">Detail</button>';
              }
            }
          ],
          lengthChange:false,
          pageLength:5
    };
  }

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if(event.target.attributes['id'])
      {
      if (event.target.attributes['id'].nodeValue == "edit") {
        console.log(event.target.attributes);
        this.router.navigate(["/edit/"+event.target.attributes['indexTask'].nodeValue]);
      }
      else if (event.target.attributes['id'].nodeValue == "delete") {
        console.log(event.target.attributes);
        
        this.router.navigate(["/delete/"+event.target.attributes['indexTask'].nodeValue]);
      }
      else if (event.target.attributes['id'].nodeValue == "detail") {
        console.log(event.target.attributes);
        
        this.router.navigate(["/detail/"+event.target.attributes['indexTask'].nodeValue]);
      }
    }
    });
  }
}
