import { Component, OnInit } from '@angular/core';
import { AgentDataService } from '../../services/agent-data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public filterValue: string = '';
  constructor(private agentDataService: AgentDataService) { }

  ngOnInit() {
    this.agentDataService.castFilterString.subscribe(v => {
      this.filterValue = v;
    })
  }

  inputEntered(v) {
    this.agentDataService.getFilterString(v);
  }

}
