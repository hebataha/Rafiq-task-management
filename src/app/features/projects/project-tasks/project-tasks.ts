
import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit, signal,WritableSignal  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProjectTasks } from '../services/get-project-tasks';

type TaskColumn = {
  status: string;
  apiStatus: string;
  color: string;
  badgeBg: string;
  tasks: WritableSignal<unknown[]>;
  loading: WritableSignal<boolean>;
  error: WritableSignal<boolean>;
};

@Component({
  selector: 'app-project-tasks',
  imports: [JsonPipe],
  templateUrl: './project-tasks.html',
  styleUrl: './project-tasks.css',
})
export class ProjectTasks implements OnInit {

  private route = inject(ActivatedRoute);
  private _GetProjectTasks = inject(GetProjectTasks);

  projectId = this.route.snapshot.paramMap.get('id');

  columns: TaskColumn[] = [
    {
      status: 'TO DO',
      apiStatus: 'TO_DO',
      color: '#98A2B3',
      badgeBg: '#E9EFF8'
    },
    {
      status: 'IN PROGRESS',
      apiStatus: 'IN_PROGRESS',
      color: '#1570EF',
      badgeBg: '#E5EEFF'
    },
    {
      status: 'BLOCKED',
      apiStatus: 'BLOCKED',
      color: '#F04438',
      badgeBg: '#FEECEB'
    },
    {
      status: 'IN REVIEW',
      apiStatus: 'IN_REVIEW',
      color: '#7F56D9',
      badgeBg: '#F2ECFF'
    },
    {
      status: 'READY FOR QA',
      apiStatus: 'READY_FOR_QA',
      color: '#F79009',
      badgeBg: '#FFF3DF'
    },
    {
      status: 'REOPENED',
      apiStatus: 'REOPENED',
      color: '#E879F9',
      badgeBg: '#FCEBFF'
    },
    {
      status: 'READY FOR PRODUCTION',
      apiStatus: 'READY_FOR_PRODUCTION',
      color: '#12B76A',
      badgeBg: '#E5F8EE'
    },
    {
      status: 'DONE',
      apiStatus: 'DONE',
      color: '#039855',
      badgeBg: '#DCFCE7'
    }
  ].map(column => ({
    ...column,
    tasks: signal<unknown[]>([]),
    loading: signal(false),
    error: signal(false)
  }));

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    if (!this.projectId) {
      console.log('Project ID not found');
      return;
    }

    this.columns.forEach((column) => {
      this.loadColumn(column);
    });
  }


loadColumn(column: TaskColumn) {
  const projectId = this.projectId;

  if (!projectId) return;

  // Before API Request
  column.loading.set(true);
  column.error.set(false);
  column.tasks.set([]);

  this._GetProjectTasks.getProjectAllTasks(
    projectId,
    column.apiStatus
  ).subscribe({
    next: (res) => {

      column.tasks.set(res);
      column.loading.set(false);

    },
    error: (err) => {

      console.log(column.apiStatus, err);

      column.error.set(true);
      column.loading.set(false);
      column.tasks.set([]);

    }
  });
}


}
