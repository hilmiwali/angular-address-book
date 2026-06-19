import { Component } from '@angular/core';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
