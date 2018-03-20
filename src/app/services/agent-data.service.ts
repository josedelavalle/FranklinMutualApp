import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AgentDataService {
  readonly apiUrl: string = environment.apiUrl + '/api/agencies';
  private agencies = new BehaviorSubject<Array<any>>(null);
  private filterString = new BehaviorSubject<string>('');
  castFilterString = this.filterString.asObservable();
  castAgencies = this.agencies.asObservable();
  
  getFilterString(v) {
    this.filterString.next(v);
  }
  
  constructor(private http: HttpClient) { }

  getAgentData() {
    return this.http.get(this.apiUrl);
  }

  getAgentDataByRadius(circle) {
    var url = this.apiUrl + '/GetAgenciesWithinRadius?radius=' + circle.radius + '&latitude=' + circle.latitude + '&longitude=' + circle.longitude;
    return this.http.get(url);
  }

  setAgencies(obj) {
    this.agencies.next(obj);
  }
}
