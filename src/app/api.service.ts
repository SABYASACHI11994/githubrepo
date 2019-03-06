import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'https://api.github.com';

  constructor(private httpClient: HttpClient) { }

  public getRepoIssue(repo:string) {
    return this.httpClient.get(`${this.apiURL}/repos/${repo}/issues`);
  }
}
