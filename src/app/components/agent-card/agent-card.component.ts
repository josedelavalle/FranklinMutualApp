import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-agent-card',
  templateUrl: './agent-card.component.html',
  styleUrls: ['./agent-card.component.scss']
})
export class AgentCardComponent implements OnInit {
  @Input() agent: any;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getMapUrl(agent) {
    var url = "https://maps.googleapis.com/maps/api/staticmap?center=" + agent.latitude + "," + agent.longitude + "&zoom=11&size=200x200&key=AIzaSyBy34i8mK7IXxcAqmZfOEX70XZtNEt7D7s";
    return this.sanitizer.bypassSecurityTrustResourceUrl(`url(${url})`);
  }
  formatPhoneNumber(p) {
    return "(" + p.substring(0,3) + ")" + p.substring(3,6) + "-" + p.substring(6,10);
  }

}
