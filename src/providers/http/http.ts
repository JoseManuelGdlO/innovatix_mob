import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpProvider Provider');
  }


  login(usuario:string, contra:string){
 
    //alert(usuario+contra);
   
   var url = 'http://localhost/imobiliaria_innovatix/UsuariosLogin.php?usuario='+usuario+'&contra='+contra;
   return new Promise((resolve, reject) => {
    this.http.get(url)
       .subscribe(data => {
         resolve(data);
        }, (err) =>{
          reject(err);    
        });
   });
  }

}
