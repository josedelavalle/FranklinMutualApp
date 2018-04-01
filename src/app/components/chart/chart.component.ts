import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { AgentDataService } from '../../services/agent-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild('cchart') cchart;
  public colorArray: Array<string> = ['#1baae5', '#195772', '#0378aa', '#3e7187'];
  public agencies: any;
  public filterValue: string = '';
  public chartData =  {
    chartType: 'ColumnChart',    
    dataTable: [],
    options: {
      'title': 'Agencies by County',
      'titleTextStyle': { fontName: 'Open Sans' },
      'animation': {easing: 'out'},
      'height': '100',
      'legend': 'none',
      'colors': ['#D0112B'],
    },
  };

  constructor(private agentDataService: AgentDataService) { }

  populateChartData(agencies) {
    this.chartData = Object.create(this.chartData);
    this.chartData.dataTable = [];
    var counts = this.groupArray(agencies, 'county');
    var countsExtended = Object.keys(counts).map(k => {
      return [k, counts[k]];
    })
    var header = ['County', 'Agent Count'];
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

  ngOnInit() {
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
    this.cchart.redraw();
  }
}
