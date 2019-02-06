import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';


/**
 * Generated class for the CotizarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cotizar',
  templateUrl: 'cotizar.html',
})
export class CotizarPage {

  idArray:any = new Array();
  nombreArray:any =  new Array();
  cantidadArray:any =  new Array();
  costoArray:any =  new Array();
  

  cart = [];
  elementos:any;
  

  fechaBool:boolean = false;

  


  fecha:string;
  


  searchQuery: string = '';
  items: string[];  
  compl: string[];
  inventario: any;


  moviles:any;
  mobiliarios =[];


  vistaBoo:boolean=true;

  constructor(public http:HttpProvider, public navCtrl: NavController, public navParams: NavParams) {

    

    this.initializeItems();
    this.traerDatos();

  }

  initializeItems() {

    this.inventario = this.compl;

    }


  dateChanged(){

    console.log("Entraste al metodo");

    this.http.disponibilidadFecha(this.fecha).then(
      (inv) => { 
       this.inventario = inv["inventario"];
       //this.mobiliarios = this.inventario;     
       this.moviles = inv["inventario"];
       //this.nombres = JSON.parse(JSON.stringify(this.moviles));
       this.items = this.mobiliarios;    
       
       
         this.fechaBool = true;
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );

  }

  revisar(){

    this.vistaBoo = false;


    
  }

  itemClick(id_mob:any  ,nombre_mob: string, cantidad_mob: any, costo_mob:any){

    /*this.vistaBoo = true;
    console.log("Nombre   "+nombre_mob);

    this.idArray.push(""+id_mob);
    this.nombreArray.push(""+nombre_mob);
    this.cantidadArray.push(""+cantidad_mob);
    this.costoArray.push(""+costo_mob);

    console.log("Tamaño   "+this.idArray.length);

    for(let i = 0; i < this.idArray.length; i++){

      
      console.log(JSON.stringify(this.idArray[i])+"nombre   "+JSON.stringify(this.nombreArray[i]));
    }*/

    var element = {};

    element[ "id_mob" ] = id_mob;
    element[ "nombre_mob"] = nombre_mob;
    element[ "cantidad_mob"] = cantidad_mob;
    element[ "costo_mob"] = costo_mob;
    this.cart.push(element);

    console.log("object "+JSON.stringify(this.cart));

    this.elementos = this.cart;

   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CotizarPage');
  }

  

    traerDatos(){

      this.http.revisarBase().then(
        (inv) => { 
         // console.log(inv)     
          
  
         this.inventario = inv["inventario"];
         this.compl = inv["inventario"];
  
        // console.log(this.inventario);
         
        
    
  
         //console.log("Resultado:    "+JSON.stringify(json));   
         
                 
            
           
        },
        (error) =>{
          console.log("Error"+JSON.stringify(error));
          alert("Verifica que cuentes con internet");
        }
      );
  
    }
  
    getItems(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();
  
      // set val to the value of the searchbar
      const val = ev.target.value;
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.inventario = this.inventario.filter((item) => {
          return (item.nombre_mob.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
        
      }
    }

    
  

}
