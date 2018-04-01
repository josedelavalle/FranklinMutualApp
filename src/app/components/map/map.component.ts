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
  public userLat: number;
  public userLng: number;
  public defaultLat: number = 40.2171;
  public defaultLng: number = -74.7429;
  public njCenter: coords = {lat: this.defaultLat, lng: this.defaultLng};
  public markers: Array<any> = [];
  public circle = {
    radius: 25000,
    latitude: this.defaultLat,
    longitude: this.defaultLng
  }
  public dir = undefined;
  public map: any;
  constructor(private agentDataService: AgentDataService, private userDataService: UserDataService) { }

  ngOnInit() {
    this.agentDataService.castSelected.subscribe(s => {
      this.markers = s;
      if (s && s.length > 0) {
        this.dir = {
          origin: { 
            lat: Number(this.userLat), 
            lng: Number(this.userLng)
          },
          destination: {
            lat: Number(s[s.length - 1].latitude),
            lng: Number(s[s.length - 1].longitude)
          }
        };
      } else {
        // no markers on map currently, so remove
        // setting to null or undefined doesn't clear directions
        // so set the origin and destination to the users location as workaround
        this.dir = {
          origin: { 
            lat: Number(this.userLat), 
            lng: Number(this.userLng)
          },
          destination: {
            lat: Number(this.userLat), 
            lng: Number(this.userLng)
          }
        };
      }
      
    });

    this.userDataService.getUserData().subscribe(userData => { 
      this.userData = userData;
      console.log('rough position by ip', userData);
      this.userLat = Number(this.userData.loc.split(",")[0]);
      this.userLng = Number(this.userData.loc.split(",")[1]);
      var region = this.userData.region;
      // only move circle if user's location is within New Jersey
      // as agents list only consists of NJ addresses
      if (region == "New Jersey") {
        this.defaultLat = Number(this.userLat);
        this.defaultLng = Number(this.userLng);
        // lets see if user agrees to allow more precise location
        navigator.geolocation.getCurrentPosition((position: any) => { 
          // try to get location through browser geolocation
          console.log('precise position by browser geolocation', position);
          this.defaultLat = position.coords.latitude;
          this.defaultLng = position.coords.longitude;
          this.userLat = this.defaultLat;
          this.userLng = this.defaultLng;
        });
      }
    });
  }

  options = {
    suppressMarkers: true,
    draggable: false,
    preserveViewport: true
  };

  public mapReady(map) {
    this.map = map;
    this.getData();
  }

  clearMarkers() {
    this.markers.forEach(m => {
      this.removeMarker(m);
    })
    this.markers = [];
  }

  toggleSearchIcon() {
    this.showSearch = !this.showSearch;
  }

  getMarkerLat(m) {
    return Number(m.latitude);
  }

  getMarkerLng(m) {
    return Number(m.longitude);
  }

  formatPhoneNumber(p) {
    return "(" + p.substring(0,3) + ")" + p.substring(3,6) + "-" + p.substring(6,10);
  }

  removeMarker(m) {
    this.agentDataService.agentSelected(m);
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
    setTimeout(() => this.map.setCenter({ lat: this.njCenter.lat, lng: this.njCenter.lng }));
  }

}

export interface coords {
  lat: number,
  lng: number
}