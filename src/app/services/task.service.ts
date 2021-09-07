import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url: string;
  private apigeneral = 'http://localhost:8080/kie-server/services/rest/server/containers/LoginListas_1.0.0-SNAPSHOT';
  headers: any;
  numberInstance: any = 0;
  numberTask: any = 0;
  path2: any = "";
  path3: any = "";
  dataInstance: any = {}
  dataJsonInstance: any;
  parsedJson: any;
  resultFinal: any = {};
  

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/kie-server/services/rest/server/containers/LoginListas_1.0.0-SNAPSHOT';
    this.headers = new HttpHeaders()
      .set('Authorization', `Basic ${btoa('wbadmin:wbadmin')}`)
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  }

  getContainer(): Observable<any> {
    console.log("get del contenedor del proyecto");
    return this.http.get<any>(this.url, { headers: this.headers });
  }

   initInstance(){
    const _this = this;
    console.log("1. CREANDO INSTANCIA");
    const path = `${this.apigeneral}/processes/Login_LIstas.Login_Listas/instances`;
    //----intentando asignar el valor resultante a una variable global-----
    this.http.post(path, { body: "" }, { headers: this.headers })
      .subscribe(resultI => {
        this.numberInstance = resultI;
        console.log("numero instancia", this.numberInstance)
      });

    setTimeout(() => {
      console.log("por fuerita", `${this.numberInstance}`, this.numberInstance);
    }, 500);

  }

  getTaskNumber(){
    //this.initInstance();
    setTimeout(() => {
      console.log("this.numberI", this.numberInstance);
      this.path2 = `${this.apigeneral}/processes/instances/${this.numberInstance}`;
      console.log(this.path2);
    }, 1000);
    setTimeout(() => {
      console.log("2. OBTENIENDO NUMERO DE TAREA ");
      this.http.get<any>(this.path2, { headers: this.headers }).
        subscribe(result => {
          this.dataInstance = result;
          console.log("result", result)
        });
    }, 1500);

    setTimeout(() => {
      console.log(typeof (this.dataInstance));
      console.log(Object.values(this.dataInstance["active-user-tasks"]));
      this.parsedJson = Object.values(this.dataInstance["active-user-tasks"]);
      this.numberTask = this.parsedJson[0][0]["task-id"];
      console.log("numero de tarea", this.numberTask);
    }, 2000);

    //const path=`${this.apigeneral}/processes/instances/${this.numberInstance}`;
    //return this.http.get<any>(this.path2,{headers:this.headers});
  }

   startTask() {
    setTimeout(() => {
      console.log(this.numberTask);
      console.log("3. INICIANDO TAREA");
      const path = `${this.apigeneral}/tasks/${this.numberTask}/states/started`;
      console.log(path);
      this.http.put(path, { body: "" }, { headers: this.headers }).subscribe(
        (val) => {
          console.log("PUT exitoso valor en body:",
            val);
        },
        response => {
          console.log("PUT fallido error:", response);
        },
        () => {
          console.log(" PUT ha sido completado");
        });
    }, 3000);

  }

   setVariablesProcess(variablesForm: any) {
    setTimeout(() => {
      console.log("4. INGRESANDO VARIABLES AL PROCESO");
      console.log(this.numberInstance);
      const path = `${this.apigeneral}/processes/instances/${this.numberInstance}/variables`;
      console.log(path);
      this.http.post(path, { "emailInput": variablesForm.email, "passInput": variablesForm.password }
        ,
        { headers: this.headers }).subscribe(
          (val) => {
            console.log("POST exitoso valor de body",
              val);
          },
          response => {
            console.log("POST erroneo", response);
          },
          () => {
            console.log("POST se completó.");
          });
    }, 4500);

  }

  async finishTask() : Promise<any>{
    setTimeout(() => {
      console.log("5. FINALIZANDO TAREA");
      console.log(this.numberTask);
      const path = `${this.apigeneral}/tasks/${this.numberTask}/states/completed`;
      this.http.put(path, { body: "" }, { headers: this.headers }).subscribe(
        (val) => {
          console.log("PUT exitoso valor body",
            val);
        },
        response => {
          console.log("PUT erroneo", response);
        },
        () => {
          console.log(" PUT se ha completado.");
        });
    }, 6500);

  }
  getFinalResult() {
    setTimeout(() => {
      console.log("6. OBTENIENDO RESULTADO FINAL");
      //this.path3=`http://localhost:8080/kie-server/services/rest/server/queries/processes/instances/${this.numberInstance}/variables/instances/resultListas`;
      this.path3 = `http://localhost:8080/kie-server/services/rest/server/queries/processes/instances/${this.numberInstance}/variables/instances/resultParcial`;
      this.http.get(this.path3, { headers: this.headers }).
        subscribe(result => {
          this.resultFinal = result;
          console.log("result", result)
        });
    }, 20000);
  }

  fixResultFinal(){
    console.log(this.resultFinal);
    this.parsedJson = Object.values(this.resultFinal["variable-instance"]);
    console.log(this.parsedJson[0]["value"]);
    var resultParcial = this.parsedJson[0]["value"];
    var mydata = resultParcial.split("#");
    console.log(mydata);
     var consulta = new Array(); 

    if (mydata[2]) {
      for (var i = 2; i < mydata.length; i++) {
        var currentList = mydata[i].split("|");
        console.log(currentList);
        console.log("nombre_lista-trim", currentList[6].split(':')[1].trim().replace("</string>", ""));
        console.log("nombre_lista-no", currentList[6].split(':')[1].replace("</string>", ""));
        consulta.push({
          "prioridad": currentList[1].split(':')[1].trim(),
          "tipo_documento": currentList[2].split(':')[1].trim(),
          "documento": currentList[3].split(':')[1].trim(),
          "nombre": currentList[4].split(':')[1].trim(),
          "numero_tipo_lista": currentList[5].split(':')[1].trim(),
          "nombre_lista": currentList[6].split(':')[1].trim().replace("</string>", "")
        }
        );
      }

    } else {
      console.log('No se han encotrado resultados para este usuario');
    }
    console.log("esta es la final",consulta);
    return consulta;

  }
  //Metodo para el envio de la informacion desde el formulario con todas las peticiones
  loginUser(valuesForm: any) {
    this.initInstance();
    this.getTaskNumber();
    this.startTask();
    this.setVariablesProcess(valuesForm);
    this.finishTask().then(res => {this.getFinalResult()});
    /* setTimeout(() => {
      this.fixResultFinal();
    }, 25000); */
   
  }
  continue() {
    return this.fixResultFinal();
  }
}
