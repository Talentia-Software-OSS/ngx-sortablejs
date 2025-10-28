import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { SortablejsModule } from '@talentia/ngx-sortablejs';

@Component({
  standalone: true,
  selector: 'app-simple-sortable',
  templateUrl: './simple-sortable.component.html',
  styleUrls: ['./simple-sortable.component.css'],
  imports: [
    JsonPipe,
    SortablejsModule
  ]
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
