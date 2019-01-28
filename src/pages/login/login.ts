import { Component } from '@angular/core';
import { HttpProvider } from '../../providers/http/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario:string;
  contra:string;
  rol:any;
  id:any;
  public recuerda: boolean;

  constructor(public http:HttpProvider, public storage: Storage, public toastCtrl: ToastController, public loadingCtrl:LoadingController, public navCtrl: NavController, public navParams: NavParams) {


    this.storage.get('USU').then((usu) =>{
      console.log("Usuario"+usu);
      this.usuario = usu;
    });

    this.storage.get('PASS').then((pass) =>{
      console.log("Contrasena"+pass);
      this.contra = pass;
    });   
   


    console.log(this.contra);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public notify() {
    console.log("Recuerdame es: "+ this.recuerda);
    //alert(this.recuerda);
  }



  login(){
  
    if(this.recuerda == true){
      this.storage.set('USU',this.usuario);
      this.storage.set('PASS',this.contra);
      this.storage.set('NUM', 1);
      console.log("Guardaste"+this.usuario+this.contra);
    }else{
      console.log("No vas a guardar DATOS");
    }



    let loading = this.loadingCtrl.create({
      content: 'Iniciando Sesion...'
    });
  
    loading.present();
  

    this.http.login(this.usuario,this.contra).then(
      (data) => { 
        console.log(data)  




        var result = data["usuario"];

        for (var i = 0; i < result.length; i++) {
          // console.log(json[i].nombre_mob);
          this.rol = result[i].id_usuario;
          this.id=result[i].rol;
          }

          if(this.id != 0){
              
            this.navCtrl.setRoot(HomePage, {
              data: this.id
            });

          }else{
            this.presentToast(); 
          }   
        

          

       loading.dismiss();
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        this.internetToast();
      }
    );
  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'El Usuario y/o la Contraseña no existen',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
  
  
  internetToast() {
    let toast = this.toastCtrl.create({
      message: 'Verifica que cuentes con Internet',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
  

}
