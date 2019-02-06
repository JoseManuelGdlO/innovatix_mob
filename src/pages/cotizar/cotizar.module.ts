import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CotizarPage } from './cotizar';

@NgModule({
  declarations: [
    CotizarPage,
  ],
  imports: [
    IonicPageModule.forChild(CotizarPage),
  ],
})
export class CotizarPageModule {}
