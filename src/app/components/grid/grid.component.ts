import { Component, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from "@angular/flex-layout";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  size: string = '';
  columnNum: number;
  mapColumns: number;
  mapRows: number;
  chartColumns: number;
  chartRows: number;
  listColumns: number;
  listRows: number;

  constructor(media: ObservableMedia) { 
    media.asObservable()
    .subscribe((change: MediaChange) => {
      this.size = change.mqAlias;
      //console.log(this.size);
      if(change.mqAlias == 'xs'){
        this.columnNum = 2;
        this.mapColumns = 2;
        this.mapRows = 5;
        this.chartColumns = 2;
        this.chartRows = 1;
        this.listColumns = 2;
        this.listRows = 5;
      }
      else if(change.mqAlias == 'sm'){
        this.columnNum = 4;
        this.mapColumns = 4;
        this.mapRows = 5;
        this.chartColumns = 4;
        this.chartRows = 2;
        this.listColumns = 4;
        this.listRows = 9;
      }
      else if(change.mqAlias == 'md'){
        this.columnNum = 6;
        this.mapColumns = 2;
        this.mapRows = 8;
        this.chartColumns = 4;
        this.chartRows = 2;
        this.listColumns = 4;
        this.listRows = 6;
      }
      else{
        this.columnNum = 8;
        this.mapColumns = 3;
        this.mapRows = 8;
        this.chartColumns = 5;
        this.chartRows = 2;
        this.listColumns = 5;
        this.listRows = 6;
      }
    });
  }

  
  ngOnInit() {
    
  }

}
