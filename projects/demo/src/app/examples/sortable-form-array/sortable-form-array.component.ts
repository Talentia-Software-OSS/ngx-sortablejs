import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormControl } from '@angular/forms';
import { SortablejsModule } from '@talentia/ngx-sortablejs';

@Component({
  standalone: true,
  selector: 'app-sortable-form-array',
  templateUrl: './sortable-form-array.component.html',
  styleUrls: ['./sortable-form-array.component.css'],
  imports: [
    JsonPipe,
    SortablejsModule,
    ReactiveFormsModule
  ]
})
export class SortableFormArrayComponent {

  citiesControls = new UntypedFormArray([
    'Ankara',
    'Moscow',
    'Munich',
    'Paris',
    'Washington'
  ].map(city => new UntypedFormControl(city)));

}
