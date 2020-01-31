import { Injectable } from '@angular/core';
import { Task } from 'src/app/model/task';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url="http://localhost:8080/tasks";

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  }
   
errorHandler(error: HttpErrorResponse){
    return throwError("Server Error: please try again later");
}
getTaskById(id:number){
  return this.http.get<Task>(this.url+"/"+id).pipe(
  retry(0),
  catchError(this.errorHandler)
  );
  }
  
getAllTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.url).pipe(
    retry(0),
    catchError(this.errorHandler)
    );
}

createTask(task) {
  return this.http.post<Task>(this.url, task, this.httpOptions)
  .pipe(retry(0),catchError(this.errorHandler));
}
  
updateTask(id, task) {
  return this.http
  .put<Task>(this.url + '/' + id,task, this.httpOptions)
  .pipe(
  retry(0),
  catchError(this.errorHandler)
  )
}

deleteTask(id) {
  return this.http
  .delete<Task>(this.url + '/' + id, this.httpOptions)
  .pipe(
  retry(0),
  catchError(this.errorHandler)
  )
}
}
