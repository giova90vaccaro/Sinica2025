import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ChartType, Column, GoogleChartsModule } from 'angular-google-charts';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
 import {MatTableModule} from '@angular/material/table'; 
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [MatCardModule,GoogleChartsModule,MatDialogModule,MatTableModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
incassi!:any;
showIncassi= false;
colonnastor = ['Week', 'Store']
public  title2!: string;
public title="Incasso"
public title4="Incasso"
showpie=false;
chartHeight = 0
chartWidth = 0
public  type2!: ChartType;
public  data2!: any[][];
public  columns2!: Column[];
public  options2!: {};
public  type3!: ChartType;
public  data3!: any[][];
public  columns3!: Column[];
public  options3!: {};

public  type5!: ChartType;
public  data5!: any[][];
public  columns5!: Column[];
public  options5!: {};

public  type4!: ChartType;
public  data4!: any[][];
public  columns4!: Column[];
public  options4!: {};

testrighe:any[]=[]
righe2:any[]=[]
righe3:any[]=[]

righe4:any[]=[]

col2:string[]=['ora', 'Rozzano', 'Torino', 'Genova'];

showgr2=false
showgr3=false
per!:any;
todayinc!:any;
colonne = ['Giorno', 'Torino', 'Rozzano', 'Genova']

fasciah!:any;

buble !:any
bubler :any[]=[]
public  type6!: ChartType;
public  data6!: any[][];
public  columns6!: Column[];
public  options6!: {};

title6!:any;

constructor(private api:HttpClient, public dialog:MatDialog, private api2:HttpClient) {
  this.tresettimane();

  this.api.get("https://cvggold-dash.ns0.it/sinica/periodo.php").subscribe(
    data=>{
      this.per = data
    })

    this.cassettostore();
    this.fasciaoraria()

    //this.type4 = ChartType.Re

}

onClick(tipo:string){
  console.log(tipo)
    if(tipo === 'incasso')
      this.dialog.open(DialodPage, {width:'100%', data : this.todayinc});
    else if(tipo === 'fascia')
      this.dialog.open(FasciaPage, {width:'100%',data : this.fasciah})
}

ngOnInit(): void {
}

tresettimane(){
    this.api.get("https://cvggold-dash.ns0.it/sinica/view.php?s=t").subscribe(
      data=>{
        this.incassi = data;
        this.testrighe= []

                  var i:number
                    for( i = 0; i< this.incassi.length; i++){
                  var aux=[this.incassi[i].Giorno, Number(this.incassi[i].Torino), Number(this.incassi[i].Rozzano), Number(this.incassi[i].Genova)];
                    this.testrighe.push(aux)
                    }
                    this.title2= 'Andamento Per Negozio',
                    this.type2= ChartType.LineChart,
                    this.columns2= this.colonne,
                    this.data2= this.testrighe,
                    this.options2= {
                      vAxis: { title: 'Incasso' },
                      hAxis: { title: 'Giorni' },
                      pointSize:5,
                      curveType: 'function'
                    }
                    this.showIncassi = true;
      }
    )
}

cassettostore(){
  this.api.get("https://cvggold-dash.ns0.it/sinica/todaystore.php").subscribe(
    data=>{
      this.todayinc = data;
      var i=0;
        this.righe2=[];
            for(i=0; i<this.todayinc.length; i++){
              var aux2 = [this.todayinc[i].Negozio, Number(this.todayinc[i].totaleImporto) ]
              this.righe2.push(aux2)
            }
        this.data3 = this.righe2
        this.type3 = ChartType.PieChart
        this.options3={
          chart: {
            title: 'My Daily Activities',
            pieHole: 0.4,
          }
        }
        this.showpie = true;
    }
  )
}

fasciaoraria(){
  this.api.get("https://cvggold-dash.ns0.it/sinica/foraria.php").subscribe(
    data=>{
      this.fasciah = data;
      //console.log(this.fasciah)
      this.righe3=[];
      var i:number
        for(i=0; i<this.fasciah.length; i++){
          var aux = [this.fasciah[i].ora+' h', Number(this.fasciah[i].Rozzano), Number(this.fasciah[i].Torino), Number(this.fasciah[i].Genova)]
          this.righe4.push(aux)
        }
        this.title4= 'Fascia Oraria'
        this.type4= ChartType.Bar
        this.columns4 = this.col2

        this.data4 = this.righe4
        this.options4={
          chart: {
            title: "Andamento FasciaOraria",
            subtitle: 'Totale Scontrinato',

          }
        }
        this.showgr2=true

    }
  )

  this.api2.get("https://cvggold-dash.ns0.it/sinica/CatSinica.php").subscribe(
    data=>{
      console.log(data)
      this.buble = data
      var i:number
      for( i = 0; i< this.buble.length; i++){
        var aux=[this.buble[i].descrizione, Number(this.buble[i].SQta), Number(this.buble[i].Valore)];
            this.bubler.push(aux)
        }

      this.title6 = "Categoria";
      this.type6 = ChartType.BubbleChart;
      this.columns6 = ["Categoria", "Qta", "Valore"]
      this.showgr3 = true

    }
  )
}


}

@Component({
selector:'dialogPageControll',
templateUrl: 'DialogPage.html',
styleUrls: ['./home.component.css']
})
export class DialodPage{

intestazione = ['Negozio', 'totaleImporto', 'ndoc']
tab:any;
constructor(@Inject(MAT_DIALOG_DATA) public data:any, @Inject(MAT_DIALOG_DATA) public msg:string){
  this.tab = data
}
}

@Component({
selector:'fasciaPageControll',
templateUrl: 'FasciaPagina.html',
styleUrls: ['./home.component.css']
})
export class FasciaPage{

intestazione = ['ora', 'Rozzano', 'Torino', 'Genova']
tab:any;
constructor(@Inject(MAT_DIALOG_DATA) public data:any, @Inject(MAT_DIALOG_DATA) public msg:string){
  this.tab = data
}
}

function provideNativeDateAdapter(): import("@angular/core").Provider {
  throw new Error('Function not implemented.');
}
