import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Tabs } from 'ionic-angular';
import { Storage } from '@ionic/storage'

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AdministracionPage } from '../administracion/administracion';
import { RepartosPage } from '../repartos/repartos';
import { CotizarPage } from '../cotizar/cotizar';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  calendario = HomePage;
  administracion = AdministracionPage;
  repartos = RepartosPage;
  cotizar = CotizarPage;
  
  

  @ViewChild('myTabs') tabsRef: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
   let openTab = this.navParams.get('openTab');
   if(openTab){

    this.tabsRef.select(openTab);

   }

  }


  cerrarSesion() {
    
    this.storage.set('USU',null);
    this.storage.set('PASS',null);
    this.storage.set('NUM', 0);

    this.navCtrl.setRoot(LoginPage);
 
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Estas seguro?',
      message: 'Quieres Cerrar Sesion?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.cerrarSesion();
          }
        }
      ]
    });
    confirm.present();
  }


}
