import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Footer } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CrearEventoPage } from '../crear-evento/crear-evento';



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
  elementosPrueba:any;
  

  fechaBool:boolean = false;
  

  fecha:string;
  


  searchQuery: string = '';
  items: string[];  
  compl: string[];
  inventario: any;


  moviles:any;
  mobiliarios =[];


  vistaBoo:boolean=true;

  ////////////////////Cuentas
  suTotalProd:any=0;
  public isToggled: boolean=false;
  totalProd:any=0;

  constructor(public alertCtrl: AlertController,public toastCtrl: ToastController, public http:HttpProvider, public navCtrl: NavController, public navParams: NavParams) {

    

    this.initializeItems();
    this.traerDatos();

   

  }

  initializeItems() {

    this.inventario = this.compl;

    }

    traerDatos(){

      this.http.revisarBase().then(
        (inv) => { 
       //   console.log(inv)     
          
  
         this.inventario = inv["inventario"];
         this.compl = inv["inventario"];
         this.elementosPrueba = inv["inventario"];

  
        // console.log(this.inventario);
         
        
    
  
         //console.log("Resultado:    "+JSON.stringify(json));   
         
                 
            
           
        },
        (error) =>{
          console.log("Error"+JSON.stringify(error));
          alert("Verifica que cuentes con internet");
        }
      );
  
    }

    dateChanged(){
    this.vistaBoo=true;

    console.log("Entraste al metodo");



    this.http.disponibilidadFecha(this.fecha).then(
      (inv) => { 
        this.elementosPrueba=[];
      //console.log(inv);
       this.inventario = inv["inventario"];
       //this.mobiliarios = this.inventario;     
       this.moviles = inv["inventario"];
       //this.nombres = JSON.parse(JSON.stringify(this.moviles));
       this.items = this.mobiliarios;    
       this.elementosPrueba =inv["inventario"];

       

      
       this.fechaBool = true;
       
         
         
         if(this.clickEvento == true){

          
          
         }else{

          
          this.cart = [];
          this.elementos= [];

         }
         
          this.ponerTotal();
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

    
   

    this.vistaBoo = true;
    var element = {};

    var total = parseInt(costo_mob)*parseInt(cantidad_mob);

    element[ "id_mob" ] = id_mob;
    element[ "nombre_mob"] = nombre_mob;
    element[ "cantidad_mob"] = cantidad_mob;
    element[ "costo_mob"] = costo_mob;
    element[ "total"] = total;
    element["isChanged"] = false;
    this.cart.push(element);

    

    console.log("object "+JSON.stringify(this.cart));

    this.elementos = this.cart;

    this.ponerTotal();
   
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad CotizarPage');
    }

    addCantidad(id_mob:any, cantidad_mob:any, nombre_mob:string, costo_mob:any){

    //console.log("cantidad add  "+cantidad_mob);

    var cantidadDiponible;
    

    for (var i in this.elementosPrueba) {
      if (this.elementosPrueba[i].id_mob == id_mob) {
        cantidadDiponible = this.elementosPrueba[i].cantidad_mob

         //console.log("Que hay dentro original   "+this.elementosPrueba[i].cantidad_mob);
         break; //Stop this loop, we found it!
      }
    }

    


   var cantidadRequerida = cantidad_mob;

   

   cantidadRequerida++;
   
   var total = parseInt(costo_mob)* parseInt(cantidadRequerida);

    //console.log("if ("+cantidadRequerida+" > "+cantidadDiponible+"){");
   if(cantidadRequerida > cantidadDiponible){

    let toast = this.toastCtrl.create({
      message: 'No dispones de tal cantidad',
      duration: 2000,
      position: 'top'
    });
  
    toast.present();


   }else{

    for (var i in this.elementos) {
      if (this.elementos[i].id_mob == id_mob) {
         this.elementos[i].cantidad_mob = cantidadRequerida;
         this.elementos[i].total = total;

    //     console.log(cantidadRequerida);
      //   console.log("Que hay dentro"+this.elementos[i].cantidad_mob);
         break; //Stop this loop, we found it!
      }
    }

    

   }

   this.ponerTotal();

    }


    restarCantidad(id_mob:any, cantidad_mob:any, costo_mob:any){

      var cantidadRequerida = cantidad_mob;

      cantidadRequerida = cantidadRequerida - 1;

      var total = parseInt(costo_mob)*parseInt(cantidadRequerida);
      

      if(cantidadRequerida <= 0){

        let toast = this.toastCtrl.create({
          message: 'Solicitud no Valida 0 es lo minimo',
          duration: 2000,
          position: 'top'
        });
      
        toast.present();
    

      }else{

        for (var i in this.elementos) {
          if (this.elementos[i].id_mob == id_mob) {

           // console.log(cantidadRequerida);
             this.elementos[i].cantidad_mob = cantidadRequerida;
             this.elementos[i].total = total;
    
            // console.log("Que hay dentro"+this.elementos[i].cantidad_mob);
             break; //Stop this loop, we found it!
          }
        }
    

      }

      this.ponerTotal();

    }


    notify(){

      this.ponerTotal();

    }


    iva:any=0;
    ponerTotal(){
     // console.log("Iva =  "+this.isToggled);

      

      this.suTotalProd=0;

      for (var i in this.elementos) {     
         // console.log(cantidadRequerida);
           
           this.suTotalProd = parseInt(this.elementos[i].total)+ parseInt(this.suTotalProd);
  
           
        }

        if(this.isToggled == true){

          this.iva = parseFloat(this.suTotalProd) * parseFloat('.16');

          this.totalProd = this.iva + parseInt(this.suTotalProd);

        }else {
          this.totalProd = 0;

          this.totalProd = this.suTotalProd;
        }
      


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


    eliminarItem(id_mob:any){

     


      for (var i in this.elementos) {
        if (this.elementos[i].id_mob == id_mob) {

          this.elementos.splice(i, 1); 
          console.log("eliminado");
           break; //Stop this loop, we found it!
        }
      }
      
      this.ponerTotal();

    }


    selecExac(id_mob:any, costo_mob:any) {

      var cantidadDiponible;

      for (var i in this.elementosPrueba) {
        if (this.elementosPrueba[i].id_mob == id_mob) {
          cantidadDiponible = this.elementosPrueba[i].cantidad_mob
  
          // console.log("Que hay dentro original   "+this.elementosPrueba[i].cantidad_mob);
           break; //Stop this loop, we found it!
        }
      }

      const prompt = this.alertCtrl.create({
        title: 'Selecciona la cantidad Exacta a Solicitar',
        message: "Favor de introducir con numero la cantidad exacta no mayor ha:    "+cantidadDiponible+"  articulos",
        inputs: [
          {
            name: 'cantidad',
            placeholder: ''+cantidadDiponible,
            type:'number'
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Aceptar',
            handler: data => {
              console.log(data);

              console.log("if("+data.cantidad+" > "+cantidadDiponible+"){");
                if(data.cantidad > cantidadDiponible){

                  let toast = this.toastCtrl.create({
                    message: 'No dispones de esa Cantidad',
                    duration: 2000,
                    position: 'top'
                  });
                
                  toast.present();
              
                }else{

                  var total = parseInt(costo_mob)* parseInt(data.cantidad);

                  for (var i in this.elementos) {
                    if (this.elementos[i].id_mob == id_mob) {
                       this.elementos[i].cantidad_mob = data.cantidad;
                       this.elementos[i].total = total;

                       this.ponerTotal();
              
                  //     console.log(cantidadRequerida);
                    //   console.log("Que hay dentro"+this.elementos[i].cantidad_mob);
                       break; //Stop this loop, we found it!
                    }
                  }
              

                }
              
            }
          }
        ]
      });
      prompt.present();

      
    }

    clickEvento:boolean=false;

    crearEvento(){

     // console.log("fecha "+this.fechaBool)

      this.clickEvento = true;

     // console.log("if("+this.elementos+" == undefinded ){");
      if(this.elementos == undefined){
        let toast = this.toastCtrl.create({
          message: 'No tienes Elementos Seleccionados',
          duration: 2000,
          position: 'top'
        });
      
        toast.present();
    
      }else{

       // console.log("if("+this.fechaBool+" == false ){");
        if(this.fechaBool==false){

          let toast = this.toastCtrl.create({
            message: 'Debes escribir una fecha antes de continuar',
            duration: 2000,
            position: 'top'
          });
        
          toast.present();

          this.clickEvento=true;

        }else{

          this.compararCantidades();
       
        }
        
      }
 
    }


    compararCantidades(){

      var i_elem;
      var correctos = 0;

      for (i_elem in this.elementos) {

       
        var id_mob = this.elementos[i_elem].id_mob;

     //   console.log("index elementos=  "+i_elem+"   id_mob=   "+id_mob);


        for(var j in this.elementosPrueba){

       //   console.log("index elementosPrueba  "+j);

          if(this.elementosPrueba[j].id_mob == id_mob){

         //   console.log("dentro del if id_mob");
            var cantidadDisp = this.elementosPrueba[j].cantidad_mob;
            var cantidadReq  = this.elementos[i_elem].cantidad_mob;

           // console.log("cantidad Disponible");
            //console.log("if("+cantidadReq+" > "+cantidadDisp+"){");

            if(cantidadReq > cantidadDisp){
                this.elementos[i_elem].isChanged = true;
            }else{
              this.elementos[i_elem].isChanged = false;

              correctos++;
            }
            break;
          }

        
        }

        }

        i_elem++;

        console.log("if( "+i_elem+" == "+correctos+" ){");
        if(i_elem == correctos ){

          this.navCtrl.push(CrearEventoPage,{elemntos : this.elementos, 
                                              subtotal:this.suTotalProd, 
                                              total : this.totalProd,
                                              iva: this.iva,
                                              fecha: this.fecha});


        }else{

          let toast = this.toastCtrl.create({
            message: 'Los elementos en rojo sobrepasan la cantidad disponible para ver la cantidad disponible da click sobre el numero del elemento',
            duration: 3000,
            position: 'top'
          });
        
          toast.present();

        }
      }


    
  

    
  

}
