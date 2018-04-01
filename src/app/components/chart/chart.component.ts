import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { AgentDataService } from '../../services/agent-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild('cchart') cchart: any = null;
  @ViewChild('chartContainer') chartContainer: ElementRef;
  public colorArray: Array<string> = ['#D0112B', '#ba2a2a', '#8e2020', '#e06767'];
  public agencies: any;
  public filterValue: string = '';
  public chartHeight: number;
  public chartData =  {
    chartType: 'ColumnChart',    
    dataTable: [],
    options: {
      'title': 'Agencies by County',
      'titleTextStyle': { fontName: 'Open Sans' },
      'animation': {easing: 'out'},
      'width': '',
      'height': '100',
      'legend': 'none',
      'colors': ['#D0112B'],
      'backgroundColor': '#ddd',
      'chartArea': { left: '4%', width: "95%", height: "70%" }
    },
  };

  constructor(private agentDataService: AgentDataService, private elementRef:ElementRef) { 
    
  }

  populateChartData(agencies) {
    this.chartData = Object.create(this.chartData);
    this.chartData.dataTable = [];
    var counts = this.groupArray(agencies, 'county');
    var i = -1;
    var countsExtended = Object.keys(counts).map(k => {
      i++;
      return [k, counts[k], this.colorArray[i % this.colorArray.length]];

    })
    var header = ['County', 'Agent Count', { role: "style" }];
    this.chartData.dataTable.push(header);
    this.chartData.dataTable = this.chartData.dataTable.concat(countsExtended);
  }

  groupArray(arr, field) {
    var counts = arr.reduce((p, c) => {
        var name = c[field];
        if (!p.hasOwnProperty(name)) {
            p[name] = 0;
        }
        p[name]++;
        return p;
    }, {});
    return counts;
  }

  getChartHeight() {
    setTimeout (() => {
      var h = this.elementRef.nativeElement.clientHeight;
      var w = this.elementRef.nativeElement.clientWidth;
      this.chartData.options.height = String(h);
      this.chartData.options.width = String(w);
      if (this.cchart) this.cchart.redraw();
    });
  }
  ngOnInit() {
    this.getChartHeight();
    this.agentDataService.getAgentData().subscribe(agencies => {
      this.agencies = agencies;
      this.agentDataService.castFilterString.subscribe(v => {
        this.filterValue = v;
        this.populateChartData(this.getAgencies());
      })
    });
    this.agentDataService.castAgencies.subscribe(v => {
      this.agencies = v;
      if (v) 
        this.populateChartData(this.getAgencies());
    });
    
  }

  getAgencies() {
    if (this.filterValue) {
      this.agencies = this.agencies.map(x => {
        x.fullname = x.name + ' ' + x.address + ' ' + x.city + ' ' + x.county + ' ' + x.phone + ' ' + x.zip;
        return x;
      })
      return this.agencies.filter(x => x.fullname.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1);
    } else {
      return this.agencies;
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.getChartHeight();
  }
}
