import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { FormBuilder } from '@angular/forms';
import { TaskService } from './services/task.service';
/* import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'; */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'myapp';
  instanceNumber: number = 0;
  form: FormGroup;
  resultList: any[] = [];

  constructor(private taskService: TaskService, private http: HttpClient, fb: FormBuilder) {
    this.form = fb.group({
      email: ["", Validators.email],
      password: ["", Validators.minLength(4)]
    })

  }

  getLoginListas(): void {
    this.taskService.loginUser(this.form.value);
    setTimeout(() => {
      this.continueprocess();
    }, 25000);
    
  }
  continueprocess() {
    this.resultList = this.taskService.continue();
  }

  //-----------------prueba funcional------------------------
  /* var url='http://localhost:8080/kie-server/services/rest/server/containers/LoginListas_1.0.0-SNAPSHOT';
   const headers = new HttpHeaders()
   .set('Authorization',  `Basic ${btoa('wbadmin:wbadmin')}`)
   .set('Access-Control-Allow-Origin','*')
   .set('Accept','application/json');
   console.log("iniciando peticion");
   
   this.http.get<any>(url,
   {headers:headers}).subscribe(result=>{console.log("mi resultado",result)});  */
}
