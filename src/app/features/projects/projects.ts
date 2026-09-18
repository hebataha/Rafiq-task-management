import { Component } from '@angular/core';
import { AddProjects } from './add-projects/add-projects';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [AddProjects, RouterOutlet],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects {}
