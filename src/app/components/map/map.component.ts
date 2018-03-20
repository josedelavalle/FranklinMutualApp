import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { AgentDataService } from '../../services/agent-data.service';
import { UserDataService } from '../../services/user-data.service';
import { Subscription } from 'rxjs/Subscription';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public userData: any;
  public agencies: any;
  public data: any;
  public showSearch : boolean = false;
  public defaultLat: number = 40.2171;
  public defaultLng: number = -74.7429;

  public circle = {
    radius: 50000,
    latitude: this.defaultLat,
    longitude: this.defaultLng
  }

  public map: any;
  constructor(private agentDataService: AgentDataService, private userDataService: UserDataService) { }

  ngOnInit() {
    this.userDataService.getUserData().subscribe(userData => { 
      this.userData = userData;
      console.log('rough position by ip', userData);
      var lat = this.userData.loc.split(",")[0];
      var lon = this.userData.loc.split(",")[1];
      var region = this.userData.region;
      // only move circle if user's location is within New Jersey
      // as agents list only consists of NJ addresses
      if (region == "New Jersey") {
        this.defaultLat = Number(lat);
        this.defaultLng = Number(lon);
        // lets see if user agrees to allow more precise location
        navigator.geolocation.getCurrentPosition((position: any) => { 
          // try to get location through browser geolocation
          console.log('precise position by browser geolocation', position);
          this.defaultLat = position.coords.latitude;
          this.defaultLng = position.coords.longitude;
        });
      }
    });
    
    
  }

  public mapReady(map) {
    this.map = map;
    this.getData();
  }

  toggleSearchIcon() {
    this.showSearch = !this.showSearch;
  }

  doSearch() {
    this.agentDataService.getAgentDataByRadius(this.circle).subscribe(agencies => {
      this.agentDataService.setAgencies(agencies);
      this.toggleSearchIcon();
    })
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
    });
  }

  radiusChanged(e) {
    this.circle.radius = Math.floor(e);
    this.toggleSearchIcon();
  }

  circleDragged(e) { 
    this.circle.latitude = e.lat;
    this.circle.longitude = e.lng;
    this.toggleSearchIcon();
  }

  @HostListener('window:resize')
  onWindowResize() {
    setTimeout(() => this.map.setCenter({ lat: this.defaultLat, lng: this.defaultLng }));
  }

}
