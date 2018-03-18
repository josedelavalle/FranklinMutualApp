import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AgentDataService {
  readonly apiUrl: string = environment.apiUrl + '/api/agencies';

  private filterString = new BehaviorSubject<string>('');
  castFilterString = this.filterString.asObservable();
  
  getFilterString(v) {
    this.filterString.next(v);
  }
  
  constructor(private http: HttpClient) { }

  getAgentData() {
    return this.http.get(this.apiUrl);
  }

}
