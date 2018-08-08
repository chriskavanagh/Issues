import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }

  // get all issues
  getIssues() {
    return this.http.get(`http://localhost:3000/issues`);
  }

  // get an issue by the id
  getIssuesById(id) {
    return this.http.get(`http://localhost:3000/issues/${id}`);
  }

  // add/create issue
  addIssue(title, responsible, description, severity) {
    const issue = {
      title:title,
      responsible:responsible,
      description:description,
      severity:severity
    };
    return this.http.post(`http://localhost:3000/issues/add`, issue);
  }

} // end class
