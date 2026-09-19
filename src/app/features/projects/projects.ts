import { Component } from '@angular/core';
import { AddProjects } from './add-projects/add-projects';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [AddProjects, RouterOutlet,RouterLink],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects {}
