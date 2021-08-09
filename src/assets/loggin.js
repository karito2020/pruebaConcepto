/* 'use strict'

import axios from 'axios'; */

const url='http://localhost:8080/kie-server/services/rest/server/containers/LoginListas_1.0.0-SNAPSHOT';


function getContainer(){
console.log("iniciando get del conteiner en JBPM");

/* const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  return this.httpClient.get(url, { 'headers': headers }) */
      var req= new HttpClientModule();
      req.open("GET", url);
  
      req.setRequestHeader('Access-Control-Allow-Origin','*');
      req.setRequestHeader('Content-type','application/json'); 
      req.setRequestHeader('Access-Control-Allow-Methods','GET');
      req.setRequestHeader("Authorization", "Basic" +btoa("wbadmin"+":"+"wbadmin"));//d2JhZG1pbjp3YmFkbWlu
      req.withCredentials="true"; 
  
      req.send();
      console.log(req);
  
      req.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) { 
              result = req.responseType;
              console.log(result); }
              };
      req.onload=function(){
          alert(req.response)
      } 
      console.log("pasa algo");

}

//console.log(getContainer());

////////////////////////////////////////////////////////////////
/*const resp = await axios({
    method: "GET",
    url: `http://localhost:8080/kie-server/services/rest/server/containers/LoginListas_1.0.0-SNAPSHOT`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":"*"
    }
  });
  
  // Retrieve just the data from the response
  const { data } = resp;
  console.log(resp);*/
/////////////////////////////////////////////////////////////////
/* $(document).ready(function(){
    $('.btn').click(function(){
$.ajax({
    url :url,
    type:"GET",
    succes: function(result){
        console.log(result)
    },
    error: function(error){
        console.log(`Error ${error}`)
    }
    })
    })
}) */

/* 
if (process.browser) {
    document.addEventListener("DOMContentLoaded", function () {
       alert('Finished loading');
     });
   } */

