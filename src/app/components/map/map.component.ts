import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { AgentDataService } from '../../services/agent-data.service';
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public agencies: any;
  public data: any;
  public defaultLat: number = 40.226268908189574;
  public defaultLng: number = -74.77923515625004;
  protected map: any;
  constructor(private agentDataService: AgentDataService) { }

  ngOnInit() {
    this.getData();
  }

  protected mapReady(map) {
    this.map = map;
  }

  getData() {
    this.agentDataService.getAgentData().subscribe(agencies => {
      this.agencies = agencies;
      this.agencies.forEach(element => {
        element.latitude = Number(element.latitude);
        element.longitude = Number(element.longitude);
      });
      this.data = this.agencies.map(({latitude, longitude}: any) => 
        ({location: new google.maps.LatLng(+latitude, +longitude),  weight: +10}));
      console.log(this.agencies, this.data);
    });
  }
  @HostListener('window:resize')
  onWindowResize() {
    this.map.setCenter({ lat: this.defaultLat, lng: this.defaultLng })
  }

}
