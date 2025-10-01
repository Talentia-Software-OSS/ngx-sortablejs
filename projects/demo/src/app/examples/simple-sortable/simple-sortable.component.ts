import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-simple-sortable',
  templateUrl: './simple-sortable.component.html',
  styleUrls: ['./simple-sortable.component.css'],
})
export class SimpleSortableComponent {
  cities = [
    'Ankara',
    'Moscow',
    'Munich',
    'Paris',
    'Washington'
  ];
}
