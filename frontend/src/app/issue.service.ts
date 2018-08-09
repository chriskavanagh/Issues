import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }

  // get all issues
  getIssues() {
    return this.http.get(`http://localhost:3000/api`)
    .pipe(catchError(this.errorHandler));
  }

  // get an issue by the id
  getIssuesById(id) {
    return this.http.get(`http://localhost:3000/api/issues/${id}`)
    .pipe(catchError(this.errorHandler));
  }

  // add/create issue
  addIssue(title, responsible, description, severity) {
    const issue = {
      title:title,
      responsible:responsible,
      description:description,
      severity:severity
    };
    return this.http.post(`http://localhost:3000/api/issues/add`, issue)
    .pipe(catchError(this.errorHandler));
  }

  // update issue by id
  updateIssue(id, title, responsible, description, severity, status) {
    const issue = {
      title:title,
      responsible:responsible,
      description:description,
      severity:severity,
      status:status
    };
    return this.http.post(`http://localhost:3000/api/issues/update/${id}`, issue)
    .pipe(catchError(this.errorHandler));
  }

  // delete issue
  deleteIssue(id) {
    return this.http.get(`http://localhost:3000/api/issues/delete/${id}`)
    .pipe(catchError(this.errorHandler));
  }


  // error handler
  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  }

} // end class IssueService
