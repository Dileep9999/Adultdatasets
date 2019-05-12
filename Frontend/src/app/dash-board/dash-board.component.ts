import { Component, OnInit,ViewChild } from '@angular/core';
import { GraphsService } from '../graphs.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {Chart} from 'chart.js';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ConfigurationService } from './config-service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {


  pagination = {
    limit: 10,
    offset: 1,
    count: 30,
  };

  eventEmitted($event) {
    if($event.event=="onPagination"){
      this.parseEvent($event);
    }
  }
  


  private parseEvent(obj: EventObject) {
    this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
    this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
    this.pagination = { ...this.pagination };
    let params=[]
    if(this.gender && this.gender!='both'){
      params.push({key:'sex',value:this.gender})
    }
    if(this.race_option){
      params.push({key:'race',value:this.race_option})
    }
    if(this.relation_option){
      params.push({key:'relationship',value:this.relation_option})
    }
    
    this.getData(params);
  }


  public configuration: Config;
  public columns: Columns[] = [
    { key: 'id', title: 'No' },
    { key: 'work', title: 'Work' },
    { key: 'sex', title: 'Sex' },
    { key: 'education', title: 'Education' },
    { key: 'work', title: 'Work' },
    { key: 'marital_status', title: 'Marital Status' },
    { key: 'capital_gain', title: 'Capital Gain' },
    { key: 'capital_loss', title: 'STATUS' },
    { key: 'education_num', title: 'Education' },
    { key: 'fnlwgt', title: 'FNLWGT' },
    { key: 'hours_per_week', title: 'No. of hours' },
    { key: 'native_country', title: 'Country' },
    { key: 'occupation', title: 'Occuppation' },
    { key: 'race', title: 'Race' },
    { key: 'relationship', title: 'Relationsip' },
    { key: 'salary', title: 'Salary' },
   
  ];
  
  
  
  public pieChartLabels = ['Male', 'Female'];
  public pieChartData = [0, 0];
  public pieChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  gender:String;
  race_option='';
  relation_option='';
  search:String='';
  public data = [];
  races=[];
  chart:any;
  today: number = Date.now();

  public barChartLabels: Label[] ;
  public barChartType: ChartType = 'bar';
  public barChartData: ChartDataSets[] = [];

  



  constructor(public graphsService:GraphsService) { }



  ngOnInit() {
    this.configuration = ConfigurationService.config; 
    this.getData([]);
    this.graphsService.getGraphData().subscribe((response) => {
      this.pieChartData=response['male_female']
      this.races=response['races']
      this.barChartLabels=response['relationship_status']
      let d={
        data:[],
        label:'Relation'
      }
      this.chart = new Chart('canvas', {
        type: 'bar',
        
        data: {
          labels: response['relationship_status'],
          datasets: [
            { 
              data: response['relationship_counts'],
              backgroundColor:'orange',
              fill: false,
              label:'All'
            }
          ]
        },
        options:{
          title: {
            display: true,
            text: 'Relationship Status'
        }
        }
      })
      d.data=response['relationship_counts'],
      this.barChartData=[d]
    });
  }

  getData(params){
    this.configuration.isLoading=true;
    this.graphsService.getData(this.pagination.offset,this.search,params).subscribe(res => {
      this.data=[];
      this.configuration.isLoading=false;
      this.data=res['results'];
      this.pagination.count=res['count']
      this.pagination = { ...this.pagination };
    },err => {
      console.log(err);
      this.data=[]
      this.configuration.isLoading=false;  
    });
  }


  onChange(name: string): void {
    this.search=name;
    if(this.search.length>3 || this.search.length==0){
      this.getData([])
    }
  }


  filterSearch(){
      let params=[]
      this.pagination.offset=1
      this.pagination={...this.pagination}
      console.log(this.gender,this.races,this.barChartLabels);
      if(this.gender && this.gender!='both'){
        params.push({key:'sex',value:this.gender})
      }
      if(this.race_option){
        params.push({key:'race',value:this.race_option})
      }
      if(this.relation_option){
        params.push({key:'relationship',value:this.relation_option})
      }
      this.getData(params)
     
  }


  reset(){
    this.race_option='';
    this.relation_option='';
    this.gender='';
    this.pagination.offset=1
    this.pagination={...this.pagination}
    this.getData([])
  }

}

interface EventObject {
  event: string;
  value: any;
}