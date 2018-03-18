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

  ngOnInit() {
    this.agentDataService.getAgentData().subscribe(agencies => {
      console.log(agencies);
      this.agencies = agencies;
    })
    this.agentDataService.castFilterString.subscribe(v => {
      this.filterValue = v;
    })
  }

  getAgencies() {
    if (this.filterValue) {
      return this.agencies.filter(x => x.name.toLowerCase().indexOf(this.filterValue) > -1);
    } else {
      return this.agencies;
    }
  }
}
