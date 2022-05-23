import { Component, Input, OnInit } from '@angular/core';
import { ProjectUser } from '../../../_models/project-user.model';
import { Project } from '../../../_models/project.model';

@Component({
  selector: 'app-user-project-list',
  templateUrl: './user-project-list.component.html',
  styleUrls: ['./user-project-list.component.scss']
})
export class UserProjectListComponent implements OnInit {
  @Input() projects: Project[];
  @Input() projectUsers: ProjectUser[];

  constructor() { }

  ngOnInit(): void {
  }

}
