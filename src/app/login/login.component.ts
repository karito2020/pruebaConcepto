import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  instanceNumber: number = 0;
  form: FormGroup;
  resultList: any[] = [];

  constructor(private taskService: TaskService, private http: HttpClient, fb: FormBuilder, private router: Router) {
    this.form = fb.group({
      email: ["", Validators.email],
      password: ["", Validators.minLength(4)]
    })

  }


  ngOnInit(): void {
  }


  getLoginListas() {
   this.taskService.loginUser(this.form.value);
    console.log("esta es la bandera",this.taskService.flag);
   setTimeout(() => {
    console.log("esta es la bandera esperando",this.taskService.flag);
   if(this.taskService.flag == true){
      this.router.navigate(['/dashboard'])}else{
       Swal.fire(
        'Lo sentimos',
        'Los datos ingresados son incorrectos',
        'error'
      );
       }
    }, 22000);
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
