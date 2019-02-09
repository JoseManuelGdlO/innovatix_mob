import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CrearEventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-evento',
  templateUrl: 'crear-evento.html',
})
export class CrearEventoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    console.log(this.navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearEventoPage');
  }

}
