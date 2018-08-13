import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';
import { Issue } from '../../issue';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: string;
  issue: any = {};
  updateForm: FormGroup;

  constructor(
        private issueService:IssueService,
        private router: Router,
        private route:ActivatedRoute,
        private snackBar:MatSnackBar,
        private fb: FormBuilder
        ) {
          this.updateForm = this.fb.group({
            title: ['', Validators.required],
            responsible: '',
            description: '',
            severity: ''
          });
        }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.issueService.getIssuesById(this.id)
        .subscribe(res => {
          this.issue = res;
          this.updateForm.get('title').setValue(this.issue.title);
          this.updateForm.get('responsibe').setValue(this.issue.responsibe);
          this.updateForm.get('description').setValue(this.issue.description);
          this.updateForm.get('severity').setValue(this.issue.severity);
          this.updateForm.get('status').setValue(this.issue.status);
        });
      });
  }

  // method with issueService to update an issue (by id)
  updateIssue(title, responsible, description, severity, status) {
    this.issueService.updateIssue(this.id, title, responsible, description, severity, status).subscribe(() => {
      this.snackBar.open('Issue updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

} // end class EditComponent
