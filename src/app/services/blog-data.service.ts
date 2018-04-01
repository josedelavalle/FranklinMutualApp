import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BlogDataService {
  readonly apiUrl: string = environment.apiUrl + '/api/blogs';
  constructor(private http: HttpClient) { }

  getBlogData() {
    return this.http.get(this.apiUrl);
  }
}
