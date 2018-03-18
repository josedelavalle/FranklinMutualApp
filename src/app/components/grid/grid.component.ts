import { Component, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from "@angular/flex-layout";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  size: string = '';
  columnNum: number = 8;
  
  constructor(media: ObservableMedia) { 
    media.asObservable()
    .subscribe((change: MediaChange) => {
      this.size = change.mqAlias;
      //this.updateTiles(change.mqAlias);
      if(change.mqAlias == 'xs'){
        this.columnNum = 2;
      }
      else if(change.mqAlias == 'sm'){
        this.columnNum = 2;
      }
      else if(change.mqAlias == 'md'){
        this.columnNum = 4;
      }
      else if(change.mqAlias == 'lg'){
        this.columnNum = 6;
      }
      else{
        this.columnNum = 8;
      }
    });
  }

  ngOnInit() {
  }

}
