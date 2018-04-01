import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AgentDataService } from '../../services/agent-data.service';

@Component({
  selector: 'app-agent-card',
  templateUrl: './agent-card.component.html',
  styleUrls: ['./agent-card.component.scss']
})
export class AgentCardComponent implements OnInit {
  @Input() agent: any;
  private selected: Array<any>;

  constructor(public sanitizer: DomSanitizer, private agentDataService: AgentDataService) { }

  ngOnInit() {
    this.agentDataService.castSelected.subscribe(s => {
      this.selected = s;
    });
  }

  isSelected(item) {
    if (!this.selected || this.selected.length === 0) return false;
    return this.selected.findIndex(x => x.id == item.id) != -1
  }
  agentSelected() {
    console.log('agent selected', this.agent)
    this.agent.selected = !this.agent.selected;
    this.agentDataService.agentSelected(this.agent);
  }
  getMapUrl(agent) {
    var url = "https://maps.googleapis.com/maps/api/staticmap?center=" + agent.latitude + "," + agent.longitude + "&zoom=11&size=200x200&key=AIzaSyBy34i8mK7IXxcAqmZfOEX70XZtNEt7D7s";
    return this.sanitizer.bypassSecurityTrustResourceUrl(`url(${url})`);
  }
  formatPhoneNumber(p) {
    return "(" + p.substring(0,3) + ")" + p.substring(3,6) + "-" + p.substring(6,10);
  }

}
