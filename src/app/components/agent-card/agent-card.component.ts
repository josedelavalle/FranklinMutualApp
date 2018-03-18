import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-agent-card',
  templateUrl: './agent-card.component.html',
  styleUrls: ['./agent-card.component.scss']
})
export class AgentCardComponent implements OnInit {
  @Input() agent: {};
  constructor() { }

  ngOnInit() {
  }

  formatPhoneNumber(p) {
    return "(" + p.substring(0,3) + ")" + p.substring(3,6) + "-" + p.substring(6,10);
  }

}
