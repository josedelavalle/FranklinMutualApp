import { Component, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from "@angular/flex-layout";
import { Subscription } from 'rxjs/Subscription';
import { BlogDataService } from '../../services/blog-data.service';

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
  blogColumns: number;
  public blogs: any;
  constructor(media: ObservableMedia, private blogDataService: BlogDataService) { 
    this.blogDataService.getBlogData().subscribe(blogs => {
      this.blogs = blogs;
    });
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
        this.listRows = 6;
        this.blogColumns = 2;
      }
      else if(change.mqAlias == 'sm'){
        this.columnNum = 4;
        this.mapColumns = 4;
        this.mapRows = 5;
        this.chartColumns = 4;
        this.chartRows = 2;
        this.listColumns = 4;
        this.listRows = 9;
        this.blogColumns = 2;
      }
      else if(change.mqAlias == 'md'){
        this.columnNum = 8;
        this.mapColumns = 3;
        this.mapRows = 10;
        this.chartColumns = 5;
        this.chartRows = 2;
        this.listColumns = 5;
        this.listRows = 8;
        this.blogColumns = 4;
      }
      else{
        this.columnNum = 8;
        this.mapColumns = 3;
        this.mapRows = 8;
        this.chartColumns = 5;
        this.chartRows = 2;
        this.listColumns = 5;
        this.listRows = 6;
        this.blogColumns = 2;
      }
    });
  }

  
  ngOnInit() {
    
  }

}
