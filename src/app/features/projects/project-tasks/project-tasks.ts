import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-project-tasks',
  styleUrl: './project-tasks.css',
  templateUrl: './project-tasks.html',
})
export class ProjectTasks {
  private route = inject(ActivatedRoute);

  projectId = this.route.snapshot.paramMap.get('projectId');
  columns = [
    {
      status: 'TO DO',
      color: '#98A2B3',
      badgeBg: '#E9EFF8'
    },
    {
      status: 'IN PROGRESS',
      color: '#1570EF',
      badgeBg: '#E5EEFF'
    },
    {
      status: 'BLOCKED',
      color: '#F04438',
      badgeBg: '#FEECEB'
    },
    {
      status: 'IN REVIEW',
      color: '#7F56D9',
      badgeBg: '#F2ECFF'
    },
    {
      status: 'READY FOR QA',
      color: '#F79009',
      badgeBg: '#FFF3DF'
    },
    {
      status: 'REOPENED',
      color: '#E879F9',
      badgeBg: '#FCEBFF'
    },
    {
      status: 'READY FOR PRODUCTION',
      color: '#12B76A',
      badgeBg: '#E5F8EE'
    },
    {
      status: 'DONE',
      color: '#039855',
      badgeBg: '#DCFCE7'
    }
  ];


}
