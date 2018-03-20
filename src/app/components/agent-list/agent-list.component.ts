import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { AgentDataService } from '../../services/agent-data.service';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {
  public agencies: any;
  public filterValue: string = '';
  constructor(private agentDataService: AgentDataService) { }
  public allagencies: number = 0;
  ngOnInit() {
    this.agentDataService.getAgentData().subscribe(agencies => {
      this.agencies = agencies;
      this.allagencies = this.agencies.length;
    })
    this.agentDataService.castFilterString.subscribe(v => {
      this.filterValue = v;
    })
    this.agentDataService.castAgencies.subscribe(v => {
      this.agencies = v;
    })
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
}
